import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
// import { User } from "../models/userModel.js"; // Adjust the import based on your ORM setup
import authController from "../controllers/authController.js";



export const updateProfile = async (req, res) => {
    try {
      const { username, name, old_password, new_password, phone, address } = req.body;
      const requestingUserId = req.user.id; // Extracted from JWT middleware
      const requestingUserRole = req.user.role; // Assuming role is stored in JWT
  
      let targetUser;
  
      // If an admin provides a username, update that user's profile instead
      if (username) {
        if (requestingUserRole !== "admin") {
          return res.status(403).json({ message: "Permission denied. Only admin can update other users." });
        }
        targetUser = await User.findOne({ where: { username } });
      } else {
        // Otherwise, update the requesting user's own profile
        targetUser = await User.findByPk(requestingUserId);
      }
  
      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let passwordUpdated = false;
  
      // Update info if provided
      if (name) {
        targetUser.name = name;
      }
      if (phone) {
        targetUser.phone = phone;
      }
      if (address) {
        targetUser.address = address;
      }
  
      // Check if user wants to change password
      if (old_password && new_password) {
        const passwordMatch = await bcrypt.compare(old_password, targetUser.password);
        if (passwordMatch) {
          targetUser.password = await bcrypt.hash(new_password, 10);
          passwordUpdated = true;
        } else {
          console.warn(`User ${targetUser.id}: Old password incorrect, not updating password.`);
        }
      }
  
      // Save the updated user data
      await targetUser.save();
  
      res.json({
        message: passwordUpdated
          ? "Profile updated successfully, password changed."
          : "Profile updated successfully, but password was not changed.",
        user: targetUser,
      });
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };  



export const getAllUsers = async (req, res) => {
    try {
        // Check if the logged-in user is 'ranak'
        if (req.user.username !== "ranak4") {
            return res.status(403).json({ message: "Access denied" });
        }

        // Fetch all users from the database
        const users = await User.findAll({ attributes: { exclude: [] } });

        res.json(users);
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const profileView = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT middleware

        // Fetch user details
        const user = await User.findByPk(userId, {
            attributes: ["id", "name", "username"], // Exclude password
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Profile View Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user in DB
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Signin successful", token });
    } catch (error) {
      console.error("Signin Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };



// ✅ Export as an object so it can be imported as `default`
// export default { signup };
export default { signup, signin, profileView, updateProfile };

