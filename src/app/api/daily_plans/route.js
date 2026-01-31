import connectDB from "@/db/connection";
import Task from "@/models/task";

export async function POST(req) {
  try {

    await connectDB();


    const body = await req.json();

    console.log(body);
    const { title, description, start_time, end_time } = body;

    // 🔒 Server-side validation (industry standard)
    if (!title || typeof title !== "string") {
      return Response.json(
        { error: "Title is required and must be a string" },
        { status: 400 },
      );
    }

    if (start_time && isNaN(new Date(start_time))) {
      return Response.json({ error: "Invalid start_time" }, { status: 400 });
    }

    if (end_time && isNaN(new Date(end_time))) {
      return Response.json({ error: "Invalid end_time" }, { status: 400 });
    }

    const plan = await Task.create({
      title,
      description,
      start_time,
      end_time,
    });

    return Response.json({ success: true, data: plan }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err, message: "Plan can not be made" }, { status: 500 });
  }
}


export async function GET() {
  return Response.json({
    success: true, 
    message: "Request is done"
  })
}

export async function PATCH(req, { params }) {
  
}