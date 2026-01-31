import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema(
  {
    title: {
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
      maxlength: 500,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
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
  },
  { timestamps: true },
);

// Optional: If milestone deleted directly → delete tasks
milestoneSchema.pre("findOneAndDelete", async function () {
  const milestone = await this.model.findOne(this.getFilter());
  if (!milestone) return;

  const Task = mongoose.model("Task");
  if (milestone.tasks.length > 0) {
    await Task.deleteMany({ _id: { $in: milestone.tasks } });
  }

});

const Milestone =
  mongoose.models.Milestone || mongoose.model("Milestone", milestoneSchema);
export default Milestone;
