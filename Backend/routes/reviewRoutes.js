/**
 * Review management routes
 */

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');
const { validateReview, validateObjectId, validatePagination } = require('../middleware/validation');

// Get reviews for a book
router.get('/book/:bookId', validateObjectId('bookId'), validatePagination, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const reviews = await Review.find({
      book: bookId,
      status: 'active',
      isPublic: true
    })
    .populate('user', 'firstName lastName avatar')
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Review.countDocuments({
      book: bookId,
      status: 'active',
      isPublic: true
    });

    res.json({
      status: 'success',
      data: {
        reviews,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalReviews: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reviews'
    });
  }
});

// Create a new review
router.post('/', authenticateToken, requirePermission('create:reviews'), validateReview, async (req, res) => {
  try {
    const { bookId, rating, title, content } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      user: req.user._id,
      book: bookId
    });

    if (existingReview) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already reviewed this book'
      });
    }

    // Create review
    const review = new Review({
      user: req.user._id,
      book: bookId,
      rating,
      title,
      content
    });

    await review.save();

    // Update book rating
    const reviews = await Review.find({ book: bookId, status: 'active' });
    const totalRatings = reviews.length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    // Update rating distribution
    const distribution = { five: 0, four: 0, three: 0, two: 0, one: 0 };
    reviews.forEach(r => {
      switch(r.rating) {
        case 5: distribution.five++; break;
        case 4: distribution.four++; break;
        case 3: distribution.three++; break;
        case 2: distribution.two++; break;
        case 1: distribution.one++; break;
      }
    });

    await Book.findByIdAndUpdate(bookId, {
      'rating.average': avgRating,
      'rating.count': totalRatings,
      'rating.distribution': distribution
    });

    await review.populate('user', 'firstName lastName avatar');

    res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create review'
    });
  }
});

// Update a review
router.put('/:id', authenticateToken, validateObjectId('id'), validateReview, async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found or not authorized'
      });
    }

    Object.assign(review, req.body);
    await review.save();

    res.json({
      status: 'success',
      message: 'Review updated successfully',
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update review'
    });
  }
});

// Delete a review
router.delete('/:id', authenticateToken, validateObjectId('id'), async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found or not authorized'
      });
    }

    review.status = 'deleted';
    await review.save();

    res.json({
      status: 'success',
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete review'
    });
  }
});

// Like/unlike a review
router.post('/:id/like', authenticateToken, validateObjectId('id'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    const userId = req.user._id;
    const hasLiked = review.likes.users.includes(userId);

    if (hasLiked) {
      // Unlike
      review.likes.users.pull(userId);
      review.likes.count -= 1;
    } else {
      // Like
      review.likes.users.push(userId);
      review.likes.count += 1;
    }

    await review.save();

    res.json({
      status: 'success',
      message: hasLiked ? 'Review unliked' : 'Review liked',
      data: {
        liked: !hasLiked,
        likesCount: review.likes.count
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to toggle like'
    });
  }
});

module.exports = router;