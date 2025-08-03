const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: [true, 'Registration must belong to an event'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Registration must belong to a user'],
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Registered', 'Attended', 'Cancelled', 'No Show'],
    default: 'Registered',
  },
  additionalInfo: {
    type: String,
    trim: true,
  },
  teamMembers: [{
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  }],
  isTeamEvent: {
    type: Boolean,
    default: false,
  },
});

// Compound index to prevent duplicate registrations
eventRegistrationSchema.index({ event: 1, user: 1 }, { unique: true });

// Index for better performance
eventRegistrationSchema.index({ registrationDate: -1 });
eventRegistrationSchema.index({ status: 1 });

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

module.exports = EventRegistration;
