const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/eventController');
const { authenticate, restrictTo } = require('../middlewares/isAuthenticated');

// Public routes
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventDetails);

// User routes (require authentication)
router.post('/events/register', authenticate, eventController.registerForEvent);
router.put('/events/:eventId/cancel', authenticate, eventController.cancelRegistration);
router.get('/my-events', authenticate, eventController.getUserEvents);

// Admin routes (require admin role)
router.get('/admin/events', authenticate, restrictTo('admin'), eventController.adminGetAllEvents);
router.get('/admin/events/create', authenticate, restrictTo('admin'), eventController.adminCreateEventForm);
router.post('/admin/events', authenticate, restrictTo('admin'), eventController.adminCreateEvent);
router.put('/admin/events/:id', authenticate, restrictTo('admin'), eventController.adminUpdateEvent);
router.delete('/admin/events/:id', authenticate, restrictTo('admin'), eventController.adminDeleteEvent);
router.get('/admin/events/:eventId/registrations', authenticate, restrictTo('admin'), eventController.adminGetEventRegistrations);
router.put('/admin/registrations/:registrationId/status', authenticate, restrictTo('admin'), eventController.adminUpdateRegistrationStatus);

module.exports = router;
