const Gig = require('../models/Gig');
const Application = require('../models/Application');

const createGig = async (req, res) => {
  try {
    const gig = await Gig.create({
      ...req.body,
      postedBy: req.user.id
    });
    
    await gig.populate('postedBy', 'name email');
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getGigs = async (req, res) => {
  try {
    const { skills, search } = req.query;
    let query = { status: 'open' };
    
    if (skills) {
      query.skillsRequired = { $in: skills.split(',') };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const gigs = await Gig.find(query)
      .populate('postedBy', 'name profile.company')
      .sort({ createdAt: -1 });
    
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('postedBy', 'name email profile');
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findOneAndDelete({
      _id: req.params.id,
      postedBy: req.user.id
    });
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    res.json({ message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGig,
  getGigs,
  getGigById,
  getMyGigs,
  updateGig,
  deleteGig
};