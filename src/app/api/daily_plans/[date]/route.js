import connectDB from "@/db/connection";
import DailyPlan from "@/models/dailyPlanModel";
import Task from "@/models/task";
import { isValid } from "@/validations/check";
import { jwtVerify } from "jose";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { date } = await params; // "YYYY-MM-DD"
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json(
        { success: false, message: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 },
      );
    }

    // ✅ Create UTC date
    const [year, month, day] = date.split("-").map(Number);
    const planDate = new Date(Date.UTC(year, month - 1, day));

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

    console.log("plan date param:", date);
    console.log("user id:", user_id);
    console.log("normalized plan date:", planDate.toISOString());

    // 3️⃣ Find daily plan and populate tasks
    const dailyPlan = await DailyPlan.findOne({
      user_id,
      date: planDate,
    }).populate({
      path: "tasks",
      options: { sort: { start_time: 1 } },
    });

    if (!dailyPlan) {
      return Response.json(
        {
          success: true,
          date,
          count: 0,
          tasks: [],
        },
        { status: 200 },
      );
    }

    return Response.json({
      success: true,
      date,
      count: dailyPlan.tasks.length,
      tasks: dailyPlan.tasks,
    });
  } catch (e) {
    console.error("GET /daily_plans/:date error:", e);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}



export async function POST(req, { params }) {
  try {
    //  Verify token
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

    // Connect to DB
    await connectDB();

    // Get date from route param
    const { date } = await params; // "2026-01-31"
    const planDate = new Date(date);

    if (isNaN(planDate.getTime())) {
      return Response.json(
        { success: false, message: "Invalid date format" },
        { status: 400 },
      );
    }

    // 4️⃣ Parse body
    const body = await req.json();
    const { title, description = "", start_time = "", end_time = "" } = body;

    // 5️⃣ Validate title
    if (!isValid(title)) {
      return Response.json(
        { success: false, message: "Task title is required" },
        { status: 400 },
      );
    }

    // 6️⃣ Convert "HH:mm" → Date on same day
    const makeTime = (dateObj, timeStr) => {
      if (!timeStr) return null;
      const [hours, minutes] = timeStr.split(":").map(Number);
      if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
      ) {
        return null;
      }
      const d = new Date(dateObj);
      d.setHours(hours, minutes, 0, 0);
      return d;
    };

    const startTime = makeTime(planDate, start_time);
    const endTime = makeTime(planDate, end_time);

    if (start_time && !startTime) {
      return Response.json(
        {
          success: false,
          message: "Invalid start_time format (HH:mm required)",
        },
        { status: 400 },
      );
    }

    if (end_time && !endTime) {
      return Response.json(
        { success: false, message: "Invalid end_time format (HH:mm required)" },
        { status: 400 },
      );
    }

    if (startTime && endTime && startTime > endTime) {
      return Response.json(
        { success: false, message: "start_time cannot be after end_time" },
        { status: 400 },
      );
    }

    // 7️⃣ Create the task
    const newTask = await Task.create({
      title,
      description,
      start_time: startTime,
      end_time: endTime,
    });

    // 8️⃣ Find or create daily plan
    let dailyPlan = await DailyPlan.findOne({
      user_id,
      date: planDate,
    });

    if (!dailyPlan) {
      dailyPlan = await DailyPlan.create({
        user_id,
        date: planDate,
        tasks: [newTask._id],
      });
    } else {
      dailyPlan.tasks.push(newTask._id);
      await dailyPlan.save();
    }

    // 9️⃣ Success response
    return Response.json(
      {
        success: true,
        message: "Task added to daily plan",
        task: newTask,
        daily_plan: dailyPlan,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("POST /daily_plans/:date error:", e);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
