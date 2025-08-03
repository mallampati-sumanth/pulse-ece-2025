const User = require('./../Models/userModel');
const Pulse = require('./../Models/joinPulse');
const Event = require('./../Models/eventModel');
const EventRegistration = require('./../Models/eventRegistrationModel');
const { sendEventRegistrationEmail, sendEventReminderEmail } = require('../utils/eventEmailer');
const bcrypt = require('bcrypt');

exports.admin = async (req, res) => {
  try {
    // Get dynamic counts for dashboard
    const totalUsers = await User.countDocuments({ role: 'student' });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await EventRegistration.countDocuments();
    const totalPulseMembers = await Pulse.countDocuments();
    const totalBloodDonors = await User.countDocuments({ 
      blood: { $exists: true, $ne: null, $ne: '' } 
    });

    const dashboardData = {
      totalUsers,
      totalFaculty,
      totalEvents,
      totalRegistrations,
      totalPulseMembers,
      totalBloodDonors
    };

    res.render('admin', { dashboardData });
  } catch (error) {
    console.log('Dashboard error:', error);
    // Fallback with default values if database fails
    const dashboardData = {
      totalUsers: 0,
      totalFaculty: 0,
      totalEvents: 0,
      totalRegistrations: 0,
      totalPulseMembers: 0,
      totalBloodDonors: 0
    };
    res.render('admin', { dashboardData });
  }
};

exports.createUserForm = (req, res) => {
  const userType = req.params.type;
  if (userType !== 'Student' && userType !== 'Faculty') {
    return res.status(400).send('Invalid user type');
  }
  res.render('adminCreateUser', { userType });
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, batch, branch, blood, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'Failed',
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user object
    const userData = {
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      blood
    };

    // Add batch and branch for students
    if (role === 'student') {
      userData.batch = batch;
      userData.branch = branch;
    }

    const newUser = await User.create(userData);

    res.status(201).json({
      status: 'Success',
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully`,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      error: error.message
    });
  }
};

exports.adminUsers = async (req, res) => {
  try {
    const query = req.query;
    let filter = {
      role: 'student',
    };

    if (query.branch !== undefined && query.branch !== '') {
      filter.branch = query.branch;
    }

    // if (query.description !== undefined && query.description !== '') {
    //   filter.role = query.description;
    // }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await User.find(filter).select('-password');
    res.render('adminUsers', { 
      users, 
      filters: {
        role: query.role || '',
        branch: query.branch || '',
        email: query.email || ''
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.adminEditGet = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id).select('-password');
  console.log(user);
  res.render('userEdit', { user });
};

exports.adminEditPut = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          branch: req.body.branch,
          batch: req.body.batch,
          role: req.body.role,
          blood: req.body.blood,
        },
      },
      { new: true, runValidators: true }
    );
    user.save();
    res.status(200).json({
      status: 'Success',
      message: 'Updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findByIdAndDelete(id);
    res.status(200).redirect('/admin/users');
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: 'Try again',
    });
  }
};

exports.adminFacultyGet = async (req, res) => {
  try {
    const query = req.query;
    let filter = {
      role: 'faculty',
    };

    // if (query.branch !== undefined && query.branch !== '') {
    //   filter.branch = query.branch;
    // }

    // if (query.description !== undefined && query.description !== '') {
    //   filter.role = query.description;
    // }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await User.find(filter).select('-password');
    res.render('adminFaculty', { users });
  } catch (error) {
    console.log(error);
  }
};
exports.adminFacultyEditGet = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id).select('-password');
  console.log(user);
  res.render('facultyEdit', { user });
};

// exports.adminPulse = async (req, res) => {
//   const users = await Pulse.find();
//   res.render('adminPulse', { users });
// };

exports.adminPulse = async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    // if (query.branch !== undefined && query.branch !== '') {
    //   filter.branch = query.branch;
    // }

    if (query.wing !== undefined && query.wing !== '') {
      filter.wing = query.wing;
    }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await Pulse.find(filter);
    res.render('adminPulse', { users });
  } catch (error) {
    console.log(error);
  }
};

exports.adminBlood = async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    // if (query.branch !== undefined && query.branch !== '') {
    //   filter.branch = query.branch;
    // }

    if (query.blood !== undefined && query.blood !== '') {
      filter.blood = query.blood;
    }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await User.find(filter);
    res.render('adminBlood', { users });
  } catch (error) {
    console.log(error);
  }
};

// Admin - View all event registrations
exports.adminEventRegistrations = async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    // Filter by event if specified
    if (query.event && query.event !== '') {
      filter.event = query.event;
    }

    // Filter by status if specified
    if (query.status && query.status !== '') {
      filter.status = query.status;
    }

    const registrations = await EventRegistration.find(filter)
      .populate('event', 'title date venue category')
      .populate('user', 'name email phone batch branch')
      .sort({ registrationDate: -1 });

    // Get all events for filter dropdown
    const events = await Event.find().select('title _id').sort('title');

    res.render('adminEventRegistrations', { 
      registrations, 
      events,
      query: req.query 
    });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { 
      message: 'Error fetching event registrations',
      error: error 
    });
  }
};

// Admin - View detailed user information
exports.adminUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).render('error', { 
        message: 'User not found',
        error: { status: 404 }
      });
    }

    // Get user's event registrations
    const registrations = await EventRegistration.find({ user: userId })
      .populate('event', 'title date venue category')
      .sort({ registrationDate: -1 });

    // Get user's pulse registration if exists
    const pulseRegistration = await Pulse.findOne({ email: user.email });

    res.render('adminUserDetails', { 
      user, 
      registrations, 
      pulseRegistration 
    });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { 
      message: 'Error fetching user details',
      error: error 
    });
  }
};

// Admin - Update registration status
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const registrationId = req.params.id;
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
      message: 'Registration status updated successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Failed',
      error: 'Failed to update registration status'
    });
  }
};

exports.adminLogout = (req, res) => {
  if (req.session.user) {
    req.session.user = undefined;
  } else {
    req.session.user = undefined;
  }
  res.cookie('jwt', '');
  res.redirect('/');
};

// Event Management Functions
exports.adminEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.render('adminEvents', { events });
  } catch (error) {
    console.log('Admin events error:', error);
    res.status(500).render('error', { message: 'Error loading events' });
  }
};

exports.createEventForm = (req, res) => {
  res.render('adminCreateEvent');
};

exports.createEvent = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const {
      title,
      description,
      date,
      time,
      venue,
      category,
      capacity,
      registrationDeadline,
      entryFee,
      requirements,
      prizes,
      coordinators
    } = req.body;

    // Validate required fields
    if (!title || !description || !date || !time || !venue) {
      const error = 'Missing required fields: title, description, date, time, venue';
      console.log('Validation error:', error);
      
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ status: 'Error', error });
      }
      return res.status(400).render('adminCreateEvent', { error });
    }

    // Parse coordinators if it's a string
    let parsedCoordinators = coordinators;
    if (typeof coordinators === 'string') {
      try {
        parsedCoordinators = JSON.parse(coordinators);
      } catch (error) {
        parsedCoordinators = [{ name: coordinators, email: '', phone: '' }];
      }
    }

    console.log('Parsed event data:', {
      title,
      description,
      date: new Date(date),
      time,
      venue,
      category,
      capacity: parseInt(capacity) || 100,
      registrationDeadline: new Date(registrationDeadline),
      entryFee: parseFloat(entryFee) || 0
    });

    const newEvent = new Event({
      title,
      description,
      date: new Date(date),
      time,
      venue,
      category,
      capacity: parseInt(capacity) || 100,
      registrationDeadline: new Date(registrationDeadline),
      entryFee: parseFloat(entryFee) || 0,
      requirements,
      prizes,
      coordinators: parsedCoordinators || [],
      isActive: true,
      status: 'upcoming',
      createdBy: req.user._id
    });

    await newEvent.save();
    console.log('Event created successfully:', newEvent);
    
    // Send JSON response for AJAX requests
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ status: 'Success', message: 'Event created successfully' });
    }
    
    // Redirect for regular form submissions
    res.redirect('/admin/events?success=Event created successfully');
  } catch (error) {
    console.log('Create event error:', error);
    
    // Send JSON error response for AJAX requests
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(500).json({ status: 'Error', error: 'Error creating event', details: error.message });
    }
    
    res.status(500).render('adminCreateEvent', { error: 'Error creating event' });
  }
};

exports.editEventForm = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).render('error', { message: 'Event not found' });
    }
    res.render('adminEditEvent', { event });
  } catch (error) {
    console.log('Edit event form error:', error);
    res.status(500).render('error', { message: 'Error loading event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = { ...req.body };
    
    // Parse dates
    if (updateData.date) updateData.date = new Date(updateData.date);
    if (updateData.registrationDeadline) updateData.registrationDeadline = new Date(updateData.registrationDeadline);
    
    // Parse numbers
    if (updateData.capacity) updateData.capacity = parseInt(updateData.capacity);
    if (updateData.entryFee) updateData.entryFee = parseFloat(updateData.entryFee);

    // Parse coordinators if it's a string
    if (updateData.coordinators && typeof updateData.coordinators === 'string') {
      try {
        updateData.coordinators = JSON.parse(updateData.coordinators);
      } catch (error) {
        updateData.coordinators = [{ name: updateData.coordinators, email: '', phone: '' }];
      }
    }

    await Event.findByIdAndUpdate(eventId, updateData);
    res.redirect('/admin/events?success=Event updated successfully');
  } catch (error) {
    console.log('Update event error:', error);
    res.status(500).render('error', { message: 'Error updating event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.redirect('/admin/events?success=Event deleted successfully');
  } catch (error) {
    console.log('Delete event error:', error);
    res.status(500).json({ error: 'Error deleting event' });
  }
};

// Send bulk emails to event participants
exports.sendEventEmails = async (req, res) => {
  try {
    const { eventId, emailType } = req.body;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Get all registrations for this event
    const registrations = await EventRegistration.find({ 
      event: eventId,
      status: { $ne: 'Cancelled' }
    }).populate('user');

    if (registrations.length === 0) {
      return res.status(400).json({ error: 'No registered participants found' });
    }

    let emailsSent = 0;
    let emailsFailed = 0;

    // Send emails to all participants
    for (const registration of registrations) {
      try {
        if (emailType === 'reminder') {
          await sendEventReminderEmail(registration.user, event);
        } else {
          await sendEventRegistrationEmail(registration.user, event, registration);
        }
        emailsSent++;
      } catch (emailError) {
        console.error(`Failed to send email to ${registration.user.email}:`, emailError);
        emailsFailed++;
      }
    }

    res.json({
      success: true,
      message: `Emails sent successfully to ${emailsSent} participants. ${emailsFailed > 0 ? `Failed to send ${emailsFailed} emails.` : ''}`,
      emailsSent,
      emailsFailed
    });

  } catch (error) {
    console.error('Bulk email error:', error);
    res.status(500).json({ error: 'Error sending emails' });
  }
};

// Send event reminder emails (can be used with cron jobs)
exports.sendEventReminders = async (req, res) => {
  try {
    // Find events happening tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const upcomingEvents = await Event.find({
      date: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow
      },
      isActive: true
    });

    let totalEmailsSent = 0;

    for (const event of upcomingEvents) {
      const registrations = await EventRegistration.find({
        event: event._id,
        status: { $ne: 'Cancelled' }
      }).populate('user');

      for (const registration of registrations) {
        try {
          await sendEventReminderEmail(registration.user, event);
          totalEmailsSent++;
        } catch (emailError) {
          console.error(`Failed to send reminder to ${registration.user.email}:`, emailError);
        }
      }
    }

    res.json({
      success: true,
      message: `Sent ${totalEmailsSent} reminder emails for ${upcomingEvents.length} upcoming events`,
      eventsProcessed: upcomingEvents.length,
      emailsSent: totalEmailsSent
    });

  } catch (error) {
    console.error('Event reminder error:', error);
    res.status(500).json({ error: 'Error sending event reminders' });
  }
};
