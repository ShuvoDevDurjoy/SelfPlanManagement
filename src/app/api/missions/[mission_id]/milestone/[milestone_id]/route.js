import connectDB from "@/db/connection";
import Milestone from "@/models/milestone";
import Mission from "@/models/missions";
import mongoose from "mongoose";
import { isValid } from "@/validations/check";
import { isDate } from "util/types";

// ===================== UPDATE Milestone =====================
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { milestone_id } = await params;
    const body = await req.json();
    const { title, description, start_time, end_time } = body;


    if (!mongoose.Types.ObjectId.isValid(milestone_id)) {
      return Response.json(
        { success: false, message: "Invalid milestone id" },
        { status: 400 },
      );
    }

    // Validate name
    if (title && !isValid(title)) {
      return Response.json(
        { success: false, message: "Invalid milestone name" },
        { status: 400 },
      );
    }

    // Validate dates
    const startDate = start_time ? new Date(start_time) : undefined;
    const endDate = end_time ? new Date(end_time) : undefined;

    if ((start_time && !isDate(startDate)) || (end_time && !isDate(endDate))) {
      return Response.json(
        { success: false, message: "Invalid start_time or end_time" },
        { status: 400 },
      );
    }

    const updatedMilestone = await Milestone.findByIdAndUpdate(
      milestone_id,
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(start_time && { start_time: startDate }),
        ...(end_time && { end_time: endDate }),
      },
      { new: true, runValidators: true },
    );

    if (!updatedMilestone) {
      return Response.json(
        { success: false, message: "Milestone not found" },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Milestone updated successfully",
        milestone: updatedMilestone,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: "Error updating milestone", error: e.message },
      { status: 500 },
    );
  }
}

// ===================== DELETE Milestone =====================
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { milestone_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(milestone_id)) {
      return Response.json(
        { success: false, message: "Invalid milestone id" },
        { status: 400 },
      );
    }

    // Delete milestone (tasks will be deleted by schema pre-hook)
    const deletedMilestone = await Milestone.findOneAndDelete({
      _id: milestone_id,
    });

    if (!deletedMilestone) {
      return Response.json(
        { success: false, message: "Milestone not found" },
        { status: 404 },
      );
    }

    // Remove milestone from parent mission
    await Mission.updateMany(
      { milestones: milestone_id },
      { $pull: { milestones: milestone_id } },
    );

    return Response.json(
      {
        success: true,
        message: "Milestone and its tasks deleted successfully",
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: "Error deleting milestone", error: e.message },
      { status: 500 },
    );
  }
}
