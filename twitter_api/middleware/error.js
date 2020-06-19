const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let customError = { ...err };
  customError.message = err.message;

  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    customError = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field vallue entered';
    customError = new ErrorResponse(message, 400);
  }

  // Mongoose vaidation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    customError = new ErrorResponse(message, 400);
  }

  res.status(customError.statusCode || 500).json({
    success: false,
    error: customError.message || 'Server Error',
  });
};

module.exports = errorHandler;
