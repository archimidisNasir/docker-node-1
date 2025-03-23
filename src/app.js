import express from "express";
import authRoutes from "./routes/authRoutes.js"; // ✅ Correct ES Module import
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json()); // ✅ Middleware to parse JSON

// Import routes
app.use("/api/auth", authRoutes); // ✅ Registers `/api/auth/test`

// Default route for testing
app.get("/", (req, res) => {
    res.send("Hello Nahid vai, from Express inside Docker!");
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default app; // ✅ Correct ES Module export
