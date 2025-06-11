/**
 * Achievement and badge routes
 */

const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const UserAchievement = require('../models/UserAchievement');
const User = require('../models/User');
const ReadingProgress = require('../models/ReadingProgress');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validation');

// Get all available achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true })
      .sort({ category: 1, rarity: 1 });

    res.json({
      status: 'success',
      data: { achievements }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch achievements'
    });
  }
});

// Get user's achievements
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userAchievements = await UserAchievement.find({
      user: req.user._id
    })
    .populate('achievement')
    .sort({ earnedAt: -1 });

    // Separate completed and in-progress achievements
    const completed = userAchievements.filter(ua => ua.isCompleted);
    const inProgress = userAchievements.filter(ua => !ua.isCompleted);

    res.json({
      status: 'success',
      data: {
        completed,
        inProgress,
        totalEarned: completed.length
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user achievements'
    });
  }
});

// Check and update user achievements
router.post('/check', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    // Get all achievements
    const achievements = await Achievement.find({ isActive: true });
    const newAchievements = [];

    for (const achievement of achievements) {
      // Check if user already has this achievement
      const existingUserAchievement = await UserAchievement.findOne({
        user: userId,
        achievement: achievement._id
      });

      let currentProgress = 0;
      let isCompleted = false;

      // Calculate progress based on achievement type
      switch (achievement.requirements.type) {
        case 'books_read':
          currentProgress = user.readingStats.totalBooksRead;
          break;
        case 'pages_read':
          currentProgress = user.readingStats.totalPagesRead;
          break;
        case 'reading_streak':
          currentProgress = user.readingStats.streak.current;
          break;
        case 'reviews_written':
          currentProgress = await Review.countDocuments({ user: userId });
          break;
        default:
          continue;
      }

      isCompleted = currentProgress >= achievement.requirements.value;

      if (existingUserAchievement) {
        // Update existing achievement
        existingUserAchievement.progress.current = currentProgress;
        if (isCompleted && !existingUserAchievement.isCompleted) {
          existingUserAchievement.isCompleted = true;
          existingUserAchievement.earnedAt = new Date();
          newAchievements.push(achievement);
        }
        await existingUserAchievement.save();
      } else {
        // Create new user achievement
        const userAchievement = new UserAchievement({
          user: userId,
          achievement: achievement._id,
          progress: {
            current: currentProgress,
            required: achievement.requirements.value
          },
          isCompleted
        });

        if (isCompleted) {
          newAchievements.push(achievement);
        }

        await userAchievement.save();
      }
    }

    res.json({
      status: 'success',
      data: {
        newAchievements,
        message: newAchievements.length > 0 
          ? `Congratulations! You earned ${newAchievements.length} new achievement(s)!`
          : 'No new achievements earned'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to check achievements'
    });
  }
});

// Get achievement leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;
    
    let matchQuery = {};
    if (category) {
      const achievements = await Achievement.find({ category, isActive: true });
      matchQuery = { achievement: { $in: achievements.map(a => a._id) } };
    }

    const leaderboard = await UserAchievement.aggregate([
      {
        $match: {
          isCompleted: true,
          ...matchQuery
        }
      },
      {
        $group: {
          _id: '$user',
          achievementCount: { $sum: 1 },
          latestAchievement: { $max: '$earnedAt' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          user: {
            firstName: '$user.firstName',
            lastName: '$user.lastName',
            avatar: '$user.avatar'
          },
          achievementCount: 1,
          latestAchievement: 1
        }
      },
      {
        $sort: { achievementCount: -1, latestAchievement: -1 }
      },
      {
        $limit: limit * 1
      }
    ]);

    res.json({
      status: 'success',
      data: {
        leaderboard,
        category: category || 'all'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch leaderboard'
    });
  }
});

// Create achievement (admin only)
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();

    res.status(201).json({
      status: 'success',
      message: 'Achievement created successfully',
      data: { achievement }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create achievement'
    });
  }
});

// Update achievement (admin only)
router.put('/:id', authenticateToken, requireRole('admin'), validateObjectId('id'), async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({
        status: 'error',
        message: 'Achievement not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Achievement updated successfully',
      data: { achievement }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update achievement'
    });
  }
});

module.exports = router;