/**
 * Wishlist management routes
 */

const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Book = require('../models/Book');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');
const { validateObjectId, validatePagination } = require('../middleware/validation');

// Get user's wishlist
router.get('/', authenticateToken, requirePermission('create:wishlist'), validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 20, priority, status = 'active' } = req.query;
    let query = { user: req.user._id, status };

    if (priority) {
      query.priority = priority;
    }

    const wishlist = await Wishlist.find(query)
      .populate('book', 'title author coverImage rating genres')
      .populate('book.author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Wishlist.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        wishlist,
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
      message: 'Failed to fetch wishlist'
    });
  }
});

// Add book to wishlist
router.post('/', authenticateToken, requirePermission('create:wishlist'), async (req, res) => {
  try {
    const { bookId, priority = 'medium', notes } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Check if book is already in wishlist
    const existingWishlist = await Wishlist.findOne({
      user: req.user._id,
      book: bookId,
      status: 'active'
    });

    if (existingWishlist) {
      return res.status(400).json({
        status: 'error',
        message: 'Book is already in your wishlist'
      });
    }

    // Create wishlist entry
    const wishlistItem = new Wishlist({
      user: req.user._id,
      book: bookId,
      priority,
      notes
    });

    await wishlistItem.save();
    await wishlistItem.populate('book', 'title author coverImage rating');

    res.status(201).json({
      status: 'success',
      message: 'Book added to wishlist successfully',
      data: { wishlistItem }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to add book to wishlist'
    });
  }
});

// Update wishlist item
router.put('/:id', authenticateToken, validateObjectId('id'), async (req, res) => {
  try {
    const { priority, notes, status } = req.body;

    const wishlistItem = await Wishlist.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!wishlistItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Wishlist item not found'
      });
    }

    // Update fields
    if (priority) wishlistItem.priority = priority;
    if (notes !== undefined) wishlistItem.notes = notes;
    if (status) wishlistItem.status = status;

    await wishlistItem.save();
    await wishlistItem.populate('book', 'title author coverImage rating');

    res.json({
      status: 'success',
      message: 'Wishlist item updated successfully',
      data: { wishlistItem }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update wishlist item'
    });
  }
});

// Remove book from wishlist
router.delete('/:id', authenticateToken, validateObjectId('id'), async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!wishlistItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Wishlist item not found'
      });
    }

    wishlistItem.status = 'removed';
    await wishlistItem.save();

    res.json({
      status: 'success',
      message: 'Book removed from wishlist successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to remove book from wishlist'
    });
  }
});

// Check if book is in wishlist
router.get('/check/:bookId', authenticateToken, validateObjectId('bookId'), async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      user: req.user._id,
      book: req.params.bookId,
      status: 'active'
    });

    res.json({
      status: 'success',
      data: {
        inWishlist: !!wishlistItem,
        wishlistItem: wishlistItem || null
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to check wishlist status'
    });
  }
});

module.exports = router;