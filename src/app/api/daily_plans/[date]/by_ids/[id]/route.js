import DailyPlan from "@/models/dailyPlanModel";
import mongoose from "mongoose";
import { jwtVerify } from "jose";
import connectDB from "@/db/connection";
import Task from "@/models/task";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { date, id } = await params;

    // 1️⃣ Validate task ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid task ID" },
        { status: 400 },
      );
    }

    // 2️⃣ Verify token
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const user_id = payload.id;

    // 3️⃣ Validate date param
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json(
        { success: false, message: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 },
      );
    }

    const [year, month, day] = date.split("-").map(Number);
    const baseDate = new Date(Date.UTC(year, month - 1, day));

    // 4️⃣ Parse body
    const body = await req.json();
    const { title, description = "", start_time, end_time, completed } = body;

    // 5️⃣ Validate title
    if (!title || typeof title !== "string") {
      return Response.json(
        { success: false, message: "Title is required and must be a string" },
        { status: 400 },
      );
    }

    // 6️⃣ Validate time strings if provided
    if (start_time && typeof start_time !== "string") {
      return Response.json(
        {
          success: false,
          message: "start_time must be a string in HH:MM format",
        },
        { status: 400 },
      );
    }

    if (end_time && typeof end_time !== "string") {
      return Response.json(
        {
          success: false,
          message: "end_time must be a string in HH:MM format",
        },
        { status: 400 },
      );
    }

    let startTime = null;
    let endTime = null;

    // 7️⃣ Convert times only if provided & non-empty
    if (start_time?.trim()) {
      const [startHour, startMin] = start_time.split(":").map(Number);
      startTime = new Date(baseDate);
      startTime.setUTCHours(startHour, startMin, 0, 0);
    }

    if (end_time?.trim()) {
      const [endHour, endMin] = end_time.split(":").map(Number);
      endTime = new Date(baseDate);
      endTime.setUTCHours(endHour, endMin, 0, 0);
    }

    // 8️⃣ Validate time order ONLY if both exist
    if (startTime && endTime && startTime >= endTime) {
      return Response.json(
        { success: false, message: "start_time must be before end_time" },
        { status: 400 },
      );
    }

    // 9️⃣ Build update object (only include time fields if provided)
    const updateData = {
      title,
      description,
      completed: Boolean(completed),
    };

    if (start_time !== undefined) updateData.start_time = startTime;
    if (end_time !== undefined) updateData.end_time = endTime;

    console.log(updateData)

    // 🔟 Update task
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return Response.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Task updated successfully",
        task: updatedTask,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("Error in PATCH /api/daily_plans/:date/tasks/:id:", e);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}


export async function DELETE(req, { params }) {
    try {
        await connectDB();

        console.log("This is deleting");

        const { id } = await params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return Response.json({
                success: false,
                message: "Invalid Request, Please provide a valid id"
            }, { status: 400 });
        }

        const deleted_plan = await DailyPlan.findByIdAndDelete(id);

        if (!deleted_plan) {
            return Response.json({
                success: false,
                message: "Plan not found"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Plan deleted successfully",
            data: deleted_plan
        }, { status: 200 });

    } catch(e) {
        console.error("Error in DELETE /api/daily_plans/by_ids/[id]:", e);
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}