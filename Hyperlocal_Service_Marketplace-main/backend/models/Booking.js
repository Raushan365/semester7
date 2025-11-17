import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'work_completed', 'payment_pending', 'payment_completed', 'cancelled'],
    default: 'requested'
  },
  adminNotes: {
    type: String
  },
  workCompletionNotes: {
    type: String
  },
  workCompletionImages: [{
    type: String
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  specialInstructions: {
    type: String
  }
}, {
  timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;