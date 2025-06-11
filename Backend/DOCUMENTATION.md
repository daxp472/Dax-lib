# Dax's Library - Backend Documentation

## Project Overview

Dax's Library is an ultra-modern, AI-powered digital library backend system built with Node.js, Express.js, and MongoDB. The system provides comprehensive book management, user authentication, AI integrations, and advanced features for a premium digital reading experience.

## Architecture & Technology Stack

### Core Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **@dax-crafta/auth** - Authentication library with RBAC
- **JWT** - Token-based authentication
- **OpenAI API** - AI-powered features
- **Stripe** - Payment processing (prepared)

### Security & Middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Morgan** - HTTP request logging
- **Express Validator** - Input validation
- **bcryptjs** - Password hashing

## Project Structure

```
/
├── server.js                 # Main application entry point
├── config/
│   ├── database.js          # Database connection configuration
│   └── auth.js              # Authentication configuration
├── models/                  # MongoDB schemas
│   ├── User.js              # User model with RBAC
│   ├── Book.js              # Book model with analytics
│   ├── Author.js            # Author information model
│   ├── Review.js            # Book reviews and ratings
│   ├── ReadingProgress.js   # Reading tracking model
│   ├── AIUsage.js           # AI API usage tracking
│   ├── Wishlist.js          # User wishlist model
│   ├── Achievement.js       # Achievement definitions
│   ├── UserAchievement.js   # User earned achievements
│   └── Bookmark.js          # Reading bookmarks with notes
├── controllers/             # Business logic
│   ├── authController.js    # Authentication operations
│   ├── bookController.js    # Book management
│   └── aiController.js      # AI integration logic
├── routes/                  # API endpoints
│   ├── authRoutes.js        # Authentication routes
│   ├── bookRoutes.js        # Book management routes
│   ├── userRoutes.js        # User dashboard routes
│   ├── reviewRoutes.js      # Review system routes
│   ├── progressRoutes.js    # Reading progress routes
│   ├── aiRoutes.js          # AI feature routes
│   ├── wishlistRoutes.js    # Wishlist management
│   ├── authorRoutes.js      # Author information
│   ├── trendingRoutes.js    # Trending books
│   ├── achievementRoutes.js # Achievement system
│   ├── bookmarkRoutes.js    # Bookmark management
│   ├── recommendationRoutes.js # Smart recommendations
│   └── stripeRoutes.js      # Payment integration
├── middleware/              # Custom middleware
│   ├── authMiddleware.js    # Authentication & authorization
│   ├── errorHandler.js      # Global error handling
│   └── validation.js        # Input validation rules
└── utils/                   # Utility functions
    ├── logger.js            # Logging utility
    └── helpers.js           # Helper functions
```

## Authentication & Authorization

### Role-Based Access Control (RBAC)

The system implements a comprehensive RBAC system with five user roles:

1. **Guest** (Level 0)
   - Basic book browsing
   - No AI features
   - Read-only access

2. **Student** (Level 1)
   - Full book access
   - 10 AI summaries/month
   - Basic bookmarks and reviews

3. **Plus** (Level 2)
   - Enhanced features
   - 50 AI summaries/month
   - Wishlist functionality

4. **Pro** (Level 3)
   - Unlimited AI features
   - Priority support
   - Advanced analytics

5. **Admin** (Level 4)
   - Full system access
   - User management
   - Content moderation

### Authentication Flow

1. **Registration**: Email/password with validation
2. **Email Verification**: Token-based verification
3. **Login**: JWT token generation
4. **Token Refresh**: Secure token renewal
5. **Role Enforcement**: Middleware-based permission checking

## API Routes Overview

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh-token` - Token refresh
- `GET /verify/:token` - Email verification
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /logout` - User logout

### Book Management (`/api/books`)
- `GET /` - Get all books with filtering
- `GET /search` - Search books
- `GET /featured` - Get featured books
- `GET /genre/:genre` - Get books by genre
- `GET /:id` - Get single book
- `POST /` - Create book (admin)
- `PUT /:id` - Update book (admin)
- `DELETE /:id` - Archive book (admin)

### User Dashboard (`/api/users`)
- `GET /dashboard` - Get dashboard data
- `GET /saved-books` - Get user's reading list
- `GET /reading-stats` - Get reading statistics
- `PUT /preferences` - Update user preferences

### AI Features (`/api/ai`)
- `GET /summary/:bookId` - Generate book summary
- `GET /recommendations` - Get smart recommendations
- `GET /usage` - Get AI usage statistics

### Reviews & Ratings (`/api/reviews`)
- `GET /book/:bookId` - Get book reviews
- `POST /` - Create review
- `PUT /:id` - Update review
- `DELETE /:id` - Delete review
- `POST /:id/like` - Like/unlike review

### Reading Progress (`/api/progress`)
- `GET /` - Get all reading progress
- `GET /book/:bookId` - Get book progress
- `POST /start/:bookId` - Start reading
- `PUT /:bookId` - Update progress
- `POST /:bookId/notes` - Add reading note

### Additional Features
- **Wishlist Management** (`/api/wishlist`)
- **Author Information** (`/api/authors`)
- **Trending Books** (`/api/trending`)
- **Achievement System** (`/api/achievements`)
- **Bookmark Management** (`/api/bookmarks`)
- **Smart Recommendations** (`/api/recommendations`)
- **Stripe Integration** (`/api/stripe`)

## AI Integration Workflow

### AI-Powered Features

1. **Book Summaries**
   - Short and long format summaries
   - Cached results for performance
   - Usage tracking and quota management

2. **Smart Recommendations**
   - Based on reading history
   - Genre and author preferences
   - AI-generated explanations

3. **Content Analysis**
   - Keyword extraction
   - Theme identification
   - Reading difficulty assessment

### AI Usage Management

- **Quota System**: Role-based AI usage limits
- **Usage Tracking**: Detailed analytics per user
- **Cost Management**: Token usage monitoring
- **Caching**: Intelligent result caching

## Database Schema Design

### Key Models

1. **User Model**
   - Authentication data
   - Role and permissions
   - Reading statistics
   - AI usage tracking
   - Subscription information

2. **Book Model**
   - Comprehensive metadata
   - Analytics and ratings
   - AI-generated content
   - File management

3. **Reading Progress**
   - Page tracking
   - Session management
   - Time analytics
   - Notes and bookmarks

## Security Implementation

### Security Measures

1. **Authentication Security**
   - JWT with refresh tokens
   - Password hashing (bcrypt)
   - Email verification
   - Rate limiting

2. **API Security**
   - Helmet security headers
   - CORS configuration
   - Input validation
   - SQL injection prevention

3. **Data Protection**
   - Role-based access control
   - Data sanitization
   - Secure file handling
   - Privacy controls

## Performance Optimization

### Database Optimization

1. **Indexing Strategy**
   - Text search indexes
   - Compound indexes for queries
   - Performance monitoring

2. **Query Optimization**
   - Aggregation pipelines
   - Efficient pagination
   - Selective field projection

3. **Caching Strategy**
   - AI result caching
   - Frequently accessed data
   - Session management

## Deployment & Configuration

### Environment Variables

Key configuration variables:
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - JWT signing key
- `OPENAI_API_KEY` - AI integration
- `STRIPE_SECRET_KEY` - Payment processing
- `FRONTEND_URL` - CORS configuration

### Production Considerations

1. **Monitoring & Logging**
   - Comprehensive error logging
   - Performance monitoring
   - User activity tracking

2. **Scalability**
   - Horizontal scaling ready
   - Database optimization
   - Caching strategies

3. **Backup & Recovery**
   - Database backups
   - File storage redundancy
   - Disaster recovery plans

## Future Enhancements

### Planned Features

1. **Advanced AI Features**
   - Reading comprehension tests
   - Personalized learning paths
   - Content recommendations

2. **Social Features**
   - Reading groups
   - Book discussions
   - Social sharing

3. **Mobile Integration**
   - Mobile app API
   - Offline synchronization
   - Push notifications

4. **Analytics Dashboard**
   - Admin analytics
   - User insights
   - Performance metrics

## API Testing

The API is designed to be Postman-friendly with:
- Consistent response formats
- Comprehensive error messages
- Clear documentation
- Example requests and responses

## Support & Maintenance

### Code Quality
- Modular architecture
- Comprehensive error handling
- Input validation
- Security best practices

### Documentation
- Inline code comments
- API documentation
- Setup instructions
- Troubleshooting guides

This backend system provides a solid foundation for a modern, AI-powered digital library platform with room for future expansion and enhancement.