const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const pulseSchma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User must have name'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please enter valid Email address'],
  },
  id: {
    type: Number,
    required: true,
    trim: true,
    min: [10, 'Id must have 10 numbers'],
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    min: [10, 'mobile number must have 10 numbers'],
  },
  batch: {
    type: String,
    required: true,
  },
  wing: {
    type: String,
    required: true,
  },
});

const Pulse = mongoose.model('Pulse', pulseSchma);

module.exports = Pulse;
