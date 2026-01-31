import connectDB from "@/db/connection";
import Mission from "@/models/missions";
import { isValid } from "@/validations/check";
import { jwtVerify } from "jose";
import mongoose from "mongoose";
import { isDate } from "util/types";

// ===================== GET: Get all missions for a user =====================
export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const t_val = await jwtVerify(token, secret);
    const user_id = t_val.payload.id;

    console.log(user_id)

    //   const body = await req.json();

    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
      return Response.json(
        { success: false, message: "Invalid or missing user_id" },
        { status: 400 },
      );
    }

    const missions = await Mission.find({ user_id }).sort({ createdAt: 1 });

    return Response.json(
      {
        success: true,
        message: "Missions fetched successfully",
        missions,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      {
        success: false,
        message: "Error while fetching missions",
        error: e.message,
      },
      { status: 500 },
    );
  }
}

// ===================== POST: Create a mission =====================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const token = req.cookies.get("token")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const t_val = await jwtVerify(token, secret);
    const user_id = t_val.payload.id;
    
    const {
      name,
      description,
      icon,
      color,
      start_time,
      end_time,
      status = "not-started",
    } = body;

    // 1️⃣ Validate user_id
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return Response.json(
        { success: false, message: "Invalid User Id" },
        { status: 400 },
      );
    }

    // 2️⃣ Validate required fields
    if (!isValid(name)) {
      return Response.json(
        { success: false, message: "Mission name is required" },
        { status: 400 },
      );
    }

    // 3️⃣ Validate dates (if provided)
    const startTime = start_time ? new Date(start_time) : null;
    const endTime = end_time ? new Date(end_time) : null;

    if ((start_time && !isDate(startTime)) || (end_time && !isDate(endTime))) {
      return Response.json(
        { success: false, message: "Invalid start_time or end_time" },
        { status: 400 },
      );
    }

    // 4️⃣ Validate status enum
    const allowedStatus = ["not-started", "in-progress", "completed"];
    if (status && !allowedStatus.includes(status)) {
      return Response.json(
        { success: false, message: "Invalid mission status" },
        { status: 400 },
      );
    }

    const mission = await Mission.create({
      user_id,
      name,
      description,
      icon,
      color,
      start_time: startTime,
      end_time: endTime,
      status,
    });

    if (!mission) {
      return Response.json(
        {
          success: false,
          message: "Failed to create mission",
        },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Mission has been created successfully",
        mission,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      {
        success: false,
        message: "Error while creating mission",
        error: e.message,
      },
      { status: 500 },
    );
  }
}
