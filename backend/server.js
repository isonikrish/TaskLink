import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hi from TaskLink");
});

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
