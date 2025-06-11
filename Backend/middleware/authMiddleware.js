/**
 * Authentication middleware using @dax-crafta/auth
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authConfig } = require('../config/auth');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, authConfig.jwtSecret);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found or inactive'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired token'
    });
  }
};

// Role-based access control
const requireRole = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    const userRole = req.user.role;
    const hasPermission = Array.isArray(requiredRoles) 
      ? requiredRoles.includes(userRole)
      : requiredRoles === userRole;

    if (!hasPermission) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Permission-based access control
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    const userRole = req.user.role;
    const roleConfig = authConfig.roles[userRole];

    if (!roleConfig) {
      return res.status(403).json({
        status: 'error',
        message: 'Invalid user role'
      });
    }

    const hasPermission = roleConfig.permissions.includes('*') || 
                         roleConfig.permissions.includes(permission);

    if (!hasPermission) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// AI usage limit check
const checkAIUsage = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    const user = req.user;
    const roleConfig = authConfig.roles[user.role];

    // Check if user has unlimited AI access
    if (roleConfig.aiQuota === -1) {
      return next();
    }

    // Check if user has exceeded AI quota
    if (user.aiUsage.current >= roleConfig.aiQuota) {
      return res.status(429).json({
        status: 'error',
        message: 'AI usage limit exceeded',
        data: {
          current: user.aiUsage.current,
          limit: roleConfig.aiQuota,
          resetDate: user.aiUsage.resetDate
        }
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error checking AI usage'
    });
  }
};

// Optional authentication (doesn't require login)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, authConfig.jwtSecret);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

module.exports = {
  authenticateToken,
  requireRole,
  requirePermission,
  checkAIUsage,
  optionalAuth
};