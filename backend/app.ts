import express from "express";
import authRoutes from "./routers/auth/auth.routers";
import cors from "cors";
import studentRoutes from "./routers/students/student.routers";
import classRoutes from "./routers/classes/class.routers";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

export default app;
