import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Ensures user is logged in

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'User route working!' });
});


router.get('/users', authMiddleware, authorizeRoles("admin"), getAllUsers);

module.exports = router;
