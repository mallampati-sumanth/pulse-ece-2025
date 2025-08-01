const express = require('express');
const adminRouter = express.Router();
const adminController = require('./../Controllers/adminController');
const userController = require('./../Controllers/UserController');
const authMiddlewares = require('./../middlewares/isAuthenticated');
adminRouter
  .route('/admin')
  .get(
    authMiddlewares.authenticate,
    authMiddlewares.restrictTo('admin'),
    adminController.admin
  );
adminRouter
  .route('/admin/users')
  .get(authMiddlewares.authenticate, adminController.adminUsers);
adminRouter
  .route('/admin/faculty')
  .get(authMiddlewares.authenticate, adminController.adminFacultyGet);
adminRouter
  .route('/admin/faculty/edit/:id')
  .get(authMiddlewares.authenticate, adminController.adminFacultyEditGet)
  .put(authMiddlewares.authenticate, adminController.adminEditPut);

adminRouter
  .route('/admin/faculty/delete/:id')
  .delete(authMiddlewares.authenticate, adminController.deleteUser);
adminRouter
  .route('/admin/user/edit/:id')
  .get(authMiddlewares.authenticate, adminController.adminEditGet)
  .put(authMiddlewares.authenticate, adminController.adminEditPut);

adminRouter
  .route('/admin/user/delete/:id')
  .delete(authMiddlewares.authenticate, adminController.deleteUser);
adminRouter
  .route('/admin/pulseregistered')
  .get(authMiddlewares.authenticate, adminController.adminPulse);
adminRouter
  .route('/admin/blood')
  .get(authMiddlewares.authenticate, adminController.adminBlood);
adminRouter.route('/admin/logout').get(adminController.adminLogout);
module.exports = adminRouter;
