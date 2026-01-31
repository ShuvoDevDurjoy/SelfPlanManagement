import mongoose from "mongoose";

const DailyplanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const DailyPlan =
  mongoose.models.daily_plans ||
  mongoose.model("daily_plans", DailyplanSchema, "daily_plans");

export default DailyPlan;
