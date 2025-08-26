import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import {seed} from './seed/seed'
dotenv.config();

const PORT = process.env.PORT || 8000;

async function startServer() {
  await connectDB();
  await seed(); // run seed after DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
startServer();