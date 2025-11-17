import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import serviceRouter from "./routes/serviceRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { initIo } from './utils/socket.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware configuration
app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposedHeaders: ['set-cookie'],
  })
);

// Register webhook route BEFORE express.json() to preserve raw body for signature verification
app.use("/api/payment/webhook", express.raw({ type: 'application/json' }), paymentRouter);

// Apply JSON parsing middleware for all other routes
app.use(express.urlencoded({ extended: true })); // for form-data
app.use(express.json());

(async () => {
  await connectDB();
  await connectCloudinary();

  app.get("/", (req, res) => res.send("API is Working"));
  app.use("/api/user", userRouter);
  app.use("/api/payment", paymentRouter);
  app.use("/api/services", serviceRouter);
  app.use("/api/bookings", bookingRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/admin", adminRouter);

  // Create HTTP server and attach socket.io for real-time notifications
  const httpServer = createServer(app);
  const io = new IOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || true,
      methods: ["GET", "POST"] ,
      credentials: true
    }
  });

  // initialize shared io instance
  initIo(io);

  io.on('connection', (socket) => {
    // join a room for a user to receive booking updates
    socket.on('join-user-room', ({ userId }) => {
      if (userId) socket.join(`user_${userId}`);
    });
    // join tracking rooms for provider tracking
    socket.on('join-tracking-room', ({ bookingId }) => {
      if (bookingId) socket.join(`booking_${bookingId}`);
    });
    // join admins room
    socket.on('join-admins-room', () => {
      socket.join('admins');
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
