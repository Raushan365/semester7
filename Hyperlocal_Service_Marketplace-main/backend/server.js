import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// All multiple origins
const allowedOrigins = ["http://localhost:5173"];
// Middleware configuration
app.use(express.urlencoded({ extended: true })); // for form-data
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

(async () => {
  await connectDB();
  await connectCloudinary();

  app.get("/", (req, res) => res.send("API is Working"));
  app.use("/api/user", userRouter);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
