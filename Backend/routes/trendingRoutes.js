/**
 * Trending books routes
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const moment = require('moment');

// Get trending books (daily)
router.get('/daily', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const today = moment().format('YYYY-MM-DD');

    const books = await Book.find({
      status: 'active',
      isPublic: true,
      'analytics.dailyViews.date': {
        $gte: new Date(today),
        $lt: new Date(moment(today).add(1, 'day').format('YYYY-MM-DD'))
      }
    })
    .populate('author', 'name')
    .sort({ 'analytics.readCount': -1, 'analytics.viewCount': -1 })
    .limit(limit * 1)
    .select('-fileUrl');

    res.json({
      status: 'success',
      data: {
        books,
        period: 'daily',
        date: today
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch daily trending books'
    });
  }
});

// Get trending books (weekly)
router.get('/weekly', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const weekStart = moment().startOf('week');
    const weekEnd = moment().endOf('week');

    const books = await Book.find({
      status: 'active',
      isPublic: true,
      'analytics.viewCount': { $gt: 0 }
    })
    .populate('author', 'name')
    .sort({ 'analytics.readCount': -1, 'rating.average': -1 })
    .limit(limit * 1)
    .select('-fileUrl');

    res.json({
      status: 'success',
      data: {
        books,
        period: 'weekly',
        weekStart: weekStart.format('YYYY-MM-DD'),
        weekEnd: weekEnd.format('YYYY-MM-DD')
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch weekly trending books'
    });
  }
});

// Get trending books (monthly)
router.get('/monthly', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const monthStart = moment().startOf('month');
    const monthEnd = moment().endOf('month');

    const books = await Book.find({
      status: 'active',
      isPublic: true,
      createdAt: {
        $gte: monthStart.toDate(),
        $lte: monthEnd.toDate()
      }
    })
    .populate('author', 'name')
    .sort({ 'analytics.readCount': -1, 'rating.average': -1 })
    .limit(limit * 1)
    .select('-fileUrl');

    res.json({
      status: 'success',
      data: {
        books,
        period: 'monthly',
        monthStart: monthStart.format('YYYY-MM-DD'),
        monthEnd: monthEnd.format('YYYY-MM-DD')
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch monthly trending books'
    });
  }
});

// Get trending by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const { genre } = req.params;
    const { limit = 10, period = 'week' } = req.query;

    let dateFilter = {};
    if (period === 'day') {
      dateFilter = {
        'analytics.dailyViews.date': {
          $gte: moment().startOf('day').toDate()
        }
      };
    } else if (period === 'week') {
      dateFilter = {
        createdAt: {
          $gte: moment().startOf('week').toDate()
        }
      };
    }

    const books = await Book.find({
      genres: genre,
      status: 'active',
      isPublic: true,
      ...dateFilter
    })
    .populate('author', 'name')
    .sort({ 'analytics.readCount': -1, 'rating.average': -1 })
    .limit(limit * 1)
    .select('-fileUrl');

    res.json({
      status: 'success',
      data: {
        books,
        genre,
        period
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch trending books by genre'
    });
  }
});

// Get most popular books of all time
router.get('/popular', async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const books = await Book.aggregate([
      {
        $match: {
          status: 'active',
          isPublic: true
        }
      },
      {
        $addFields: {
          popularityScore: {
            $add: [
              { $multiply: ['$analytics.viewCount', 0.1] },
              { $multiply: ['$analytics.readCount', 0.5] },
              { $multiply: ['$rating.average', '$rating.count', 0.4] }
            ]
          }
        }
      },
      {
        $sort: { popularityScore: -1 }
      },
      {
        $limit: limit * 1
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: '$author'
      },
      {
        $project: {
          fileUrl: 0
        }
      }
    ]);

    res.json({
      status: 'success',
      data: {
        books,
        period: 'all-time'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch popular books'
    });
  }
});

module.exports = router;