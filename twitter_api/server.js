const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load config
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Route files
const users = require('./routes/users');

// Mount rourters
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
