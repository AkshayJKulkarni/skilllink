import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GigList from './pages/GigList';
import GigDetails from './pages/GigDetails';
import StudentDashboard from './pages/StudentDashboard';
import StartupDashboard from './pages/StartupDashboard';
import PostGig from './pages/PostGig';
import Profile from './pages/Profile';
import { isAuthenticated, isStudent, isStartup } from './utils/auth';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0) {
    const userRole = isStudent() ? 'student' : 'startup';
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }
  }
  
  return children;
};

// Dashboard Route - redirects based on user role
const DashboardRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  return isStudent() ? <StudentDashboard /> : <StartupDashboard />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gigs" element={<GigList />} />
          <Route path="/gigs/:id" element={<GigDetails />} />
          
          <Route 
            path="/dashboard" 
            element={<DashboardRoute />} 
          />
          
          <Route 
            path="/post-gig" 
            element={
              <ProtectedRoute allowedRoles={['startup']}>
                <PostGig />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;