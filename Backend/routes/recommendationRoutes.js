/**
 * Smart recommendation routes
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const ReadingProgress = require('../models/ReadingProgress');
const Review = require('../models/Review');
const Wishlist = require('../models/Wishlist');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get personalized recommendations
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 10 } = req.query;

    // Get user's reading history
    const readingHistory = await ReadingProgress.find({
      user: userId,
      status: { $in: ['completed', 'reading'] }
    }).populate('book', 'genres author');

    // Get user's highly rated books
    const highRatedReviews = await Review.find({
      user: userId,
      rating: { $gte: 4 }
    }).populate('book', 'genres author');

    // Extract preferred genres and authors
    const preferredGenres = new Map();
    const preferredAuthors = new Map();

    [...readingHistory, ...highRatedReviews].forEach(item => {
      const book = item.book;
      
      // Count genres
      book.genres.forEach(genre => {
        preferredGenres.set(genre, (preferredGenres.get(genre) || 0) + 1);
      });
      
      // Count authors
      const authorId = book.author.toString();
      preferredAuthors.set(authorId, (preferredAuthors.get(authorId) || 0) + 1);
    });

    // Get books user has already read or wishlisted
    const readBookIds = readingHistory.map(rp => rp.book._id);
    const wishlistBooks = await Wishlist.find({ user: userId }).select('book');
    const wishlistBookIds = wishlistBooks.map(w => w.book);
    const excludeBookIds = [...readBookIds, ...wishlistBookIds];

    // Build recommendation query
    const topGenres = Array.from(preferredGenres.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);

    const topAuthors = Array.from(preferredAuthors.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);

    // Get recommendations based on genres and authors
    const recommendations = await Book.find({
      _id: { $nin: excludeBookIds },
      status: 'active',
      isPublic: true,
      $or: [
        { genres: { $in: topGenres } },
        { author: { $in: topAuthors } }
      ]
    })
    .populate('author', 'name')
    .sort({ 'rating.average': -1, 'analytics.readCount': -1 })
    .limit(limit * 2); // Get more to filter later

    // Score and sort recommendations
    const scoredRecommendations = recommendations.map(book => {
      let score = 0;
      
      // Genre match score
      const genreMatches = book.genres.filter(g => topGenres.includes(g)).length;
      score += genreMatches * 3;
      
      // Author match score
      if (topAuthors.includes(book.author._id.toString())) {
        score += 5;
      }
      
      // Rating score
      score += book.rating.average * 2;
      
      // Popularity score
      score += Math.log(book.analytics.readCount + 1) * 0.5;

      return {
        book,
        score,
        reasons: [
          ...(genreMatches > 0 ? [`Matches your interest in ${book.genres.filter(g => topGenres.includes(g)).join(', ')}`] : []),
          ...(topAuthors.includes(book.author._id.toString()) ? [`You've enjoyed books by ${book.author.name}`] : []),
          ...(book.rating.average >= 4 ? [`Highly rated (${book.rating.average.toFixed(1)}/5)`] : [])
        ]
      };
    });

    // Sort by score and take top results
    const finalRecommendations = scoredRecommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    res.json({
      status: 'success',
      data: {
        recommendations: finalRecommendations,
        basedOn: {
          booksRead: readingHistory.length,
          topGenres: topGenres.slice(0, 3),
          reviewsGiven: highRatedReviews.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate recommendations'
    });
  }
});

// Get similar books
router.get('/similar/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const { limit = 5 } = req.query;

    // Get the reference book
    const referenceBook = await Book.findById(bookId).populate('author');
    if (!referenceBook) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Find similar books
    const similarBooks = await Book.find({
      _id: { $ne: bookId },
      status: 'active',
      isPublic: true,
      $or: [
        { genres: { $in: referenceBook.genres } },
        { author: referenceBook.author._id }
      ]
    })
    .populate('author', 'name')
    .limit(limit * 2);

    // Score similarity
    const scoredBooks = similarBooks.map(book => {
      let score = 0;
      
      // Genre similarity
      const commonGenres = book.genres.filter(g => referenceBook.genres.includes(g));
      score += commonGenres.length * 2;
      
      // Same author
      if (book.author._id.toString() === referenceBook.author._id.toString()) {
        score += 5;
      }
      
      // Rating similarity
      const ratingDiff = Math.abs(book.rating.average - referenceBook.rating.average);
      score += (5 - ratingDiff) * 0.5;

      return {
        book,
        score,
        commonGenres
      };
    });

    const recommendations = scoredBooks
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => ({
        ...item.book.toObject(),
        similarityReasons: [
          ...(item.commonGenres.length > 0 ? [`Shares ${item.commonGenres.join(', ')} genre(s)`] : []),
          ...(item.book.author._id.toString() === referenceBook.author._id.toString() ? [`Same author: ${item.book.author.name}`] : [])
        ]
      }));

    res.json({
      status: 'success',
      data: {
        referenceBook: {
          title: referenceBook.title,
          author: referenceBook.author.name,
          genres: referenceBook.genres
        },
        recommendations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to find similar books'
    });
  }
});

// Get trending recommendations
router.get('/trending', async (req, res) => {
  try {
    const { limit = 10, genre } = req.query;
    
    let query = {
      status: 'active',
      isPublic: true,
      'rating.average': { $gte: 4 },
      'analytics.readCount': { $gte: 10 }
    };

    if (genre) {
      query.genres = genre;
    }

    const trendingBooks = await Book.find(query)
      .populate('author', 'name')
      .sort({ 
        'analytics.readCount': -1, 
        'rating.average': -1,
        createdAt: -1 
      })
      .limit(limit * 1);

    res.json({
      status: 'success',
      data: {
        books: trendingBooks,
        criteria: {
          minRating: 4,
          minReads: 10,
          genre: genre || 'all'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch trending recommendations'
    });
  }
});

// Get new releases recommendations
router.get('/new-releases', async (req, res) => {
  try {
    const { limit = 10, days = 30 } = req.query;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const newBooks = await Book.find({
      status: 'active',
      isPublic: true,
      createdAt: { $gte: cutoffDate }
    })
    .populate('author', 'name')
    .sort({ createdAt: -1, 'rating.average': -1 })
    .limit(limit * 1);

    res.json({
      status: 'success',
      data: {
        books: newBooks,
        criteria: {
          daysBack: days,
          cutoffDate
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch new releases'
    });
  }
});

module.exports = router;