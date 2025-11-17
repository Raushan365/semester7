import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
  },
  { minimize: false }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;