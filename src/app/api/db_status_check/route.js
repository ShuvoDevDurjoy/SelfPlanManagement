import connectDB from "@/db/connection";
import mongoose from "mongoose";

export async function GET() {
  
  await connectDB();
  
  console.log("Requesting to get connection to database");

  const isConnected = mongoose.connection.readyState === 1;

  return Response.json({
    database: isConnected ? "connected" : "disconnected",
    mongodb_uri: process.env.MONGODB_URI, 
  });
}
