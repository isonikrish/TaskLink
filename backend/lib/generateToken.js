import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function generateTokenAndSetCookie(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
   secure: process.env.NODE_ENV === "production",
    path: "/", // Available on all routes
  });
}
