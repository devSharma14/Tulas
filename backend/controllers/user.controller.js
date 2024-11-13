import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const secret = process.env.JWT_SECRET || 'test';  // It's better to store secrets in .env

// Sign-in function
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email: email.toLowerCase() }); // Ensure email is lowercase

    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: oldUser, token, message: "User logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again later." });
  }
};

// Sign-up function
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email: email.toLowerCase() }); // Ensure email is lowercase

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Optional: Add validation for password strength here

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      name,
      email: email.toLowerCase(), // Store email in lowercase
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, please try again later." });
  }
};
