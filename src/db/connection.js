import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.log("Mongo Db URI is: ", MONGODB_URI);
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Use globalThis (not global) — safer in Next.js
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI);
      
      console.log("<<<<< Connected Successfully")
  }
    
    console.log("Request made to connect to db")

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
