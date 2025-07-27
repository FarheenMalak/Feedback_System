if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/connectToDb");
const feedbackController = require('./controllers/feedbackController');
const usersController = require('./controllers/usersController');
const requireAuth = require('./middleware/requireAuth');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));

// Connect to database
connectToDb();

// Auth Routes
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/check-auth', requireAuth, usersController.checkAuth);

// Feedback Routes
app.get('/feedbacks', requireAuth, feedbackController.fetchFeedbacks);
app.get('/feedbacks/:id', requireAuth, feedbackController.fetchFeedback);
app.post('/feedbacks', requireAuth, feedbackController.createFeedback);
app.put('/feedbacks/:id', requireAuth, feedbackController.updateFeedback);
app.delete('/feedbacks/:id', requireAuth, feedbackController.deleteFeedback);

//admin
app.get('/admin/dashboard', requireAuth, (req, res) => {
  res.json({ message: "Welcome Admin! This is your dashboard." });
});
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
