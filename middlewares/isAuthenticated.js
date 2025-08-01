const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        return res.redirect('/signin');
      }
      next();
    });
  } else {
    return res.redirect('/signin');
  }
};

exports.authorized = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
          next();
        }
        return res.redirect('/profile');
      });
    }
    if (!token) {
      next();
    } else {
      return res.redirect('/profile');
    }
  } catch (error) {
    console.log(error);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.user.role)) {
      return res.redirect('/');
    }
    next();
  };
};
