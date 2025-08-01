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

exports.facultyPage = (req, res) => {
  res.render('facultyIndex');
};
exports.signupGet = (req, res) => {
  res.render('facultySignup');
};
exports.signupPost = async (req, res) => {
  try {
    const { name, email, phone, password, blood } = req.body;
    const emailLower = email.toLowerCase();
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        status: 'Failed',
        error: 'User already exists ',
      });
    }
    const user = await User.create({
      name,
      phone,
      password,
      email: emailLower,
      blood,
      role: 'faculty',
    });

    // const options = {
    //   to: email,
    //   subject: 'User Created Successfully',
    //   text: `Dear ${name},\n\nYour Login Id Is Created Successfully.\nPlease Login To Check Your profile  With your Credential\n\n https://${req.headers.host}/signin\n\n\n\n Thanks And Regards\nTeam pulse.`,
    // };

    // await sendMailer(options);
    console.log(user);
    res.status(201).json({
      status: 'Success',
      message: 'Account created ',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      error: 'User already exist',
    });
  }
};

exports.signinGet = (req, res) => {
  res.render('facultySignin');
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
    const emailLower = email.toLowerCase();
    console.log(email, password);
    const user = await User.signin(emailLower, password);
    if (!user) {
      console.log('no user');
      return res.status(400).json({
        status: 'Failed',
        error: 'Invalid Email or Password',
      });
    }
    const token = generateToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    if (!req.session.user) {
      req.session.user = user;
    } else {
      req.session.user = user;
    }
    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      message: ' Invalid Email or Password',
    });
  }
};

exports.blood = async (req, res) => {
  const users = await User.find();
  res.render('facultyBlood', { users });
};

exports.bloodPost = async (req, res) => {
  try {
    const { bloodGrp } = req.body;
    if (!bloodGrp) {
      const users = await User.find().select('-password');
      return res.status(200).json({
        status: 'Success',
        users,
      });
    }
    const users = await User.find({ blood: bloodGrp }).select('-password');
    res.status(200).json({
      status: 'Success',
      users,
    });
  } catch (error) {
    console.error('Error fetching users by blood group:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.culds = (req, res) => {
  res.render('facultyClubs');
};

exports.events = (req, res) => {
  res.render('facultyEvents');
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

// exports.facultyProfile = (req, res) => {
//   res.render('facultyProfile');
// };

exports.facultyProfile = async (req, res) => {
  const email = req.session.user.email;
  const user = await User.findOne({ email }).select('-password');
  res.render('facultyProfile', { user });
};
exports.facultyProfilePost = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).redirect('/faculty/profile');
    }
    if (!file) {
      const email = req.session.user.email;
      const userupdate = await User.updateOne(
        { email },
        { name, phone },
        { runValidators: true, new: true }
      );
      if (!userupdate) {
        return res.status(400).redirect('/faculty/profile');
      }
      return res.status(400).redirect('/faculty/profile');
    }
    const email = req.session.user.email;
    const img = file.path.replace('public', '');
    const userupdate = await User.updateOne(
      { email },
      { name, phone, img },
      { runValidators: true, new: true }
    );
    if (!userupdate) {
      return res.status(400).redirect('/faculty/profile');
    }
    const user = await User.findOne({ email }).select('-password');
    console.log(user);
    if (!req.session.user) {
      req.session.user = user;
    } else {
      req.session.user = user;
    }
    res.redirect('/faculty/profile');
  } catch (error) {
    console.log(error);
    return res.status(400).redirect('/faculty/profile');
  }
};
