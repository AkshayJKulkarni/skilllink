const Application = require('../models/Application');
const Gig = require('../models/Gig');
const { sendEmail } = require('../utils/emailService');

const applyToGig = async (req, res) => {
  try {
    const { gigId, coverLetter, githubLink } = req.body;
    
    const existingApplication = await Application.findOne({
      gig: gigId,
      applicant: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this gig' });
    }
    
    const application = await Application.create({
      gig: gigId,
      applicant: req.user.id,
      coverLetter,
      githubLink
    });
    
    await Gig.findByIdAndUpdate(gigId, { $inc: { applicationsCount: 1 } });
    
    await application.populate([
      { path: 'gig', select: 'title' },
      { path: 'applicant', select: 'name email' }
    ]);
    
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('gig', 'title description postedBy')
      .populate({
        path: 'gig',
        populate: { path: 'postedBy', select: 'name profile.company' }
      })
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getGigApplications = async (req, res) => {
  try {
    const gig = await Gig.findOne({
      _id: req.params.gigId,
      postedBy: req.user.id
    });
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    const applications = await Application.find({ gig: req.params.gigId })
      .populate('applicant', 'name email profile')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status, feedback, rating } = req.body;
    
    const application = await Application.findById(req.params.id)
      .populate('gig')
      .populate('applicant', 'name email');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    if (application.gig.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    application.status = status;
    if (feedback) application.feedback = feedback;
    if (rating) application.rating = rating;
    
    await application.save();
    
    // Send email notification
    const emailSubject = `Application ${status} - ${application.gig.title}`;
    const emailBody = `
      <h3>Your application has been ${status}</h3>
      <p><strong>Gig:</strong> ${application.gig.title}</p>
      ${feedback ? `<p><strong>Feedback:</strong> ${feedback}</p>` : ''}
      ${rating ? `<p><strong>Rating:</strong> ${rating}/5</p>` : ''}
    `;
    
    await sendEmail(application.applicant.email, emailSubject, emailBody);
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  applyToGig,
  getMyApplications,
  getGigApplications,
  updateApplicationStatus
};