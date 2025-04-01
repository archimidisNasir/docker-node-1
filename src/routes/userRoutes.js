import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Ensures user is logged in

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'User route working!' });
});



// Protected Route: Only Admins can access
router.get('/users', authMiddleware, authorizeRoles("admin"), getAllUsers);

// export default router;
module.exports = router;
