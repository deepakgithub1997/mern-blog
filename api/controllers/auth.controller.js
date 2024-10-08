import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !email || !password || username === "" || password === "" || email === "") {
    next((200, "All Fields Are Required (Server Error)"));
  }
  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 Characters (Server Error)'));
    }
  }

  if (username) {
    if (username.length < 3 || username.length > 20) {
      return next(errorHandler(400, 'username must be of 7 to 20 Characters (Server Error)'));
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, 'username cannot contains spaces (Server Error)'));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'Username can only contains letter and numbers (Server Error)'));
    }
  }
  const hashpassword = bcryptjs.hashSync(password, 10);
  try {
    const validUser = await User.findOne({ username });
    if (validUser) {
      return next(errorHandler(200, "username already used (Server Error)"));
    }
    const validEmail = await User.findOne({ email });
    if (validEmail) {
      return next(errorHandler(200, "email already used (Server Error)"));
    }
  } catch (error) {
    return next(error);
  }

  const newUser = new User({
    fullname,
    username,
    email,
    password: hashpassword,
  });
  try {
    await newUser.save();
    res.json({ statusCode: 200, message: 'Signup successful' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All Fields Are Required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid email"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res.status(200).cookie('access_token', token, {
      httpOnly: true
    }).json(rest);

  } catch (error) {
    next(error);
  }
}

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json(rest);

    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json(rest);

    }
  } catch (error) {
    next(error);
  }

}

