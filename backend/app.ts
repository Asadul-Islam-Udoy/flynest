import express from "express";
import authRoutes from "./routers/auth/auth.routers";
import cors from "cors";
import studentRoutes from "./routers/students/student.routers";
import classRoutes from "./routers/classes/class.routers";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config({path:'.env'});
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL  // Use domain from .env in production
    : 'http://localhost:3000', // The frontend URL
    credentials: true, // Allow sending cookies with cross-origin requests
}
app.use(cors(corsOptions));
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

export default app;
