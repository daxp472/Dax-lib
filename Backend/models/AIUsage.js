/**
 * AI Usage tracking model for monitoring and limiting AI API calls
 */

const mongoose = require('mongoose');

const aiUsageSchema = new mongoose.Schema({
  // Reference Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Usage Information
  service: {
    type: String,
    enum: ['openai', 'gemini', 'summary', 'recommendation'],
    required: true
  },
  operation: {
    type: String,
    enum: ['book_summary', 'smart_recommendation', 'content_analysis'],
    required: true
  },
  
  // Request Details
  requestData: {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    prompt: String,
    tokens: {
      input: Number,
      output: Number,
      total: Number
    }
  },
  
  // Response Details
  responseData: {
    content: String,
    confidence: Number,
    processingTime: Number // in milliseconds
  },
  
  // Cost & Billing
  cost: {
    type: Number,
    default: 0
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'timeout'],
    default: 'pending'
  },
  errorMessage: String
}, {
  timestamps: true
});

// Indexes for analytics
aiUsageSchema.index({ user: 1, createdAt: -1 });
aiUsageSchema.index({ service: 1, operation: 1 });
aiUsageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AIUsage', aiUsageSchema);