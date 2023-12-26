const express = require('express');
const mongoose = require('mongoose');
const logger = require('./src/utils/logger');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // Import the helmet middleware for added security
const xss = require('xss'); // Import the xss package to prevent XSS attacks
const rateLimit = require('express-rate-limit'); // Import rate limiting
const bcrypt = require('bcrypt');
require('dotenv').config();
const userRoutes = require('./src/api/routes/userRoutes');
const restaurantRoutes = require('./src/api/routes/restaurantRoutes');
const orderRoutes = require('./src/api/routes/orderRoutes');
const reviewRoutes = require('./src/api/routes/reviewRoutes');
const categoryRoutes = require('./src/api/routes/categoryRoutes');
const menuItemRoutes = require('./src/api/routes/menuItemRoutes');
const cartRoutes = require('./src/api/routes/cartRoutes');
const passport = require('passport');

require('./config/passport')(passport); 

const app = express();

MongoURL = 'mongodb://localhost:27017/food-app';

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log('Connection error', err));

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(passport.initialize());

// Set security headers using the helmet middleware
app.use(helmet());

// Enable CORS for all routes
app.use(cors());




// Implement a rate limiter to protect against abuse
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });
// app.use('/api/', limiter);

// Static files
app.use(express.static('public'));

app.get('/',(req, res) => {
  res.send('Connected')
});



// Routes
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);


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
