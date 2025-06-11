/**
 * AI Integration controller for summaries and recommendations
 */

const OpenAI = require('openai');
const Book = require('../models/Book');
const User = require('../models/User');
const AIUsage = require('../models/AIUsage');
const ReadingProgress = require('../models/ReadingProgress');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate book summary
const generateBookSummary = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { type = 'short' } = req.query; // short or long

    // Find the book
    const book = await Book.findById(bookId).populate('author', 'name');
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    // Check if summary already exists
    if (book.aiSummary && book.aiSummary[type]) {
      return res.json({
        status: 'success',
        data: {
          summary: book.aiSummary[type],
          fromCache: true
        }
      });
    }

    // Create AI usage record
    const aiUsage = new AIUsage({
      user: req.user._id,
      service: 'openai',
      operation: 'book_summary',
      requestData: {
        bookId: book._id
      }
    });

    try {
      const prompt = type === 'long' 
        ? `Provide a comprehensive summary of the book "${book.title}" by ${book.author.name}. Include key themes, plot points, and important insights. Description: ${book.description}`
        : `Provide a concise summary of the book "${book.title}" by ${book.author.name} in 2-3 sentences. Description: ${book.description}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable librarian who provides accurate and helpful book summaries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: type === 'long' ? 500 : 150,
        temperature: 0.7
      });

      const summary = response.choices[0].message.content;

      // Update AI usage record
      aiUsage.status = 'completed';
      aiUsage.responseData = {
        content: summary,
        processingTime: Date.now() - aiUsage.createdAt
      };
      aiUsage.requestData.tokens = {
        input: response.usage.prompt_tokens,
        output: response.usage.completion_tokens,
        total: response.usage.total_tokens
      };
      await aiUsage.save();

      // Update book with summary
      if (!book.aiSummary) {
        book.aiSummary = {};
      }
      book.aiSummary[type] = summary;
      book.aiSummary.generatedAt = new Date();
      await book.save();

      // Increment user AI usage
      if (req.user.aiUsage.limit !== -1) {
        req.user.aiUsage.current += 1;
        await req.user.save();
      }

      res.json({
        status: 'success',
        data: {
          summary,
          fromCache: false,
          tokensUsed: response.usage.total_tokens
        }
      });

    } catch (aiError) {
      // Update AI usage record with error
      aiUsage.status = 'failed';
      aiUsage.errorMessage = aiError.message;
      await aiUsage.save();

      throw aiError;
    }

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate summary',
      error: error.message
    });
  }
};

// Generate smart recommendations
const generateSmartRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's reading history
    const readingHistory = await ReadingProgress.find({
      user: userId,
      status: 'completed'
    }).populate('book', 'title genres author').populate('book.author', 'name');

    if (readingHistory.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No reading history found. Complete reading some books first.'
      });
    }

    // Create AI usage record
    const aiUsage = new AIUsage({
      user: userId,
      service: 'openai',
      operation: 'smart_recommendation'
    });

    try {
      // Prepare reading history for AI
      const booksRead = readingHistory.map(rp => ({
        title: rp.book.title,
        author: rp.book.author.name,
        genres: rp.book.genres
      }));

      const prompt = `Based on the following reading history, recommend 5 books that this user might enjoy. Consider genres, themes, and authors. Reading history: ${JSON.stringify(booksRead)}. 

      Please respond with a JSON array of recommendations, each with:
      - title: string
      - author: string
      - reason: string (why this book is recommended)
      - genres: array of strings
      - confidence: number (0-1)`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable book recommendation system. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.8
      });

      let recommendations;
      try {
        recommendations = JSON.parse(response.choices[0].message.content);
      } catch (parseError) {
        throw new Error('Invalid AI response format');
      }

      // Update AI usage record
      aiUsage.status = 'completed';
      aiUsage.responseData = {
        content: JSON.stringify(recommendations),
        processingTime: Date.now() - aiUsage.createdAt
      };
      aiUsage.requestData = {
        tokens: {
          input: response.usage.prompt_tokens,
          output: response.usage.completion_tokens,
          total: response.usage.total_tokens
        }
      };
      await aiUsage.save();

      // Increment user AI usage
      if (req.user.aiUsage.limit !== -1) {
        req.user.aiUsage.current += 1;
        await req.user.save();
      }

      res.json({
        status: 'success',
        data: {
          recommendations,
          basedOnBooks: booksRead.length,
          tokensUsed: response.usage.total_tokens
        }
      });

    } catch (aiError) {
      // Update AI usage record with error
      aiUsage.status = 'failed';
      aiUsage.errorMessage = aiError.message;
      await aiUsage.save();

      throw aiError;
    }

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate recommendations',
      error: error.message
    });
  }
};

// Get AI usage statistics
const getAIUsageStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = 'month' } = req.query;

    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'day':
        dateFilter = { createdAt: { $gte: new Date(now.setHours(0,0,0,0)) } };
        break;
      case 'week':
        dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
        break;
      case 'month':
        dateFilter = { createdAt: { $gte: new Date(now.setMonth(now.getMonth() - 1)) } };
        break;
    }

    const stats = await AIUsage.aggregate([
      {
        $match: {
          user: userId,
          ...dateFilter
        }
      },
      {
        $group: {
          _id: '$operation',
          count: { $sum: 1 },
          totalTokens: { $sum: '$requestData.tokens.total' },
          avgProcessingTime: { $avg: '$responseData.processingTime' }
        }
      }
    ]);

    const totalUsage = await AIUsage.countDocuments({
      user: userId,
      ...dateFilter
    });

    res.json({
      status: 'success',
      data: {
        stats,
        totalUsage,
        currentLimit: req.user.aiUsage.limit,
        currentUsage: req.user.aiUsage.current,
        period
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch AI usage stats'
    });
  }
};

module.exports = {
  generateBookSummary,
  generateSmartRecommendations,
  getAIUsageStats
};