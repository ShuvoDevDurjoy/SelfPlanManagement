import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateVerificationToken = () =>
  crypto.randomBytes(32).toString("hex");

export const generateJWT = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
