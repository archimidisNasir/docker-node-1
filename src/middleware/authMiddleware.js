import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ") || !authHeader.startsWith("bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data (id, role, etc.)
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
export default authMiddleware;



// const authMiddleware_xx = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach decoded user data to request
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
// };

// export default authMiddleware;