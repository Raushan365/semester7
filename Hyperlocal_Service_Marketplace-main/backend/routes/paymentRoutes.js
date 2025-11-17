import express from 'express';
import { createPaymentIntent, createCheckoutSession, webhookHandler } from '../controllers/paymentController.js';
import { auth } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import { getIo } from '../utils/socket.js';

const router = express.Router();

// Create Stripe checkout session
router.post('/create-session', auth, createCheckoutSession);

// Create payment intent (for custom payment flow)
router.post('/create-payment-intent', auth, createPaymentIntent);

// Stripe webhook (raw body middleware applied at server level)
router.post('/webhook', webhookHandler);

// TEST ENDPOINT: Manually complete payment (remove in production!)
router.post('/test-complete/:bookingId', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate('service');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Update booking status
    booking.paymentStatus = 'completed';
    booking.status = 'payment_completed';
    booking.paymentId = 'test_payment_' + Date.now();
    await booking.save();
    
    // Emit socket events
    try {
      const io = getIo();
      if (io) {
        io.to(`user_${booking.user.toString()}`).emit('booking:update', { booking });
        io.to('admins').emit('booking:payment_completed', { booking });
      }
    } catch (emitErr) {
      console.error('Socket emit error:', emitErr.message);
    }
    
    res.json({ success: true, message: 'Payment marked as completed', booking });
  } catch (error) {
    console.error('Test complete error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;