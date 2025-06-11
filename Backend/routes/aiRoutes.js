/**
 * AI integration routes
 */

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticateToken, checkAIUsage } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

// AI-powered features (requires authentication and AI quota)
router.get('/summary/:bookId', authenticateToken, checkAIUsage, validateObjectId('bookId'), aiController.generateBookSummary);
router.get('/recommendations', authenticateToken, checkAIUsage, aiController.generateSmartRecommendations);

// AI usage statistics
router.get('/usage', authenticateToken, aiController.getAIUsageStats);

module.exports = router;