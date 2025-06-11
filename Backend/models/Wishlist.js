/**
 * Wishlist model for user's "Read Later" list
 */

const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  // Reference Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  
  // Wishlist Details
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  notes: {
    type: String,
    maxlength: 500
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'reading', 'completed', 'removed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate wishlist entries
wishlistSchema.index({ user: 1, book: 1 }, { unique: true });
wishlistSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Wishlist', wishlistSchema);