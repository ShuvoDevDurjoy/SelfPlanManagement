//now implement this task adding and getting functionality 
//i am giving you the schema for this 

import connectDB from "@/db/connection";
import Milestone from "@/models/milestone";
import Task from "@/models/task";
import mongoose from "mongoose";
import { isValid } from "@/validations/check";
import { isDate } from "util/types";

// ===================== ADD Task =====================
export async function POST(req, { params }) {
  try {
    await connectDB();

    const { milestone_id } = await params;
    const body = await req.json();
    const { title, description, start_time, end_time } = body;

    // Validate milestone_id
    if (!mongoose.Types.ObjectId.isValid(milestone_id)) {
      return Response.json(
        { success: false, message: "Invalid milestone id" },
        { status: 400 },
      );
    }

    const milestone = await Milestone.findById(milestone_id);
    if (!milestone) {
      return Response.json(
        { success: false, message: "Milestone not found" },
        { status: 404 },
      );
    }

    // Validate task title
    if (!isValid(title)) {
      return Response.json(
        { success: false, message: "Task title is required" },
        { status: 400 },
      );
    }

    // Validate dates
    const startTime = start_time ? new Date(start_time) : null;
    const endTime = end_time ? new Date(end_time) : null;

    if ((start_time && !isDate(startTime)) || (end_time && !isDate(endTime))) {
      return Response.json(
        { success: false, message: "Invalid start_time or end_time" },
        { status: 400 },
      );
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      start_time: startTime,
      end_time: endTime,
    });

    // Add task to milestone
    milestone.tasks.push(task._id);
    await milestone.save();

    return Response.json(
      { success: true, message: "Task added", task },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: "Error adding task", error: e.message },
      { status: 500 },
    );
  }
}

// ===================== GET Tasks =====================
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { milestone_id } = params;

    if (!mongoose.Types.ObjectId.isValid(milestone_id)) {
      return Response.json(
        { success: false, message: "Invalid milestone id" },
        { status: 400 },
      );
    }

    const milestone = await Milestone.findById(milestone_id);
    if (!milestone) {
      return Response.json(
        { success: false, message: "Milestone not found" },
        { status: 404 },
      );
    }

    const tasks = await Task.find({ _id: { $in: milestone.tasks } }).sort({
      createdAt: -1,
    });

    return Response.json({ success: true, tasks }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: "Error fetching tasks", error: e.message },
      { status: 500 },
    );
  }
}
