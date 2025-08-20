import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase } from 'lucide-react';
import { isAuthenticated, getUser, clearAuth, isStudent, isStartup } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              SkillLink
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <Link to="/gigs" className="hover:text-blue-200">
                  Browse Gigs
                </Link>
                
                {isStudent() && (
                  <Link to="/dashboard" className="hover:text-blue-200">
                    My Applications
                  </Link>
                )}
                
                {isStartup() && (
                  <>
                    <Link to="/dashboard" className="hover:text-blue-200">
                      My Gigs
                    </Link>
                    <Link to="/post-gig" className="hover:text-blue-200">
                      Post Gig
                    </Link>
                  </>
                )}
                
                <Link to="/profile" className="flex items-center hover:text-blue-200">
                  <User size={18} className="mr-1" />
                  {user?.name}
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:text-blue-200"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;