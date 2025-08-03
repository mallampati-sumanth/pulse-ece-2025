const Event = require('../Models/eventModel');
const EventRegistration = require('../Models/eventRegistrationModel');
const User = require('../Models/userModel');
const { sendEventRegistrationEmail } = require('../utils/eventEmailer');
const multer = require('multer');
const path = require('path');

// Multer configuration for event images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/events/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
}).single('eventImage');

// Get all events (public)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    
    res.render('events', { events });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { 
      message: 'Error fetching events',
      error: error 
    });
  }
};

// Get single event details
exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!event) {
      return res.status(404).render('error', { 
        message: 'Event not found' 
      });
    }

    // Get registration count
    const registrationCount = await EventRegistration.countDocuments({ 
      event: event._id,
      status: { $ne: 'Cancelled' }
    });

    // Check if user is already registered (if logged in)
    let isRegistered = false;
    if (req.session.user) {
      const existingRegistration = await EventRegistration.findOne({
        event: event._id,
        user: req.session.user._id
      });
      isRegistered = !!existingRegistration;
    }

    res.render('eventDetails', { 
      event, 
      registrationCount, 
      isRegistered,
      spotsLeft: event.capacity - registrationCount
    });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { 
      message: 'Error fetching event details',
      error: error 
    });
  }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    console.log('Registration attempt:', {
      body: req.body,
      user: req.session.user ? req.session.user._id : 'No user',
      timestamp: new Date().toISOString()
    });

    const { eventId, additionalInfo, teamMembers, isTeamEvent } = req.body;
    
    if (!req.session.user) {
      console.log('Registration failed: No user in session');
      return res.status(401).json({
        status: 'Failed',
        error: 'Please login to register for events'
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      console.log('Registration failed: Event not found:', eventId);
      return res.status(404).json({
        status: 'Failed',
        error: 'Event not found'
      });
    }

    console.log('Event found:', {
      id: event._id,
      title: event.title,
      registrationDeadline: event.registrationDeadline,
      capacity: event.capacity
    });

    // Check if registration deadline has passed
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      console.log('Registration failed: Deadline passed');
      return res.status(400).json({
        status: 'Failed',
        error: 'Registration deadline has passed'
      });
    }

    // Check if event is full
    const registrationCount = await EventRegistration.countDocuments({ 
      event: eventId,
      status: { $ne: 'Cancelled' }
    });

    console.log('Current registrations:', registrationCount, 'of', event.capacity);

    if (event.capacity && registrationCount >= event.capacity) {
      console.log('Registration failed: Event is full');
      return res.status(400).json({
        status: 'Failed',
        error: 'Event is full'
      });
    }

    // Check if user is already registered
    const existingRegistration = await EventRegistration.findOne({
      event: eventId,
      user: req.session.user._id
    });

    if (existingRegistration) {
      console.log('Registration failed: User already registered');
      return res.status(400).json({
        status: 'Failed',
        error: 'You are already registered for this event'
      });
    }

    // Create registration
    const registration = await EventRegistration.create({
      event: eventId,
      user: req.session.user._id,
      additionalInfo,
      teamMembers: isTeamEvent === 'true' ? JSON.parse(teamMembers || '[]') : [],
      isTeamEvent: isTeamEvent === 'true'
    });

    console.log('Registration successful:', registration._id);

    // Send confirmation email
    try {
      const fullUser = await User.findById(req.session.user._id);
      await sendEventRegistrationEmail(fullUser, event, registration);
      console.log('Registration confirmation email sent to:', fullUser.email);
    } catch (emailError) {
      console.error('Failed to send registration email:', emailError);
      // Don't fail the registration if email fails
    }

    res.status(201).json({
      status: 'Success',
      message: 'Successfully registered for the event! Check your email for confirmation details.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'Failed',
        error: 'You are already registered for this event'
      });
    }
    res.status(500).json({
      status: 'Failed',
      error: 'Registration failed. Please try again.'
    });
  }
};

// Cancel event registration
exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    if (!req.session.user) {
      return res.status(401).json({
        status: 'Failed',
        error: 'Please login to cancel registration'
      });
    }

    const registration = await EventRegistration.findOneAndUpdate(
      {
        event: eventId,
        user: req.session.user._id
      },
      { status: 'Cancelled' },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        status: 'Failed',
        error: 'Registration not found'
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Registration cancelled successfully'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Failed',
      error: 'Failed to cancel registration'
    });
  }
};

// Get user's registered events
exports.getUserEvents = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/signin');
    }

    const registrations = await EventRegistration.find({
      user: req.session.user._id,
      status: { $ne: 'Cancelled' }
    })
    .populate('event')
    .sort({ registrationDate: -1 });

    res.render('userEvents', { registrations });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { 
      message: 'Error fetching your events',
      error: error 
    });
  }
};

// ADMIN FUNCTIONS

// Admin - Get all events
exports.adminGetAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.render('adminEvents', { events });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { 
      message: 'Error fetching events',
      error: error 
    });
  }
};

// Admin - Create event form
exports.adminCreateEventForm = (req, res) => {
  res.render('adminCreateEvent');
};

// Admin - Create event
exports.adminCreateEvent = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({
        status: 'Failed',
        error: err.message
      });
    }

    try {
      const {
        title,
        description,
        date,
        time,
        venue,
        capacity,
        category,
        registrationDeadline,
        entryFee,
        requirements,
        prizes
      } = req.body;

      // Process coordinators
      const coordinators = [];
      if (req.body.coordinators) {
        for (const key in req.body.coordinators) {
          const coord = req.body.coordinators[key];
          if (coord.name && coord.email && coord.phone) {
            coordinators.push({
              name: coord.name,
              email: coord.email,
              phone: coord.phone
            });
          }
        }
      }

      const eventData = {
        title,
        description,
        date: new Date(date),
        time,
        venue,
        capacity: parseInt(capacity) || 100,
        category: category || 'Other',
        registrationDeadline: new Date(registrationDeadline),
        entryFee: parseInt(entryFee) || 0,
        requirements: requirements || 'No specific requirements',
        prizes: prizes || 'To be announced',
        coordinators,
        createdBy: req.session.user._id
      };

      if (req.file) {
        eventData.image = req.file.filename;
      }

      const event = await Event.create(eventData);

      res.status(201).json({
        status: 'Success',
        message: 'Event created successfully!',
        eventId: event._id
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'Failed',
        error: 'Failed to create event'
      });
    }
  });
};

// Admin - Update event
exports.adminUpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert date strings to Date objects
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    if (updateData.registrationDeadline) {
      updateData.registrationDeadline = new Date(updateData.registrationDeadline);
    }
    if (updateData.capacity) {
      updateData.capacity = parseInt(updateData.capacity);
    }

    const event = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return res.status(404).json({
        status: 'Failed',
        error: 'Event not found'
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Event updated successfully!'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Failed',
      error: 'Failed to update event'
    });
  }
};

// Admin - Delete event
exports.adminDeleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all registrations for this event first
    await EventRegistration.deleteMany({ event: id });

    // Delete the event
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        status: 'Failed',
        error: 'Event not found'
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Event deleted successfully!'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Failed',
      error: 'Failed to delete event'
    });
  }
};

// Admin - Get event registrations
exports.adminGetEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).render('error', { 
        message: 'Event not found' 
      });
    }

    const registrations = await EventRegistration.find({ event: eventId })
      .populate('user', 'name email phone batch branch')
      .sort({ registrationDate: -1 });

    res.render('adminEventRegistrations', { 
      event, 
      registrations 
    });

  } catch (error) {
    console.log(error);
    res.status(500).render('error', { 
      message: 'Error fetching registrations',
      error: error 
    });
  }
};

// Admin - Update registration status
exports.adminUpdateRegistrationStatus = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { status } = req.body;

    const registration = await EventRegistration.findByIdAndUpdate(
      registrationId,
      { status },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        status: 'Failed',
        error: 'Registration not found'
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Registration status updated successfully!'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Failed',
      error: 'Failed to update registration status'
    });
  }
};

module.exports = exports;
