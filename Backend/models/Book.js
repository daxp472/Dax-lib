/**
 * Book model with comprehensive metadata and analytics
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  coAuthors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }],
  
  // Publication Details
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  publisher: {
    type: String,
    trim: true
  },
  publishedDate: {
    type: Date
  },
  edition: {
    type: String,
    default: '1st'
  },
  language: {
    type: String,
    default: 'en'
  },
  
  // Content Details
  description: {
    type: String,
    required: true
  },
  genres: [{
    type: String,
    required: true
  }],
  tags: [{
    type: String
  }],
  pageCount: {
    type: Number,
    required: true
  },
  chapters: [{
    title: String,
    startPage: Number,
    endPage: Number
  }],
  
  // Media
  coverImage: {
    type: String,
    required: true
  },
  thumbnails: [{
    size: String, // small, medium, large
    url: String
  }],
  
  // File Information
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number // in bytes
  },
  fileFormat: {
    type: String,
    enum: ['pdf', 'epub', 'mobi', 'txt'],
    default: 'pdf'
  },
  
  // Ratings & Reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  
  // Analytics
  analytics: {
    viewCount: {
      type: Number,
      default: 0
    },
    readCount: {
      type: Number,
      default: 0
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    bookmarkCount: {
      type: Number,
      default: 0
    },
    shareCount: {
      type: Number,
      default: 0
    },
    dailyViews: [{
      date: Date,
      views: Number
    }],
    weeklyViews: [{
      week: String, // YYYY-WW format
      views: Number
    }]
  },
  
  // AI Generated Content
  aiSummary: {
    short: String,
    long: String,
    keywords: [String],
    generatedAt: Date
  },
  
  // Status & Availability
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'archived'],
    default: 'active'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isRecommended: {
    type: Boolean,
    default: false
  },
  
  // Metadata
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for performance
bookSchema.index({ title: 'text', description: 'text' });
bookSchema.index({ genres: 1 });
bookSchema.index({ 'rating.average': -1 });
bookSchema.index({ 'analytics.readCount': -1 });
bookSchema.index({ status: 1, isPublic: 1 });

// Update analytics method
bookSchema.methods.incrementView = function() {
  this.analytics.viewCount += 1;
  
  // Update daily views
  const today = new Date().toISOString().split('T')[0];
  const dailyView = this.analytics.dailyViews.find(dv => 
    dv.date.toISOString().split('T')[0] === today
  );
  
  if (dailyView) {
    dailyView.views += 1;
  } else {
    this.analytics.dailyViews.push({ date: new Date(), views: 1 });
  }
  
  return this.save();
};

// Calculate popularity score
bookSchema.virtual('popularityScore').get(function() {
  const { viewCount, readCount, rating } = this.analytics;
  return (viewCount * 0.1) + (readCount * 0.5) + (rating.average * rating.count * 0.4);
});

module.exports = mongoose.model('Book', bookSchema);