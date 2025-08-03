const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event must have a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Event must have a description'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Event must have a date'],
  },
  time: {
    type: String,
    required: [true, 'Event must have a time'],
  },
  venue: {
    type: String,
    required: [true, 'Event must have a venue'],
    trim: true,
  },
  capacity: {
    type: Number,
    default: 100,
    min: [1, 'Capacity must be at least 1'],
  },
  category: {
    type: String,
    enum: ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Competition', 'Other'],
    default: 'Other',
  },
  image: {
    type: String,
    default: 'default-event.jpg',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'Event must have registration deadline'],
  },
  entryFee: {
    type: Number,
    default: 0,
    min: [0, 'Entry fee cannot be negative'],
  },
  requirements: {
    type: String,
    default: 'No specific requirements',
    trim: true,
  },
  prizes: {
    type: String,
    default: 'To be announced',
    trim: true,
  },
  coordinators: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    }
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual field to check if registration is open
eventSchema.virtual('isRegistrationOpen').get(function() {
  const now = new Date();
  // Registration is open if the event is active and registration deadline hasn't passed
  return this.isActive && this.registrationDeadline > now;
});

// Ensure virtual fields are serialized
eventSchema.set('toJSON', { virtuals: true });

// Index for better performance
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isActive: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
