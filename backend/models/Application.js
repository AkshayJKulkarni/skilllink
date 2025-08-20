const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, required: true },
  githubLink: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  feedback: String,
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);