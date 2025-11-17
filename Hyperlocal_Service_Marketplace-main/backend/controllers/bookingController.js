import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import { getIo } from '../utils/socket.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user._id,
      status: 'requested',
      paymentStatus: 'pending'
    });
    const newBooking = await booking.save();
    await newBooking.populate('service');
    // Emit real-time event to admin room or specific user
    try {
      const io = getIo();
      if (io) {
        io.to(`user_${req.user._id}`).emit('booking:update', { booking: newBooking });
        io.to('admins').emit('booking:new', { booking: newBooking });
      }
    } catch (emitErr) {
      console.error('Socket emit error (createBooking):', emitErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Booking request created successfully',
      booking: newBooking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service')
      .populate('user', 'name email phone');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the user is authorized to view this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Validate status transitions
    const validTransitions = {
      'requested': ['accepted', 'cancelled'],
      'accepted': ['work_completed', 'cancelled'],
      'work_completed': ['payment_completed'],
      'payment_completed': [],
      'cancelled': []
    };

    if (!validTransitions[booking.status].includes(status)) {
      return res.status(400).json({ 
        message: `Cannot transition from ${booking.status} to ${status}` 
      });
    }

    booking.status = status;
    if (notes) {
      booking.workCompletionNotes = notes;
    }

    const updatedBooking = await booking.save();
    await updatedBooking.populate('service');
    // notify user about status update
    try {
      const io = getIo();
      if (io) {
        io.to(`user_${booking.user.toString()}`).emit('booking:update', { booking: updatedBooking });
        io.to('admins').emit('booking:updated', { booking: updatedBooking });
      }
    } catch (emitErr) {
      console.error('Socket emit error (updateBookingStatus):', emitErr.message);
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      booking: updatedBooking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentId } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = paymentStatus;
    booking.paymentId = paymentId;
    const updatedBooking = await booking.save();
    await updatedBooking.populate('service');
    // emit update so user/admin get real-time notification
    try {
      const io = getIo();
      if (io) {
        io.to(`user_${booking.user.toString()}`).emit('booking:update', { booking: updatedBooking });
        io.to('admins').emit('booking:updated', { booking: updatedBooking });
      }
    } catch (emitErr) {
      console.error('Socket emit error (updatePaymentStatus):', emitErr.message);
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed booking' });
    }

    booking.status = 'cancelled';
    const updatedBooking = await booking.save();
    await updatedBooking.populate('service');
    
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};