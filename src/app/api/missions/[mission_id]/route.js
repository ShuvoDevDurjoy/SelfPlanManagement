import connectDB from "@/db/connection";
import Mission from "@/models/missions";
import mongoose from "mongoose";
import { isDate } from "util/types";
import { isValid } from "@/validations/check";

// ===================== GET Mission =====================
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { mission_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(mission_id)) {
      return Response.json(
        { success: false, message: "Invalid mission id", mission_id: mission_id },
        { status: 400 }
      );
    }

    const mission = await Mission.findById(mission_id).select("name description icon color start_time end_time -_id");

    if (!mission) {
      return Response.json(
        { success: false, message: "Mission not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        mission,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      {
        success: false,
        message: "Error fetching mission",
        error: e.message,
      },
      { status: 500 }
    );
  }
}

// ===================== UPDATE Mission =====================
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { mission_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(mission_id)) {
      return Response.json(
        { success: false, message: "Invalid mission id", id: mission_id },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { name, description, icon, color, start_time, end_time, status } =
      body;

    // Validate fields
    if (name && !isValid(name)) {
      return Response.json(
        { success: false, message: "Invalid mission name" },
        { status: 400 },
      );
    }

    const startTime = start_time ? new Date(start_time) : undefined;
    const endTime = end_time ? new Date(end_time) : undefined;

    if ((start_time && !isDate(startTime)) || (end_time && !isDate(endTime))) {
      return Response.json(
        { success: false, message: "Invalid start_time or end_time" },
        { status: 400 },
      );
    }

    const allowedStatus = ["not-started", "in-progress", "completed"];
    if (status && !allowedStatus.includes(status)) {
      return Response.json(
        { success: false, message: "Invalid mission status" },
        { status: 400 },
      );
    }

    const updatedMission = await Mission.findByIdAndUpdate(
      mission_id,
      {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(icon && { icon }),
        ...(color && { color }),
        ...(start_time && { start_time: startTime }),
        ...(end_time && { end_time: endTime }),
        ...(status && { status }),
      },
      { new: true, runValidators: true },
    );

    if (!updatedMission) {
      return Response.json(
        { success: false, message: "Mission not found" },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Mission updated successfully",
        mission: updatedMission,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: "Error updating mission", error: e.message },
      { status: 500 },
    );
  }
}

// ===================== DELETE Mission =====================
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { mission_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(mission_id)) {
      return Response.json(
        { success: false, message: "Invalid mission id" },
        { status: 400 },
      );
    }

    const deletedMission = await Mission.findOneAndDelete({ _id: mission_id });

    if (!deletedMission) {
      return Response.json(
        { success: false, message: "Mission not found" },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message:
          "Mission and all related milestones & tasks deleted successfully",
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: "Error deleting mission", error: e.message },
      { status: 500 },
    );
  }
}
