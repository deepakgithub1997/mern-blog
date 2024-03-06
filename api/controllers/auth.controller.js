import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashpassword = bcryptjs.hashSync(password, 10);

  if (!username || !email || !password || username === "" || password === "" || email === "") {
    next(errorHandler(400, "All Fields Are Required"));
  }

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};


