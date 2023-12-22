const express = require('express');
const mongoose = require('mongoose');
const logger = require('./src/utils/logger');

// Importing routes
const userRoutes = require('./src/api/routes/userRoutes');
const restaurantRoutes = require('./src/api/routes/restaurantRoutes');
const orderRoutes = require('./src/api/routes/orderRoutes');
const reviewRoutes = require('./src/api/routes/reviewRoutes');

// Middleware for handling JSON, URL-encoded data, and environment variables
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log('Connection error', err))
// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

app.get('/',(req, res) => {
  res.send('Connected')
})
// Routes
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App running on port', PORT));

module.exports = app;
