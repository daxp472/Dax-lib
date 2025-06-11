/**
 * User dashboard and management routes
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ReadingProgress = require('../models/ReadingProgress');
const Review = require('../models/Review');
const Bookmark = require('../models/Bookmark');
const Wishlist = require('../models/Wishlist');
const UserAchievement = require('../models/UserAchievement');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const { validatePagination } = require('../middleware/validation');

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get reading statistics
    const readingStats = await ReadingProgress.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalPages: { $sum: '$currentPage' },
          totalTime: { $sum: '$readingTime.total' }
        }
      }
    ]);

    // Get recent activity
    const recentBooks = await ReadingProgress.find({
      user: userId,
      lastReadAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })
    .populate('book', 'title author coverImage')
    .populate('book.author', 'name')
    .sort({ lastReadAt: -1 })
    .limit(5);

    // Get recent achievements
    const recentAchievements = await UserAchievement.find({
      user: userId,
      isCompleted: true,
      earnedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    })
    .populate('achievement')
    .sort({ earnedAt: -1 })
    .limit(3);

    // Get bookmarks count
    const bookmarksCount = await Bookmark.countDocuments({ user: userId });

    // Get wishlist count
    const wishlistCount = await Wishlist.countDocuments({ 
      user: userId, 
      status: 'active' 
    });

    // Get reviews count
    const reviewsCount = await Review.countDocuments({ user: userId });

    res.json({
      status: 'success',
      data: {
        user: req.user,
        stats: {
          reading: readingStats,
          bookmarks: bookmarksCount,
          wishlist: wishlistCount,
          reviews: reviewsCount
        },
        recentActivity: {
          books: recentBooks,
          achievements: recentAchievements
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard data'
    });
  }
});

// Get user's saved books (reading list)
router.get('/saved-books', authenticateToken, validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    let query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    const savedBooks = await ReadingProgress.find(query)
      .populate('book', 'title author coverImage rating pageCount')
      .populate('book.author', 'name')
      .sort({ lastReadAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ReadingProgress.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        books: savedBooks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBooks: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch saved books'
    });
  }
});

// Get user's reading statistics
router.get('/reading-stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = 'month' } = req.query;

    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'week':
        dateFilter = { lastReadAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
        break;
      case 'month':
        dateFilter = { lastReadAt: { $gte: new Date(now.setMonth(now.getMonth() - 1)) } };
        break;
      case 'year':
        dateFilter = { lastReadAt: { $gte: new Date(now.setFullYear(now.getFullYear() - 1)) } };
        break;
    }

    // Get reading progress data
    const progressData = await ReadingProgress.find({
      user: userId,
      ...dateFilter
    }).populate('book', 'title genres');

    // Calculate statistics
    const stats = {
      totalBooks: progressData.length,
      completedBooks: progressData.filter(p => p.status === 'completed').length,
      totalPages: progressData.reduce((sum, p) => sum + p.currentPage, 0),
      totalReadingTime: progressData.reduce((sum, p) => sum + p.readingTime.total, 0),
      averageRating: 0,
      favoriteGenres: {}
    };

    // Calculate favorite genres
    progressData.forEach(progress => {
      progress.book.genres.forEach(genre => {
        stats.favoriteGenres[genre] = (stats.favoriteGenres[genre] || 0) + 1;
      });
    });

    // Get average rating from reviews
    const userReviews = await Review.find({ user: userId });
    if (userReviews.length > 0) {
      stats.averageRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
    }

    res.json({
      status: 'success',
      data: {
        stats,
        period,
        userProfile: req.user.readingStats
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reading statistics'
    });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { genres, language, theme, notifications } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (genres) user.preferences.genres = genres;
    if (language) user.preferences.language = language;
    if (theme) user.preferences.theme = theme;
    if (notifications) user.preferences.notifications = { ...user.preferences.notifications, ...notifications };

    await user.save();

    res.json({
      status: 'success',
      message: 'Preferences updated successfully',
      data: {
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update preferences'
    });
  }
});

// Get all users (admin only)
router.get('/', authenticateToken, requireRole('admin'), validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 20, role, status, search } = req.query;
    let query = {};

    if (role) query.role = role;
    if (status) query.isActive = status === 'active';
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalUsers: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users'
    });
  }
});

// Update user role (admin only)
router.put('/:userId/role', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      message: 'User role updated successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user role'
    });
  }
});

// Deactivate user (admin only)
router.put('/:userId/deactivate', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      message: 'User deactivated successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to deactivate user'
    });
  }
});

module.exports = router;