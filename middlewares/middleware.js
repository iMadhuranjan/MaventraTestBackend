import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from "../models/User.js"; // ✅ Make sure you import User
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "No Token Found"
      });  
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id);

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        isAuthenticated: false
      });
    }

    req.user = {
      _id: userData._id,
      name: userData.name,
      email: userData.email
    };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication error",
      isAuthenticated: false
    });
  }
};

export default authMiddleware;
