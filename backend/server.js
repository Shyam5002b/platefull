//mongodb+srv://sshym16:<db_password>@cluster0.q6iuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
require('dotenv').config();         // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// 1) MIDDLEWARE
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// 2) CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// 3) ROUTES
app.use('/api/auth', authRoutes);

// 4) START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
