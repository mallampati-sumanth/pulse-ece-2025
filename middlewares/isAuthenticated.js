const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        return res.redirect('/signin');
      }
      req.user = decode;
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
          return next();
        }
        return res.redirect('/profile');
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
