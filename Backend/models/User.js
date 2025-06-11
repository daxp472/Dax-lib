/**
 * User model with role-based access control and AI usage tracking
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  
  // Authentication & Security
  role: {
    type: String,
    enum: ['guest', 'student', 'plus', 'pro', 'admin'],
    default: 'student'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // 2FA Setup (ready but not active)
  twoFactorSecret: String,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  
  // Subscription & Billing
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'trial', 'cancelled'],
    default: 'inactive'
  },
  subscriptionPlan: {
    type: String,
    enum: ['student', 'plus', 'pro'],
    default: 'student'
  },
  subscriptionExpiry: Date,
  stripeCustomerId: String,
  
  // AI Usage Tracking
  aiUsage: {
    current: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    resetDate: {
      type: Date,
      default: Date.now
    }
  },
  
  // Reading Statistics
  readingStats: {
    totalBooksRead: {
      type: Number,
      default: 0
    },
    totalPagesRead: {
      type: Number,
      default: 0
    },
    totalReadingTime: {
      type: Number,
      default: 0 // in minutes
    },
    averageRating: {
      type: Number,
      default: 0
    },
    streak: {
      current: {
        type: Number,
        default: 0
      },
      longest: {
        type: Number,
        default: 0
      },
      lastActivity: {
        type: Date,
        default: Date.now
      }
    }
  },
  
  // Preferences
  preferences: {
    genres: [{
      type: String
    }],
    language: {
      type: String,
      default: 'en'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Activity Tracking
  lastLogin: {
    type: Date,
    default: Date.now
  },
  loginCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ subscriptionStatus: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get user's full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Check if user can use AI features
userSchema.methods.canUseAI = function() {
  if (this.role === 'pro' || this.role === 'admin') return true;
  return this.aiUsage.current < this.aiUsage.limit;
};

// Increment AI usage
userSchema.methods.incrementAIUsage = function() {
  if (this.aiUsage.limit !== -1) { // -1 means unlimited
    this.aiUsage.current += 1;
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema);