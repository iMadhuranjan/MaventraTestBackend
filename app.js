import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/dbConnection.js";
dotenv.config();
import cors from 'cors'
 import authRouter from "./routes/authRoutes.js"
import postRouter from './routes/postRoutes.js'
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());  
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
});


app.get("/", (req, res) => {
    res.send("Backend API is working!");
});


app.use("/api", authRouter);
app.use('/api', postRouter);
