import express from 'express';
import { isAdmin, auth } from '../middleware/auth.js';
import {
  getAllBookings,
  acceptBooking,
  markWorkCompleted,
  cancelBooking,
  getBookingStats
} from '../controllers/adminController.js';

const router = express.Router();

// Protect all routes with auth and isAdmin middleware
router.use(auth, isAdmin);

// Booking management routes
router.get('/bookings', getAllBookings);
router.put('/bookings/:bookingId/accept', acceptBooking);
router.put('/bookings/:bookingId/complete', markWorkCompleted);
router.put('/bookings/:bookingId/cancel', cancelBooking);
router.get('/bookings/stats', getBookingStats);

export default router;