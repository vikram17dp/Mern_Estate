import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "Please fill in all fields"));
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }


  const hashedpassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "please fill all fileds"));
  }
  try {
    const validuser = await  User.findOne({ email });
    if (!validuser) {
      return next(errorHandler(400, "User not found!"));
    }
    const validpassword = bcrypt.compareSync(password, validuser.password);

    if (!validpassword) {
      return next(errorHandler(400, "Invalid password!"));
    }
    const token = jwt.sign(
      {
        id: validuser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    const { password: pass, ...rest } = validuser._doc;

    
    res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
      .json(rest);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};
