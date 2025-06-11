/**
 * Book management routes
 */

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, requireRole, optionalAuth } = require('../middleware/authMiddleware');
const { validateBookCreation, validateObjectId, validatePagination } = require('../middleware/validation');

// Public routes
router.get('/', validatePagination, optionalAuth, bookController.getAllBooks);
router.get('/search', validatePagination, optionalAuth, bookController.searchBooks);
router.get('/featured', optionalAuth, bookController.getFeaturedBooks);
router.get('/genre/:genre', validatePagination, optionalAuth, bookController.getBooksByGenre);
router.get('/:id', validateObjectId('id'), optionalAuth, bookController.getBookById);

// Admin only routes
router.post('/', authenticateToken, requireRole('admin'), validateBookCreation, bookController.createBook);
router.put('/:id', authenticateToken, requireRole('admin'), validateObjectId('id'), bookController.updateBook);
router.delete('/:id', authenticateToken, requireRole('admin'), validateObjectId('id'), bookController.deleteBook);
router.get('/:id/analytics', authenticateToken, requireRole('admin'), validateObjectId('id'), bookController.getBookAnalytics);

module.exports = router;