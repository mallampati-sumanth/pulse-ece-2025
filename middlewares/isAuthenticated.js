const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

exports.authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decode) => {
      if (err) {
        return res.redirect('/signin');
      }
      try {
        const user = await User.findById(decode.id);
        if (!user) {
          return res.redirect('/signin');
        }
        req.user = user;
        next();
      } catch (error) {
        return res.redirect('/signin');
      }
    });
  } else {
    return res.redirect('/signin');
  }
};

exports.authorized = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decode) => {
        if (err) {
          return next();
        }
        try {
          const user = await User.findById(decode.id);
          if (user && user.role === 'admin') {
            return res.redirect('/admin');
          } else if (user) {
            return res.redirect('/profile');
          } else {
            return next();
          }
        } catch (error) {
          return next();
        }
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.session.user || !roles.includes(req.session.user.role)) {
      return res.redirect('/');
    }
    next();
  };
};
