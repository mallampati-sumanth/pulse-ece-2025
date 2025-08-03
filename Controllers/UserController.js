const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const sendMailer = require('./../utils/nodeMailer');
const send_mail = require('./../utils/OAuthMailer');
const crypto = require('crypto');
const generateToken = id => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
};
exports.signupPost = async (req, res) => {
  try {
    const { name, email, phone, password, batch, branch, blood, rollNumber } = req.body;
    const emailLower = email.toLowerCase();
    
    // Check if user already exists
    const exist = await User.findOne({ email: emailLower });
    if (exist) {
      return res.status(400).json({
        status: 'Failed',
        error: 'User with this email already exists',
      });
    }
    
    // Create new user
    const user = await User.create({
      name,
      phone,
      password,
      email: emailLower,
      batch,
      branch,
      blood,
      rollNumber,
    });

    // Send welcome email (commented out for now)
    // const options = {
    //   to: email,
    //   subject: 'Welcome to Pulse ECE',
    //   text: `Dear ${name},\n\nYour account has been created successfully.\nPlease login with your credentials at: https://${req.headers.host}/auth\n\nThanks and Regards\nTeam Pulse ECE`,
    // };
    // await sendMailer(options);

    res.status(201).json({
      status: 'Success',
      message: 'Account created successfully. Please sign in.',
    });
  } catch (error) {
    console.log(error);
    
    let errorMessage = 'Registration failed. Please try again.';
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        errorMessage = 'This email is already registered.';
      } else if (error.keyPattern?.rollNumber) {
        errorMessage = 'This roll number is already registered.';
      }
    } else if (error.name === 'ValidationError') {
      // Get the first validation error
      const firstError = Object.values(error.errors)[0];
      errorMessage = firstError.message;
    }
    
    res.status(400).json({
      status: 'Failed',
      error: errorMessage,
    });
  }
};

exports.logout = (req, res) => {
  if (req.session.user) {
    req.session.user = undefined;
  } else {
    req.session.user = undefined;
  }
  res.cookie('jwt', '');
  res.redirect('/');
};

exports.signinPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.signin(email, password);
    
    if (!user) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Invalid email or password',
      });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    res.cookie('jwt', token, { 
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    // Set session
    req.session.user = user;
    
    res.status(200).json({ 
      status: 'Success',
      message: 'Login successful',
      user: {
        role: user.role,
        name: user.name,
        email: user.email,
        _id: user._id
      }
    });
  } catch (error) {
    console.log('Signin error:', error);
    res.status(400).json({
      status: 'Failed',
      error: 'Invalid email or password',
    });
  }
};
exports.forgotpasswordPost = async (req, res) => {
  try {
    const { email } = req.body;
    // creating token
    const token = await crypto.randomBytes(32).toString('hex');
    // Hashing the token
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'Failed',
        error: 'No user is exist',
      });
    }
    user.passwordResetToken = hashToken;
    user.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const options = {
      to: email,
      subject: 'Password reset token',
      text: `Dear User,\n\nA password reset for your account was requested.\nPlease click the link below to change your password.\nNote that this link is valid for 10 minutes. After the time limit has expired, you will have to resubmit the request for a password reset.\n ${req.protocol}://${req.headers.host}/resetpassword/${token}`,
    };
    try {
      await sendMailer(options);
    } catch (error) {
      console.log(error);
      user.passwordResetToken = undefined;
      user.passwordResetToken = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(400).json({
        status: 'Failed',
        error: 'Try again',
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'Reset password link sent',
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetToken = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(400).json({
      status: 'Failed',
      error: 'Try again',
    });
  }
};
//PasswordRESET

exports.resetPasswordPost = async (req, res) => {
  try {
    const token = req.params.token;
    const { password, reenter } = req.body;
    if (password !== reenter) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Please enter both fields same',
      });
    }
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashToken,
      passwordResetTokenExpiresIn: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Reset token has been expired',
      });
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;
    await user.save();
    res.status(200).json({
      status: 'Success',
      message: 'Updated successfullly',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      error: 'Try again',
    });
  }
};
