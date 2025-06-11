/**
 * Reading progress tracking routes
 */

const express = require('express');
const router = express.Router();
const ReadingProgress = require('../models/ReadingProgress');
const Book = require('../models/Book');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

// Get user's reading progress for all books
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    let query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    const progress = await ReadingProgress.find(query)
      .populate('book', 'title author coverImage pageCount')
      .populate('book.author', 'name')
      .sort({ lastReadAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ReadingProgress.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        progress,
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
      message: 'Failed to fetch reading progress'
    });
  }
});

// Get reading progress for a specific book
router.get('/book/:bookId', authenticateToken, validateObjectId('bookId'), async (req, res) => {
  try {
    const progress = await ReadingProgress.findOne({
      user: req.user._id,
      book: req.params.bookId
    }).populate('book', 'title author coverImage pageCount');

    if (!progress) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading progress not found'
      });
    }

    res.json({
      status: 'success',
      data: { progress }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reading progress'
    });
  }
});

// Start reading a book
router.post('/start/:bookId', authenticateToken, validateObjectId('bookId'), async (req, res) => {
  try {
    const { bookId } = req.params;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Check if progress already exists
    let progress = await ReadingProgress.findOne({
      user: req.user._id,
      book: bookId
    });

    if (progress) {
      return res.status(400).json({
        status: 'error',
        message: 'Reading progress already exists'
      });
    }

    // Create new progress
    progress = new ReadingProgress({
      user: req.user._id,
      book: bookId,
      totalPages: book.pageCount,
      status: 'reading',
      startedAt: new Date()
    });

    await progress.save();
    await progress.populate('book', 'title author coverImage');

    res.status(201).json({
      status: 'success',
      message: 'Reading started successfully',
      data: { progress }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to start reading'
    });
  }
});

// Update reading progress
router.put('/:bookId', authenticateToken, validateObjectId('bookId'), async (req, res) => {
  try {
    const { bookId } = req.params;
    const { currentPage, currentChapter, pagesRead, readingTime } = req.body;

    let progress = await ReadingProgress.findOne({
      user: req.user._id,
      book: bookId
    });

    if (!progress) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading progress not found'
      });
    }

    // Update progress
    if (currentPage !== undefined) progress.currentPage = currentPage;
    if (currentChapter !== undefined) progress.currentChapter = currentChapter;

    // Update reading session if provided
    if (pagesRead && readingTime) {
      await progress.updateSession(pagesRead, readingTime);
    } else {
      progress.lastReadAt = new Date();
      await progress.save();
    }

    // Update user reading stats
    if (progress.status === 'completed') {
      const user = await User.findById(req.user._id);
      user.readingStats.totalBooksRead += 1;
      user.readingStats.totalPagesRead += progress.totalPages;
      user.readingStats.totalReadingTime += progress.readingTime.total;
      await user.save();
    }

    await progress.populate('book', 'title author coverImage');

    res.json({
      status: 'success',
      message: 'Reading progress updated successfully',
      data: { progress }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update reading progress'
    });
  }
});

// Add reading note
router.post('/:bookId/notes', authenticateToken, validateObjectId('bookId'), async (req, res) => {
  try {
    const { bookId } = req.params;
    const { page, chapter, content } = req.body;

    const progress = await ReadingProgress.findOne({
      user: req.user._id,
      book: bookId
    });

    if (!progress) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading progress not found'
      });
    }

    const note = {
      page,
      chapter,
      content,
      createdAt: new Date()
    };

    progress.notes.push(note);
    await progress.save();

    res.status(201).json({
      status: 'success',
      message: 'Note added successfully',
      data: { note }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to add note'
    });
  }
});

// Get reading statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get overall stats
    const stats = await ReadingProgress.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalReadingTime: { $sum: '$readingTime.total' },
          totalPages: { $sum: '$currentPage' }
        }
      }
    ]);

    // Get recent activity
    const recentActivity = await ReadingProgress.find({
      user: userId,
      lastReadAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })
    .populate('book', 'title coverImage')
    .sort({ lastReadAt: -1 })
    .limit(5);

    res.json({
      status: 'success',
      data: {
        stats,
        recentActivity,
        userStats: req.user.readingStats
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reading statistics'
    });
  }
});

module.exports = router;