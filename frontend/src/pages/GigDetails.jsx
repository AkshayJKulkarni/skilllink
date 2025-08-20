import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, DollarSign, Users, Building } from 'lucide-react';
import { gigsAPI, applicationsAPI } from '../utils/api';
import { isStudent, isAuthenticated } from '../utils/auth';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    githubLink: ''
  });

  useEffect(() => {
    fetchGig();
  }, [id]);

  const fetchGig = async () => {
    try {
      const response = await gigsAPI.getGigById(id);
      setGig(response.data);
    } catch (error) {
      console.error('Error fetching gig:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await applicationsAPI.applyToGig({
        gigId: id,
        ...applicationData
      });
      alert('Application submitted successfully!');
      setShowApplicationForm(false);
      fetchGig(); // Refresh to update application count
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading gig details...</div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Gig not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{gig.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {gig.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center text-gray-600">
            <Clock size={20} className="mr-2" />
            <span>{gig.duration}</span>
          </div>
          
          {gig.stipend > 0 && (
            <div className="flex items-center text-gray-600">
              <DollarSign size={20} className="mr-2" />
              <span>₹{gig.stipend}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-600">
            <Users size={20} className="mr-2" />
            <span>{gig.applicationsCount} applicants</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{gig.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Skills Required</h2>
          <div className="flex flex-wrap gap-2">
            {gig.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Building size={20} className="mr-2 text-gray-600" />
            <h3 className="font-semibold">Posted by</h3>
          </div>
          <p className="text-gray-700">{gig.postedBy.name}</p>
          {gig.postedBy.profile?.company && (
            <p className="text-gray-600">{gig.postedBy.profile.company}</p>
          )}
        </div>

        {isStudent() && gig.status === 'open' && (
          <div className="border-t pt-6">
            {!showApplicationForm ? (
              <button
                onClick={() => setShowApplicationForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply for this Gig
              </button>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <h3 className="text-lg font-semibold">Submit Application</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us why you're perfect for this gig..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={applicationData.githubLink}
                    onChange={(e) => setApplicationData({
                      ...applicationData,
                      githubLink: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/yourusername/project"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={applying}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetails;