/**
 * Bookmark model for saving reading positions with notes
 */

const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
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
  
  // Position Information
  page: {
    type: Number,
    required: true
  },
  chapter: {
    type: Number
  },
  position: {
    type: String // CSS selector or text position
  },
  
  // Bookmark Content
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  quote: {
    type: String,
    maxlength: 500
  },
  
  // Categorization
  tags: [{
    type: String,
    trim: true
  }],
  color: {
    type: String,
    enum: ['yellow', 'blue', 'green', 'red', 'purple', 'orange'],
    default: 'yellow'
  },
  
  // Status
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
bookmarkSchema.index({ user: 1, book: 1 });
bookmarkSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);