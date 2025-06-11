/**
 * Authentication configuration using @dax-crafta/auth
 */

const CraftaAuth = require('@dax-crafta/auth');

const authConfig = {
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  
  // Email Configuration
  emailVerification: {
    enabled: true,
    fromEmail: process.env.FROM_EMAIL || 'noreply@daxlibrary.com',
    templatePath: './templates/verification-email.html'
  },
  
  // Password Configuration
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  },
  
  // Role-Based Access Control
  roles: {
    guest: {
      level: 0,
      permissions: ['read:books', 'read:authors'],
      aiQuota: 0
    },
    student: {
      level: 1,
      permissions: ['read:books', 'read:authors', 'create:reviews', 'create:bookmarks'],
      aiQuota: 10
    },
    plus: {
      level: 2,
      permissions: ['read:books', 'read:authors', 'create:reviews', 'create:bookmarks', 'create:wishlist'],
      aiQuota: 50
    },
    pro: {
      level: 3,
      permissions: ['read:books', 'read:authors', 'create:reviews', 'create:bookmarks', 'create:wishlist', 'unlimited:ai'],
      aiQuota: -1 // unlimited
    },
    admin: {
      level: 4,
      permissions: ['*'],
      aiQuota: -1 // unlimited
    }
  },
  
  // 2FA Configuration (ready but not active)
  twoFactorAuth: {
    enabled: false,
    issuer: 'Dax\'s Library',
    window: 2
  }
};

// Initialize Crafta Auth
const auth = new CraftaAuth(authConfig);

module.exports = { auth, authConfig };