import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userrouter from './routes/user.route.js'
import authrouter from "./routes/auth.route.js";
import listingRouter  from "./routes/listing.route.js";
import path from 'path'
import cors from 'cors'

dotenv.config();
mongoose
  .connect(process.env.MNOGO)
  .then(() => {
    console.log("mongoose  is connceted!");
  })
  .catch((err) => {
    console.log(err);
  });
  const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use(express.static(path.join(__dirname, 'client','dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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
