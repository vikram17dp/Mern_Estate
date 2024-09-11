import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userrouter from './routes/user.route.js'
import authrouter from "./routes/auth.route.js";
import { listingRouter } from "./controller/listing.controller.js";
dotenv.config();
mongoose
  .connect(process.env.MNOGO)
  .then(() => {
    console.log("mongoose  is connceted!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, (req, res) => {
  console.log("Server is running on the port 3000!");
});

app.use("/api/user",userrouter)
app.use("/api/auth",authrouter)
app.use('/api/listing',listingRouter)

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})
