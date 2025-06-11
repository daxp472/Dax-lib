/**
 * Bookmark notes routes
 */

const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');
const Book = require('../models/Book');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');
const { validateObjectId, validatePagination } = require('../middleware/validation');

// Get user's bookmarks for a book
router.get('/book/:bookId', authenticateToken, validateObjectId('bookId'), validatePagination, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { page = 1, limit = 20, tag } = req.query;
    
    let query = {
      user: req.user._id,
      book: bookId
    };

    if (tag) {
      query.tags = tag;
    }

    const bookmarks = await Bookmark.find(query)
      .populate('book', 'title')
      .sort({ page: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Bookmark.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        bookmarks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBookmarks: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookmarks'
    });
  }
});

// Get all user's bookmarks
router.get('/', authenticateToken, requirePermission('create:bookmarks'), validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 20, tag, color } = req.query;
    
    let query = { user: req.user._id };

    if (tag) {
      query.tags = tag;
    }

    if (color) {
      query.color = color;
    }

    const bookmarks = await Bookmark.find(query)
      .populate('book', 'title author coverImage')
      .populate('book.author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Bookmark.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        bookmarks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBookmarks: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookmarks'
    });
  }
});

// Create a new bookmark
router.post('/', authenticateToken, requirePermission('create:bookmarks'), async (req, res) => {
  try {
    const { bookId, page, chapter, title, notes, quote, tags, color, position } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Create bookmark
    const bookmark = new Bookmark({
      user: req.user._id,
      book: bookId,
      page,
      chapter,
      title,
      notes,
      quote,
      tags,
      color,
      position
    });

    await bookmark.save();
    await bookmark.populate('book', 'title author');

    res.status(201).json({
      status: 'success',
      message: 'Bookmark created successfully',
      data: { bookmark }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create bookmark'
    });
  }
});

// Update a bookmark
router.put('/:id', authenticateToken, validateObjectId('id'), async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({
        status: 'error',
        message: 'Bookmark not found or not authorized'
      });
    }

    // Update allowed fields
    const allowedUpdates = ['title', 'notes', 'quote', 'tags', 'color', 'isPublic'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        bookmark[field] = req.body[field];
      }
    });

    await bookmark.save();
    await bookmark.populate('book', 'title author');

    res.json({
      status: 'success',
      message: 'Bookmark updated successfully',
      data: { bookmark }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update bookmark'
    });
  }
});

// Delete a bookmark
router.delete('/:id', authenticateToken, validateObjectId('id'), async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({
        status: 'error',
        message: 'Bookmark not found or not authorized'
      });
    }

    res.json({
      status: 'success',
      message: 'Bookmark deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete bookmark'
    });
  }
});

// Get bookmark tags for a user
router.get('/tags', authenticateToken, async (req, res) => {
  try {
    const tags = await Bookmark.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $unwind: '$tags'
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $project: {
          tag: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json({
      status: 'success',
      data: { tags }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookmark tags'
    });
  }
});

// Get public bookmarks for a book
router.get('/public/book/:bookId', validateObjectId('bookId'), validatePagination, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const bookmarks = await Bookmark.find({
      book: bookId,
      isPublic: true
    })
    .populate('user', 'firstName lastName avatar')
    .populate('book', 'title')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Bookmark.countDocuments({
      book: bookId,
      isPublic: true
    });

    res.json({
      status: 'success',
      data: {
        bookmarks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBookmarks: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch public bookmarks'
    });
  }
});

module.exports = router;