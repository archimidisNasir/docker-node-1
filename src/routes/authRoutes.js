import express from "express";
// import { signup, signin, profileView } from "../controllers/authController.js"; // ✅ Correct import
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to verify JWT
import authController from "../controllers/authController.js"; // ✅ Correct Import
import { signup, signin, profileView, getAllUsers } from "../controllers/authController.js"; // ✅ Correct import

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

// Signup Route
router.post("/signup", signup);

// Signin Route
router.post("/signin", signin);

// Profile Route
// router.get("/profile", profile_view);
router.get("/profile", authMiddleware, authController.profileView);


router.get("/all-users", authMiddleware, getAllUsers);

router.put("/update-profile", authMiddleware, authController.updateProfile);



export default router;
