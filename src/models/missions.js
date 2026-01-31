import mongoose from "mongoose";
import Milestone from "./milestone";
import Task from "./task";

const missionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: 250,
    },
    icon: {
      type: String,
      default: "MdFlag",
      trim: true,
    },
    color: {
      type: String,
      default: "#0000ff",
    },
    milestones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Milestone",
      },
    ],
    start_time: {
      type: Date,
      default: null,
    },
    end_time: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "not-started",
    },
  },
  { timestamps: true },
);

// 🔥 CASCADE DELETE: Mission → Milestones → Tasks
missionSchema.pre("findOneAndDelete", async function () {
  const mission = await this.model.findOne(this.getFilter());
  if (!mission) return next();


  const milestones = await Milestone.find({ _id: { $in: mission.milestones } });

  const taskIds = milestones.flatMap((m) => m.tasks);
  if (taskIds.length > 0) {
    await Task.deleteMany({ _id: { $in: taskIds } });
  }

  await Milestone.deleteMany({ _id: { $in: mission.milestones } });

});

const Mission =
  mongoose.models.Mission || mongoose.model("Mission", missionSchema);
export default Mission;
