import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'home-cleaning',
      'appliance-service',
      'home-repair',
      'home-painting',
      'men-salon',
      'women-salon',
      'spa-women',
      'massage-men',
      'smart-home',
      'ro-purifier',
      'wall-panel'
    ]
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;