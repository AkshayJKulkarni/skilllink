const express = require('express');
const {
  createGig,
  getGigs,
  getGigById,
  getMyGigs,
  updateGig,
  deleteGig
} = require('../controllers/gigController');
const { auth, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getGigs);
router.get('/my-gigs', auth, authorize('startup'), getMyGigs);
router.get('/:id', getGigById);
router.post('/', auth, authorize('startup'), createGig);
router.put('/:id', auth, authorize('startup'), updateGig);
router.delete('/:id', auth, authorize('startup'), deleteGig);

module.exports = router;