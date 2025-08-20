const express = require('express');
const {
  applyToGig,
  getMyApplications,
  getGigApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { auth, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', auth, authorize('student'), applyToGig);
router.get('/my-applications', auth, authorize('student'), getMyApplications);
router.get('/gig/:gigId', auth, authorize('startup'), getGigApplications);
router.put('/:id/status', auth, authorize('startup'), updateApplicationStatus);

module.exports = router;