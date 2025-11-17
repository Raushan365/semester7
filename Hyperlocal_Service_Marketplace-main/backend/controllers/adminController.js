import Booking from '../models/Booking.js';
import User from '../models/User.js';
import { getIo } from '../utils/socket.js';

// Get all bookings for admin
export const getAllBookings = async (req, res) => {
  try {
    console.log('Admin getAllBookings called by user:', req.user?._id, 'isAdmin:', req.user?.isAdmin);
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'title price duration category')
      .sort({ createdAt: -1 });

    console.log('Found bookings:', bookings.length);
    res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Accept booking request
export const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { adminNotes } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'requested') {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be accepted in its current status'
      });
    }

    booking.status = 'accepted';
    booking.adminNotes = adminNotes;
    await booking.save();

    // emit socket events
    try {
      const io = getIo();
      if (io) {
        io.to(`user_${booking.user.toString()}`).emit('booking:update', { booking });
        io.to('admins').emit('booking:accepted', { booking });
      }
    } catch (err) {
      console.error('Socket emit error (acceptBooking):', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'Booking accepted successfully',
      booking
    });
  } catch (error) {
    console.error('Accept booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error accepting booking'
    });
  }
};

// Mark work as completed
export const markWorkCompleted = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { workCompletionNotes, workCompletionImages } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Work can only be marked as completed for accepted bookings'
      });
    }

    booking.status = 'work_completed';
    booking.workCompletionNotes = workCompletionNotes;
    booking.workCompletionImages = workCompletionImages;
    await booking.save();

    // emit socket events for completion
    try {
      const io = getIo();
      if (io) {
        io.to(`user_${booking.user.toString()}`).emit('booking:update', { booking });
        io.to('admins').emit('booking:completed', { booking });
      }
    } catch (err) {
      console.error('Socket emit error (markWorkCompleted):', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'Work marked as completed successfully',
      booking
    });
  } catch (error) {
    console.error('Mark work completed error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking work as completed'
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { cancelReason } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (!['requested', 'accepted'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled in its current status'
      });
    }

    booking.status = 'cancelled';
    booking.adminNotes = cancelReason;
    await booking.save();

    // emit socket events for cancellation
    try {
      const io = getIo();
      if (io) {
        io.to(`user_${booking.user.toString()}`).emit('booking:update', { booking });
        io.to('admins').emit('booking:cancelled', { booking });
      }
    } catch (err) {
      console.error('Socket emit error (cancelBooking):', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking'
    });
  }
};

// Get booking statistics
export const getBookingStats = async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking statistics'
    });
  }
};