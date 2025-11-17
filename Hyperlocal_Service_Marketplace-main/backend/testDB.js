import mongoose from 'mongoose';
import 'dotenv/config';

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected Successfully');
    console.log('Connection String:', process.env.MONGODB_URI);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
  }
};

testConnection();