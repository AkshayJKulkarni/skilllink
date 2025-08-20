import { Link } from 'react-router-dom';
import { Briefcase, Users, Star, ArrowRight } from 'lucide-react';
import { isAuthenticated, isStudent } from '../utils/auth';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connect. Learn. Grow.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            SkillLink bridges the gap between talented students and innovative startups through 
            micro-internships that create real value for both parties.
          </p>
          
          {!isAuthenticated() ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/gigs"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Browse Gigs
              </Link>
            </div>
          ) : (
            <Link
              to={isStudent() ? "/gigs" : "/dashboard"}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Go to Dashboard
              <ArrowRight size={20} className="ml-2" />
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose SkillLink?
          </h2>
          <p className="text-lg text-gray-600">
            The perfect platform for micro-internships and skill development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Real Projects
            </h3>
            <p className="text-gray-600">
              Work on actual startup projects that make a real impact. Build your portfolio 
              with meaningful work experience.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Direct Connection
            </h3>
            <p className="text-gray-600">
              Connect directly with startup founders and teams. Build valuable 
              professional relationships for your future career.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Skill Development
            </h3>
            <p className="text-gray-600">
              Learn new technologies and improve existing skills through hands-on 
              projects with feedback from industry professionals.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students and startups already using SkillLink
          </p>
          
          {!isAuthenticated() && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign Up as Student
              </Link>
              <Link
                to="/register"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                Sign Up as Startup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;