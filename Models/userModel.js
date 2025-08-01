const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Please enter valid Email address'],
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    min: [10, 'Mobile number must be  10 numbers'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  batch: {
    type: String,
    enum: ['y20', 'y21', 'y22', 'y23', 'Y20', 'Y21', 'Y22', 'Y23'],
  },
  branch: {
    type: String,
  },
  blood: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: 'student',
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiresIn: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified(this.password)) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.statics.signin = async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      return;
    }
  } else {
    return;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
