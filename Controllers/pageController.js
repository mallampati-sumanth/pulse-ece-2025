const User = require('./../Models/userModel');
const sendmail = require('./../utils/nodeMailer');
const Pulse = require('./../Models/joinPulse');
const multer = require('multer');
const crypto = require('crypto');

exports.siginGet = (req, res) => {
  res.render('signin');
};
exports.sigupGet = (req, res) => {
  res.render('signup');
};
exports.team = (req, res) => {
  res.render('team');
};
exports.index = (req, res) => {
  res.render('index');
};
exports.bloodGet = async (req, res) => {
  const users = await User.find();
  res.render('blood', { users });
};

exports.uploadImg = (req, res) => {};

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
exports.aboutus = (req, res) => {
  res.render('about');
};
exports.joinPulseGet = (req, res) => {
  res.render('joinpulse');
};
exports.gallery = (req, res) => {
  res.render('gallery');
};
exports.contactusGet = (req, res) => {
  res.render('contactus');
};
exports.profileGet = async (req, res) => {
  const email = req.session.user.email;
  const user = await User.findOne({ email }).select('-password');
  res.render('profile', { user });
};
exports.club = (req, res) => {
  res.render('club');
};
exports.forgotpasswordGet = (req, res) => {
  res.render('forgotpassword');
};
exports.resetPasswordGet = async (req, res) => {
  const token = req.params.token;
  const hashToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({ passwordResetToken: hashToken });
  console.log(user);
  res.render('resetpassword', { token, user });
};
exports.sentmail = (req, res) => {
  res.render('mailsent');
};
exports.events = (req, res) => {
  res.render('events');
};

exports.contactusPost = async (req, res) => {
  try {
    const { name, email, number, message } = req.body;
    console.log(name, email, number, message);
    const options = {
      to: email,
      subject: `Contact Form Submission form ${name}`,
      text: `Dear Team,\n\n\n Contact Form Submission form received from \n Name : ${name}\n Email : ${email} \n Message : ${message} \n Mobile no : ${number} \n\n\nPlease respond promptly to the user's inquiry.`,
    };

    await sendmail(options);
    res.status(200).json({
      status: 'Success',
      message: 'Form submited successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      error: 'Please try again',
    });
  }
};

exports.contactformSub = (req, res) => {
  res.render('contactussubmission');
};

exports.joinPulsePost = async (req, res) => {
  try {
    const { name, email, id, phone, batch, wing } = req.body;
    if (!name || !email || !id || !phone || !batch || !wing) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Please enter all fields',
      });
    }
    const exists = await Pulse.findOne({ email });
    if (exists) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Already form submitted',
      });
    }
    const details = await Pulse.create({ name, email, id, phone, batch, wing });

    return res.status(400).json({
      status: 'Success',
      message: 'Form submitted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      error: 'Please enter all fields',
    });
  }
};
exports.profilePost = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);
    const { name, phone, batch, branch } = req.body;
    if (!name || !phone || !batch || !branch) {
      return res.status(400).redirect('/profile');
    }
    if (!file) {
      const email = req.session.user.email;
      const userupdate = await User.updateOne(
        { email },
        { name, phone, batch, branch },
        { runValidators: true, new: true }
      );
      if (!userupdate) {
        return res.status(400).redirect('/profile');
      }
      return res.status(400).redirect('/profile');
    }
    const email = req.session.user.email;
    const img = file.path.replace('public', '');
    const userupdate = await User.updateOne(
      { email },
      { name, phone, batch, branch, img },
      { runValidators: true, new: true }
    );
    if (!userupdate) {
      return res.status(400).redirect('/profile');
    }
    const user = await User.findOne({ email }).select('-password');
    console.log(user);
    if (!req.session.user) {
      req.session.user = user;
    } else {
      req.session.user = user;
    }
    res.redirect('/profile');
  } catch (error) {
    console.log(error);
    return res.status(400).redirect('/profile');
  }
};
