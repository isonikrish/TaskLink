import User from "../models/user.js";
import { signupSchema, loginSchema } from "../lib/zodSchemas.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/generateToken.js";
export async function handleSignup(req, res) {
  try {
    const data = req.body;
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success) {
      return res.status(400).json({
        msg: "Invalid credentials",
        errors: validatedData.error.errors,
      });
    }

    const { username, email, password } = validatedData.data;
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ msg: "Email already exists" });
    const usernameExists = await User.findOne({ username });
    if (usernameExists)
      return res.status(400).json({ msg: "Username already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
}
export async function handleLogin(req, res) {
  try {
    const data = req.body;
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      return res.status(400).json({
        msg: "Invalid credentials",
        errors: validatedData.error.errors,
      });
    }
    const { email, password } = validatedData.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      msg: "Login successful!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
export async function handleLogout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ msg: "Logout Successfull" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function handleGetMe(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
