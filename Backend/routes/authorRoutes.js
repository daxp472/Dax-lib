/**
 * Author information routes
 */

const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const Book = require('../models/Book');
const { validateObjectId, validatePagination } = require('../middleware/validation');

// Get all authors
router.get('/', validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, genre } = req.query;
    let query = { status: 'active' };

    if (search) {
      query.$text = { $search: search };
    }

    if (genre) {
      query.genres = genre;
    }

    const authors = await Author.find(query)
      .sort({ 'analytics.totalReads': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Author.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        authors,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalAuthors: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch authors'
    });
  }
});

// Get author by ID
router.get('/:id', validateObjectId('id'), async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author || author.status !== 'active') {
      return res.status(404).json({
        status: 'error',
        message: 'Author not found'
      });
    }

    // Get author's books
    const books = await Book.find({
      $or: [
        { author: author._id },
        { coAuthors: author._id }
      ],
      status: 'active',
      isPublic: true
    })
    .select('title coverImage rating pageCount publishedDate')
    .sort({ publishedDate: -1 });

    res.json({
      status: 'success',
      data: {
        author,
        books,
        totalBooks: books.length
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch author'
    });
  }
});

// Get author's books
router.get('/:id/books', validateObjectId('id'), validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'publishedDate', sortOrder = 'desc' } = req.query;

    const books = await Book.find({
      $or: [
        { author: req.params.id },
        { coAuthors: req.params.id }
      ],
      status: 'active',
      isPublic: true
    })
    .populate('author', 'name')
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Book.countDocuments({
      $or: [
        { author: req.params.id },
        { coAuthors: req.params.id }
      ],
      status: 'active',
      isPublic: true
    });

    res.json({
      status: 'success',
      data: {
        books,
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
      message: 'Failed to fetch author\'s books'
    });
  }
});

// Search authors
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const authors = await Author.find({
      $text: { $search: query },
      status: 'active'
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit * 1);

    res.json({
      status: 'success',
      data: {
        authors,
        searchQuery: query
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Author search failed'
    });
  }
});

module.exports = router;