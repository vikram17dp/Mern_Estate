import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userrouter from './routes/user.route.js'
import { signup } from "./controller/auth.controller.js";
dotenv.config();
mongoose
  .connect(process.env.MNOGO)
  .then(() => {
    console.log("mongoDB  is conncted!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());

app.listen(3000, (req, res) => {
  console.log("Server is running on the port 3000!");
});

app.use("/api/user",userrouter)
app.use("/api/auth",signup);
