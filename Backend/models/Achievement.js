/**
 * Achievement model for user badges and rewards
 */

const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  // Achievement Information
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  
  // Achievement Details
  category: {
    type: String,
    enum: ['reading', 'social', 'milestone', 'special'],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  
  // Requirements
  requirements: {
    type: {
      type: String,
      enum: ['books_read', 'pages_read', 'reading_streak', 'reviews_written', 'custom'],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    condition: String // Additional condition if needed
  },
  
  // Rewards
  rewards: {
    points: {
      type: Number,
      default: 0
    },
    badge: {
      type: String
    }
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);