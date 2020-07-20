require('colors');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load config
dotenv.config({ path: './config/config.env' });

// Connect to database;
connectDB();

const app = express();

// Body parser
app.use(express.json({ limit: '5mb' }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Route files
const users = require('./routes/users');
const auth = require('./routes/auth');
const tweets = require('./routes/tweets');
const comments = require('./routes/comments');

// Mount rourters
const baseUrl = '/api/v1';
app.use(`${baseUrl}/users`, users);
app.use(`${baseUrl}/auth`, auth);
app.use(`${baseUrl}/tweets`, tweets);
app.use(`${baseUrl}/comments`, comments);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);

// Handle unhandled promise recections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Err: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
