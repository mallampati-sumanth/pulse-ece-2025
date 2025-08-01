const express = require('express');
const pageRouter = express.Router();
const pageController = require('./../Controllers/pageController');
const userController = require('./../Controllers/UserController');
const middlewares = require('./../middlewares/isAuthenticated');
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
pageRouter
  .route('/signin')
  .get(middlewares.authorized, pageController.siginGet);
pageRouter
  .route('/signup')
  .get(middlewares.authorized, pageController.sigupGet);
pageRouter.route('/team').get(pageController.team);
pageRouter
  .route('/blood')
  .get(pageController.bloodGet)
  .post(pageController.bloodPost);
pageRouter.route('/aboutus').get(pageController.aboutus);
pageRouter.route('/events').get(pageController.events);
pageRouter
  .route('/joinpulse')
  .get(pageController.joinPulseGet)
  .post(pageController.joinPulsePost);
pageRouter.route('/').get(pageController.index);
pageRouter.route('/gallery').get(pageController.gallery);
pageRouter
  .route('/contactus')
  .get(pageController.contactusGet)
  .post(pageController.contactusPost);
pageRouter
  .route('/profile')
  .get(middlewares.authenticate, pageController.profileGet)
  .post(upload.single('image'), pageController.profilePost);
pageRouter.route('/club').get(pageController.club);
pageRouter
  .route('/forgotpassword')
  .get(middlewares.authorized, pageController.forgotpasswordGet)
  .post(userController.forgotpasswordPost);
pageRouter
  .route('/resetpassword/:token')
  .get(pageController.resetPasswordGet)
  .post(userController.resetPasswordPost);
pageRouter
  .route('/sentmail')
  .get(middlewares.authorized, pageController.sentmail);

pageRouter
  .route('/contactus-form-submitted')
  .get(pageController.contactformSub);
module.exports = pageRouter;
