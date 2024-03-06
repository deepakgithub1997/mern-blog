import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  const hashpassword = bcryptjs.hashSync(password, 10);

  if (!username || !email || !password || username === "" || password === "" || email === "") {
    return res.status(400).json({ message: "All Fields are Required" });
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
    res.status(500).json({ message: error.message });
  }
};


