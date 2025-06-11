/**
 * Book management controller
 */

const Book = require('../models/Book');
const Author = require('../models/Author');
const Review = require('../models/Review');
const ReadingProgress = require('../models/ReadingProgress');

// Get all books with filtering and pagination
const getAllBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      genre,
      author,
      rating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = { status: 'active', isPublic: true };

    if (genre) {
      query.genres = { $in: [genre] };
    }

    if (author) {
      query.author = author;
    }

    if (rating) {
      query['rating.average'] = { $gte: parseFloat(rating) };
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const books = await Book.find(query)
      .populate('author', 'name bio photo')
      .populate('coAuthors', 'name')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-fileUrl'); // Don't expose file URLs in list view

    const total = await Book.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        books,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBooks: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch books'
    });
  }
};

// Get single book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author', 'name bio photo nationality')
      .populate('coAuthors', 'name bio');

    if (!book || book.status !== 'active') {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Increment view count
    await book.incrementView();

    // Get user's reading progress if authenticated
    let readingProgress = null;
    if (req.user) {
      readingProgress = await ReadingProgress.findOne({
        user: req.user._id,
        book: book._id
      });
    }

    res.json({
      status: 'success',
      data: {
        book,
        readingProgress
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch book'
    });
  }
};

// Search books
const searchBooks = async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        status: 'error',
        message: 'Search query is required'
      });
    }

    const books = await Book.find({
      $text: { $search: q },
      status: 'active',
      isPublic: true
    })
    .populate('author', 'name')
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-fileUrl');

    const total = await Book.countDocuments({
      $text: { $search: q },
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
        },
        searchQuery: q
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Search failed'
    });
  }
};

// Get books by genre
const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const books = await Book.find({
      genres: genre,
      status: 'active',
      isPublic: true
    })
    .populate('author', 'name')
    .sort({ 'rating.average': -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-fileUrl');

    const total = await Book.countDocuments({
      genres: genre,
      status: 'active',
      isPublic: true
    });

    res.json({
      status: 'success',
      data: {
        books,
        genre,
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
      message: 'Failed to fetch books by genre'
    });
  }
};

// Get featured books
const getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.find({
      isFeatured: true,
      status: 'active',
      isPublic: true
    })
    .populate('author', 'name')
    .sort({ createdAt: -1 })
    .limit(10)
    .select('-fileUrl');

    res.json({
      status: 'success',
      data: {
        books
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch featured books'
    });
  }
};

// Get book analytics (admin only)
const getBookAnalytics = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Get detailed analytics
    const analytics = {
      ...book.analytics,
      reviews: await Review.countDocuments({ book: book._id }),
      readingProgress: await ReadingProgress.countDocuments({ book: book._id })
    };

    res.json({
      status: 'success',
      data: {
        analytics
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch book analytics'
    });
  }
};

// Create new book (admin only)
const createBook = async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      addedBy: req.user._id
    };

    const book = new Book(bookData);
    await book.save();

    // Populate author information
    await book.populate('author', 'name bio');

    res.status(201).json({
      status: 'success',
      message: 'Book created successfully',
      data: {
        book
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create book'
    });
  }
};

// Update book (admin only)
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: new Date() },
      { new: true, runValidators: true }
    ).populate('author', 'name bio');

    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Book updated successfully',
      data: {
        book
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update book'
    });
  }
};

// Delete book (admin only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status: 'archived' },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Book archived successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to archive book'
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  searchBooks,
  getBooksByGenre,
  getFeaturedBooks,
  getBookAnalytics,
  createBook,
  updateBook,
  deleteBook
};