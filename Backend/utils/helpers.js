/**
 * Utility helper functions
 */

const crypto = require('crypto');
const moment = require('moment');

// Generate random string
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Format reading time
const formatReadingTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours < 24) {
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}m`
      : `${hours} hours`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  return remainingHours > 0
    ? `${days}d ${remainingHours}h`
    : `${days} days`;
};

// Calculate reading progress percentage
const calculateProgress = (currentPage, totalPages) => {
  if (!totalPages || totalPages === 0) return 0;
  return Math.round((currentPage / totalPages) * 100);
};

// Estimate reading time based on page count
const estimateReadingTime = (pageCount, wordsPerPage = 250, wordsPerMinute = 200) => {
  const totalWords = pageCount * wordsPerPage;
  return Math.round(totalWords / wordsPerMinute);
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

// Check if user can perform action based on role
const hasPermission = (userRole, requiredRole) => {
  const roleHierarchy = {
    guest: 0,
    student: 1,
    plus: 2,
    pro: 3,
    admin: 4
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

// Format date for display
const formatDate = (date, format = 'MMMM Do, YYYY') => {
  return moment(date).format(format);
};

// Calculate time ago
const timeAgo = (date) => {
  return moment(date).fromNow();
};

// Generate pagination metadata
const getPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    currentPage: parseInt(page),
    totalPages,
    totalItems: total,
    itemsPerPage: parseInt(limit),
    hasNext: page < totalPages,
    hasPrev: page > 1,
    nextPage: page < totalPages ? parseInt(page) + 1 : null,
    prevPage: page > 1 ? parseInt(page) - 1 : null
  };
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

module.exports = {
  generateRandomString,
  formatReadingTime,
  calculateProgress,
  estimateReadingTime,
  formatFileSize,
  isValidEmail,
  sanitizeInput,
  generateSlug,
  hasPermission,
  formatDate,
  timeAgo,
  getPaginationMeta,
  isValidObjectId
};