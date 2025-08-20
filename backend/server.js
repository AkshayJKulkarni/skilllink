const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gigs', require('./routes/gigRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'SkillLink Backend API', 
    status: 'Running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      gigs: '/api/gigs',
      applications: '/api/applications'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'SkillLink API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});