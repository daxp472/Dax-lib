/**
 * Logging utility for the application
 */

const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const logger = {
  log: (level, message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta
    };

    // Console output
    console.log(`[${timestamp}] ${level}: ${message}`, meta);

    // File output (in production)
    if (process.env.NODE_ENV === 'production') {
      const logFile = path.join(logsDir, 'app.log');
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }
  },

  error: (message, meta = {}) => logger.log('ERROR', message, meta),
  warn: (message, meta = {}) => logger.log('WARN', message, meta),
  info: (message, meta = {}) => logger.log('INFO', message, meta),
  debug: (message, meta = {}) => logger.log('DEBUG', message, meta)
};

module.exports = logger;