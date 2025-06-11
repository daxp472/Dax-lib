/**
 * Reading Progress model to track user's reading journey
 */

const mongoose = require('mongoose');

const readingProgressSchema = new mongoose.Schema({
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
  
  // Progress Information
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true
  },
  currentChapter: {
    type: Number,
    default: 1
  },
  
  // Reading Statistics
  readingTime: {
    total: {
      type: Number,
      default: 0 // in minutes
    },
    sessions: [{
      startTime: Date,
      endTime: Date,
      duration: Number, // in minutes
      pagesRead: Number
    }]
  },
  
  // Status
  status: {
    type: String,
    enum: ['not_started', 'reading', 'completed', 'paused', 'abandoned'],
    default: 'not_started'
  },
  
  // Completion Information
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  
  // Reading Pace
  averagePagesPerSession: {
    type: Number,
    default: 0
  },
  estimatedCompletionDate: {
    type: Date
  },
  
  // Last Activity
  lastReadAt: {
    type: Date,
    default: Date.now
  },
  
  // Reading Notes
  notes: [{
    page: Number,
    chapter: Number,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Compound index to prevent duplicate progress entries
readingProgressSchema.index({ user: 1, book: 1 }, { unique: true });
readingProgressSchema.index({ user: 1, status: 1 });
readingProgressSchema.index({ lastReadAt: -1 });

// Calculate progress percentage
readingProgressSchema.virtual('progressPercentage').get(function() {
  return Math.round((this.currentPage / this.totalPages) * 100);
});

// Update reading session
readingProgressSchema.methods.updateSession = function(pagesRead, duration) {
  const session = {
    startTime: new Date(Date.now() - duration * 60000),
    endTime: new Date(),
    duration: duration,
    pagesRead: pagesRead
  };
  
  this.readingTime.sessions.push(session);
  this.readingTime.total += duration;
  this.currentPage += pagesRead;
  this.lastReadAt = new Date();
  
  // Update status
  if (this.status === 'not_started') {
    this.status = 'reading';
    this.startedAt = new Date();
  }
  
  if (this.currentPage >= this.totalPages) {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  
  return this.save();
};

module.exports = mongoose.model('ReadingProgress', readingProgressSchema);