import connectDB from "@/db/connection";
import Mission from "@/models/missions";
import Milestone from "@/models/milestone";
import mongoose from "mongoose";
import { isValid } from "@/validations/check";
import { isDate } from "util/types";

// ===================== ADD Milestone =====================
export async function POST(req, { params }) {
  try {
    await connectDB();

    const { mission_id } = await params;
    const body = await req.json();

    const { title, description, start_time, end_time } = body;

    // Validate missionId
    if (!mongoose.Types.ObjectId.isValid(mission_id)) {
      return Response.json(
        { success: false, message: "Invalid mission id" },
        { status: 400 },
      );
    }

    // Validate mission exists & belongs to user
    const mission = await Mission.findById(mission_id);
    if (!mission) {
      return Response.json(
        { success: false, message: "Mission not found" },
        { status: 404 },
      );
    }

    // Validate milestone title
    if (!isValid(title)) {
      return Response.json(
        { success: false, message: "Milestone title is required" },
        { status: 400 },
      );
    }

    console.log({ title, description, start_time, end_time });

    // Validate dates
    const startTime = start_time ? new Date(start_time) : null;
    const endTime = end_time ? new Date(end_time) : null;

    if ((start_time && !isDate(startTime)) || (end_time && !isDate(endTime))) {
      return Response.json(
        { success: false, message: "Invalid start_time or end_time" },
        { status: 400 },
      );
    }

    // Create milestone
    const milestone = await Milestone.create({
      title,
      description,
      start_time: startTime,
      end_time: endTime,
    });

    // Add milestone to mission
    mission.milestones.push(milestone._id);
    await mission.save();

    return Response.json(
      { success: true, message: "Milestone added", milestone },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: "Error adding milestone", error: e.message },
      { status: 500 },
    );
  }
}

// ===================== GET All Milestones for a Mission =====================
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { mission_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(mission_id)) {
      return Response.json(
        { success: false, message: "Invalid mission id" },
        { status: 400 },
      );
    }

    const milestones = await Milestone.find({
      _id: { $in: (await Mission.findById(mission_id))?.milestones || [] },
    })
      .populate("tasks")
      .sort({ createdAt: -1 });

    const mission_with_milestone = await Mission.findById(mission_id)
      .populate({
        path: "milestones",
        populate: {
          path: "tasks",
        },
      })
      .sort({ createdAt: -1 });

    return Response.json(
      { success: true, mission_with_milestone },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      {
        success: false,
        message: "Error fetching milestones",
        error: e.message,
      },
      { status: 500 },
    );
  }
}
