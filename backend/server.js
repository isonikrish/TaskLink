import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import taskRoutes from './routes/task.js'


const app = express();
app.use(
  cors({
    origin: process.env.DOMAIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes);


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
