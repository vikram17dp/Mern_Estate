import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MNOGO)
  .then(() => {
    console.log("mogoose  is conncted!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(3000, (req, res) => {
  console.log("Server is runing on the port 3000!");
});
