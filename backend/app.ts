import express from "express";
import authRoutes from "./routers/auth/auth.routers";
import cors from "cors";
import studentRoutes from "./routers/students/student.routers";
import classRoutes from "./routers/classes/class.routers";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",              // local development
  "https://harmonious-nasturtium-35b1e4.netlify.app",   // production frontend
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    credentials: true, // allow cookies / tokens
  })
);
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

export default app;
