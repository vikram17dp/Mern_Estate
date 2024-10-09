import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userrouter from './routes/user.route.js';
import authrouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import path from 'path';
import cors from 'cors';

dotenv.config();
mongoose
  .connect(process.env.MNOGO)
  .then(() => {
    console.log("mongoose is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your Vite frontend
  credentials: true // Allow credentials
}));

// Define your API routes first
app.use("/api/user", userrouter);
app.use("/api/auth", authrouter);
app.use("/api/listing", listingRouter);

// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

// Catch-all handler for any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
