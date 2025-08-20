import { Link } from 'react-router-dom';
import { Clock, DollarSign, Users } from 'lucide-react';

const GigCard = ({ gig }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{gig.title}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {gig.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{gig.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {gig.skillsRequired.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          {gig.duration}
        </div>
        
        {gig.stipend > 0 && (
          <div className="flex items-center">
            <DollarSign size={16} className="mr-1" />
            ₹{gig.stipend}
          </div>
        )}
        
        <div className="flex items-center">
          <Users size={16} className="mr-1" />
          {gig.applicationsCount} applicants
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          by {gig.postedBy?.name || 'Unknown'}
        </span>
        
        <Link
          to={`/gigs/${gig._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GigCard;