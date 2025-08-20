const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://skilllink-git-main-akshay-j-kulkarnis-projects.vercel.app',
    'https://skilllink-ffhw52jua-akshay-j-kulkarnis-projects.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
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

// Serve static files from frontend build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});