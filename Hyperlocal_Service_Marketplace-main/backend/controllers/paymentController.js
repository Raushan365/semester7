import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import { getIo } from '../utils/socket.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    console.log('Create payment session request:', { bookingId, amount, userId: req.user?._id, userEmail: req.user?.email });

    if (!bookingId || !amount) {
      return res.status(400).json({ error: 'Missing bookingId or amount' });
    }

    // Fetch booking details
    const booking = await Booking.findById(bookingId)
      .populate('service');

    if (!booking) {
      console.error('Booking not found:', bookingId);
      return res.status(404).json({ error: 'Booking not found' });
    }

    console.log('Booking found:', { 
      bookingId, 
      status: booking.status, 
      service: booking.service?.title,
      bookingUserId: booking.user.toString(),
      requestUserId: req.user._id.toString()
    });

    // Check if booking belongs to the requesting user
    if (booking.user.toString() !== req.user._id.toString()) {
      console.error('User mismatch:', { bookingUser: booking.user.toString(), requestUser: req.user._id.toString() });
      return res.status(403).json({ error: 'Not authorized to pay for this booking' });
    }

    // Check if booking is in correct status
    if (booking.status !== 'work_completed') {
      return res.status(400).json({ error: `Booking must be in work_completed status to pay. Current status: ${booking.status}` });
    }

    // Check if Stripe key is configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key_here') {
      console.error('Stripe not configured properly');
      return res.status(500).json({ 
        error: 'Payment system not configured', 
        message: 'Stripe API key is missing or invalid. Please contact administrator.' 
      });
    }

    // Create line items for Stripe
    const lineItems = [{
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Service Booking',
          description: `Booking for ${booking.service?.title || 'service'}`,
        },
        unit_amount: Math.round(amount * 100), // Convert to smallest currency unit (paise) and ensure integer
      },
      quantity: 1,
    }];

    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';

    console.log('Creating Stripe session with:', { amount, frontendUrl, customerEmail: req.user.email });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/payment/success?booking=${bookingId}`,
      cancel_url: `${frontendUrl}/payment/cancel?booking=${bookingId}`,
      customer_email: req.user.email,
      client_reference_id: bookingId,
      metadata: {
        bookingId: bookingId,
        userId: req.user._id.toString()
      }
    });

    console.log('Stripe session created successfully:', session.id);
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout Session Error:', error);
    console.error('Error details:', { 
      message: error.message, 
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    });
    res.status(500).json({ 
      error: 'Failed to create checkout session', 
      message: error.message,
      details: error.type || 'Unknown error'
    });
  }
};

// Create payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit (cents)
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

// Payment webhook handler
export const webhookHandler = async (req, res) => {
  console.log('🔔 Webhook received!');
  console.log('Headers:', req.headers);
  console.log('Has body:', !!req.body);
  console.log('Body type:', typeof req.body);
  console.log('Body is Buffer:', Buffer.isBuffer(req.body));
  
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // express.raw() stores raw body in req.body as a Buffer
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Webhook signature verified!');
    console.log('Event type:', event.type);
  } catch (err) {
    console.error('❌ Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Update booking status and add payment details
      try {
        const booking = await Booking.findById(session.metadata.bookingId).populate('service');
        if (booking) {
          // Align with Booking model enums: set paymentStatus -> 'completed' and status -> 'payment_completed'
          booking.paymentStatus = 'completed';
          booking.paymentId = session.payment_intent || session.payment_intent;
          booking.status = 'payment_completed';
          await booking.save();

          // Emit socket events so frontends update in real time
          try {
            const io = getIo();
            if (io) {
              io.to(`user_${booking.user.toString()}`).emit('booking:update', { booking });
              io.to('admins').emit('booking:payment_completed', { booking });
            }
          } catch (emitErr) {
            console.error('Socket emit error (webhook payment completed):', emitErr.message);
          }
        }
        console.log('Payment succeeded:', session.payment_intent);
      } catch (err) {
        console.error('Error updating booking after payment:', err.message);
      }
      break;
      
    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      
      // Update booking status for failed/expired payment
      try {
        const expiredBooking = await Booking.findById(expiredSession.metadata.bookingId);
        if (expiredBooking) {
          expiredBooking.paymentStatus = 'failed';
          expiredBooking.status = 'cancelled';
          await expiredBooking.save();

          // notify via socket
          try {
            const io = getIo();
            if (io) {
              io.to(`user_${expiredBooking.user.toString()}`).emit('booking:update', { booking: expiredBooking });
              io.to('admins').emit('booking:payment_failed', { booking: expiredBooking });
            }
          } catch (emitErr) {
            console.error('Socket emit error (webhook payment expired):', emitErr.message);
          }
        }
        console.log('Payment session expired:', expiredSession.id);
      } catch (err) {
        console.error('Error handling expired session:', err.message);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};