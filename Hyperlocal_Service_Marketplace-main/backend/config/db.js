import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
    mongoose.connection.on("disconnected", () => console.log("Database Disconnected"));
    // Build connect options. You can set MONGODB_TLS_ALLOW_INVALID=true in your .env
    // to temporarily allow invalid TLS certs for debugging (NOT for production).
    const connectOptions = {
      // Modern connection tuning
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2
    };

    if (process.env.MONGODB_TLS_ALLOW_INVALID === 'true') {
      // WARNING: This disables certificate validation and should only be used for debugging.
      connectOptions.tls = true;
      connectOptions.tlsAllowInvalidCertificates = true;
      connectOptions.tlsAllowInvalidHostnames = true;
      console.warn('⚠️  MONGODB_TLS_ALLOW_INVALID is enabled — certificate validation is disabled for debugging');
    }

    await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Stack:", error.stack);
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

export default connectDB;
