/**
 * Author model with comprehensive information and analytics
 */

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  bio: {
    type: String,
    required: true
  },
  
  // Personal Details
  birthDate: {
    type: Date
  },
  deathDate: {
    type: Date
  },
  nationality: {
    type: String,
    trim: true
  },
  
  // Professional Information
  genres: [{
    type: String
  }],
  awards: [{
    name: String,
    year: Number,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    year: Number
  }],
  
  // Media
  photo: {
    type: String
  },
  
  // Social & Contact
  website: {
    type: String
  },
  socialMedia: {
    twitter: String,
    instagram: String,
    facebook: String,
    linkedin: String
  },
  
  // Analytics
  analytics: {
    totalBooks: {
      type: Number,
      default: 0
    },
    totalReads: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    followerCount: {
      type: Number,
      default: 0
    }
  },
  
  // Status
  isVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes
authorSchema.index({ name: 'text', bio: 'text' });
authorSchema.index({ genres: 1 });

module.exports = mongoose.model('Author', authorSchema);