import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Eye } from 'lucide-react';
import { gigsAPI, applicationsAPI } from '../utils/api';

const StartupDashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const fetchMyGigs = async () => {
    try {
      const response = await gigsAPI.getMyGigs();
      setGigs(response.data);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (gigId) => {
    try {
      const response = await applicationsAPI.getGigApplications(gigId);
      setApplications(response.data);
      setSelectedGig(gigId);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const updateApplicationStatus = async (applicationId, status, feedback = '', rating = null) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, {
        status,
        feedback,
        rating
      });
      
      // Refresh applications
      if (selectedGig) {
        fetchApplications(selectedGig);
      }
      
      alert(`Application ${status} successfully!`);
    } catch (error) {
      alert('Failed to update application status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your gigs...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Gigs</h1>
        <Link
          to="/post-gig"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Post New Gig
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gigs List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Posted Gigs</h2>
          
          {gigs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't posted any gigs yet.</p>
              <Link
                to="/post-gig"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Post Your First Gig
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {gigs.map((gig) => (
                <div key={gig._id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{gig.title}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${
                      gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {gig.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {gig.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users size={16} className="mr-1" />
                      {gig.applicationsCount} applicants
                    </div>
                    
                    <button
                      onClick={() => fetchApplications(gig._id)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Eye size={16} className="mr-1" />
                      View Applications
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Applications Panel */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          
          {!selectedGig ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">Select a gig to view applications</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">No applications yet for this gig</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {applications.map((application) => (
                <div key={application._id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {application.applicant.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {application.applicant.email}
                      </p>
                    </div>
                    
                    <span className={`px-2 py-1 rounded text-sm ${
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3">
                    {application.coverLetter}
                  </p>
                  
                  {application.githubLink && (
                    <a
                      href={application.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm block mb-3"
                    >
                      View GitHub Project →
                    </a>
                  )}
                  
                  {application.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateApplicationStatus(application._id, 'accepted')}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Accept
                      </button>
                      
                      <button
                        onClick={() => {
                          const feedback = prompt('Provide feedback (optional):');
                          updateApplicationStatus(application._id, 'rejected', feedback || '');
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  
                  {application.status === 'accepted' && !application.rating && (
                    <button
                      onClick={() => {
                        const rating = prompt('Rate this work (1-5):');
                        const feedback = prompt('Provide feedback:');
                        if (rating && feedback) {
                          updateApplicationStatus(application._id, 'accepted', feedback, parseInt(rating));
                        }
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Provide Rating & Feedback
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupDashboard;