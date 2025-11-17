import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  updatePaymentStatus,
  cancelBooking
} from '../controllers/bookingController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

router.post('/', createBooking);
router.get('/user', getUserBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);
router.put('/:id/payment', updatePaymentStatus);
router.put('/:id/cancel', cancelBooking);

export default router;