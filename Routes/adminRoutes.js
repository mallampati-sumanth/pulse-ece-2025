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

// Routes for creating users
adminRouter
  .route('/admin/users/create/:type')
  .get(authMiddlewares.authenticate, adminController.createUserForm);

adminRouter
  .route('/admin/users/create')
  .post(authMiddlewares.authenticate, adminController.createUser);

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

// Event registrations routes
adminRouter
  .route('/admin/event-registrations')
  .get(authMiddlewares.authenticate, adminController.adminEventRegistrations);

adminRouter
  .route('/admin/registrations/:id/status')
  .put(authMiddlewares.authenticate, adminController.updateRegistrationStatus);

// Events management routes
adminRouter
  .route('/admin/events')
  .get(authMiddlewares.authenticate, adminController.adminEvents)
  .post(authMiddlewares.authenticate, adminController.createEvent);

adminRouter
  .route('/admin/events/create')
  .get(authMiddlewares.authenticate, adminController.createEventForm);

adminRouter
  .route('/admin/events/edit/:id')
  .get(authMiddlewares.authenticate, adminController.editEventForm)
  .put(authMiddlewares.authenticate, adminController.updateEvent);

adminRouter
  .route('/admin/events/delete/:id')
  .delete(authMiddlewares.authenticate, adminController.deleteEvent);

// Route to handle form POST requests for event deletion
adminRouter
  .route('/admin/events/:id/delete')
  .post(authMiddlewares.authenticate, adminController.deleteEvent);

// Email routes
adminRouter
  .route('/admin/events/send-emails')
  .post(authMiddlewares.authenticate, adminController.sendEventEmails);

adminRouter
  .route('/admin/events/send-reminders')
  .post(authMiddlewares.authenticate, adminController.sendEventReminders);

// User details route
adminRouter
  .route('/admin/user/:id')
  .get(authMiddlewares.authenticate, adminController.adminUserDetails);

adminRouter
  .route('/admin/pulseregistered')
  .get(authMiddlewares.authenticate, adminController.adminPulse);
adminRouter
  .route('/admin/blood')
  .get(authMiddlewares.authenticate, adminController.adminBlood);
adminRouter.route('/admin/logout').get(adminController.adminLogout);
module.exports = adminRouter;
