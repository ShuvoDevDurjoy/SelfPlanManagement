import connectDB from "@/db/connection";
import Task from "@/models/task";
import { isValid } from "@/validations/check";
import mongoose from "mongoose";
import { isDate } from "util/types";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { task_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(task_id)) {
      return Response.json(
        { success: false, message: "Invalid milestone id" },
        { status: 400 },
      );
    }

    console.log(task_id);

    const { title, description, completed, start_time, end_time } = await req.json();

    console.log({ title, description, start_time, end_time, completed });
    
    if (title && !isValid(title)) {
        return Response.json(
            { success: false, message: "Invalid milestone name" },
            { status: 400 },
        );
    }
    console.log("From here");

    // Validate dates
    const startDate = start_time ? new Date(start_time) : undefined;
    const endDate = end_time ? new Date(end_time) : undefined;

    if ((start_time && !isDate(startDate)) || (end_time && !isDate(endDate))) {
      return Response.json(
        { success: false, message: "Invalid start_time or end_time" },
        { status: 400 },
    );
}

    const updatedTask = await Task.findByIdAndUpdate(
      task_id,
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        ...(start_time && { start_time: startDate }),
        ...(end_time && { end_time: endDate }),
      },
      { new: true, runValidators: true },
    );

    console.log("updated task: ", updatedTask);

    if (updatedTask) {
      return Response.json(
        {
          success: true,
          message: "task updated",
          updatedTask,
        },
        { status: 200 },
      );
    }
      

    return Response.json(
      {
        success: false,
        message: "Failed",
      },
      { status: 400 },
    );
  } catch (e) {
    return Response.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { task_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(task_id)) {
      return Response.json(
        { success: false, message: "Invalid milestone id" },
        { status: 400 },
      );
    }

    const task = await Task.findByIdAndDelete(task_id);

    if (task) {
      return Response.json({
        success: true,
        message: "Successfull"
      }, { status: 200 });
    }

    return {
      success: false,
      message: "Failed"
    }
    
  } catch (e) {
    return {
      success: false, 
      message: "Failed with error"
    }
  }
}