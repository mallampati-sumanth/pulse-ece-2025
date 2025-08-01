const express = require('express');
const facultyRouter = express.Router();
const adminController = require('./../Controllers/adminController');
const facultyController = require('./../Controllers/facultyController');
const pageController = require('./../Controllers/pageController');
const authMiddlewares = require('./../middlewares/isAuthenticated');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: './public/uploads/profiles',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const checkFile = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (extName) {
    cb(null, true);
  } else {
    cb('Error file type not accepted');
  }
};
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFile(file, cb);
  },
});
facultyRouter.route('/faculty').get(facultyController.facultyPage);
facultyRouter
  .route('/faculty/signup')
  .get(authMiddlewares.authorized, facultyController.signupGet)
  .post(facultyController.signupPost);

facultyRouter
  .route('/faculty/signin')
  .get(authMiddlewares.authorized, facultyController.signinGet)
  .post(facultyController.signinPost);

facultyRouter.route('/faculty/events').get(facultyController.events);
facultyRouter
  .route('/faculty/blood')
  .get(facultyController.blood)
  .post(facultyController.bloodPost);
facultyRouter.route('/faculty/clubs').get(facultyController.culds);

facultyRouter
  .route('/faculty/profile')
  .get(authMiddlewares.authenticate, facultyController.facultyProfile)
  .post(upload.single('image'), facultyController.facultyProfilePost);
facultyRouter.route('/faculty/logout').get(facultyController.logout);
module.exports = facultyRouter;
