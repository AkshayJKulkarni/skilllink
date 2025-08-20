import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ExternalLink } from 'lucide-react';
import { applicationsAPI } from '../utils/api';

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getMyApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your applications...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <Link
          to="/gigs"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Browse More Gigs
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">You haven't applied to any gigs yet.</p>
          <Link
            to="/gigs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Gigs
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div key={application._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {application.gig.title}
                  </h3>
                  <p className="text-gray-600">
                    by {application.gig.postedBy?.name || 'Unknown'}
                  </p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Applied on</p>
                  <p className="flex items-center text-gray-700">
                    <Clock size={16} className="mr-1" />
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                {application.githubLink && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">GitHub Link</p>
                    <a
                      href={application.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      View Project
                    </a>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Cover Letter</p>
                <p className="text-gray-700">{application.coverLetter}</p>
              </div>

              {application.feedback && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Feedback</p>
                  <p className="text-gray-700">{application.feedback}</p>
                  {application.rating && (
                    <p className="text-sm text-gray-600 mt-2">
                      Rating: {application.rating}/5 ⭐
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end">
                <Link
                  to={`/gigs/${application.gig._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Gig Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;