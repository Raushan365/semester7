import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const email = 'admin@gmail.com';
    const password = '123456';
    const name = 'Administrator';

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin user already exists. Updating to ensure isAdmin=true and password set.');
      user.isAdmin = true;
      user.name = name;
      // update password only if it's not matching the desired password
      const isMatch = await bcrypt.compare(password, user.password).catch(() => false);
      if (!isMatch) {
        user.password = await bcrypt.hash(password, 10);
      }
      await user.save();
      console.log('Admin user updated:', email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed, isAdmin: true });
    await user.save();
    console.log('Admin user created:', email);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
};

createAdmin();
