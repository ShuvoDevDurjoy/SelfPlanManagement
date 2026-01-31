import { isoToDatetimeLocal } from "../validation";

export async function normalizeMilestoneWithTask(mission_with_milestone) {
  try {
    const normalized = {
      name: mission_with_milestone.name,
      description: mission_with_milestone.description,
      icon: mission_with_milestone.icon,
      color: mission_with_milestone.color,
      start_time: mission_with_milestone.start_time,
      end_time: mission_with_milestone.end_time,

      milestone_ids: [],
      tasks_ids: [],

      milestone_by_ids: {},
      tasks_by_ids: {},
    };

    mission_with_milestone.milestones.map((milestone, _) => {
      //push the milestone id to the milestone_ids
      normalized.milestone_ids.push(milestone._id);

      const normalized_milestone_by_id = {
        _id: milestone._id,
        title: milestone.title,
        description: milestone.description,
        start_time: isoToDatetimeLocal(milestone.start_time),
        end_time: isoToDatetimeLocal(milestone.end_time),
        tasks: [],
        completed_task: 0,
      };

      milestone.tasks.map((task, _) => {
        normalized.tasks_ids.push(task._id);

        normalized_milestone_by_id.tasks.push(task._id);
        if (task.completed) normalized_milestone_by_id.completed_task++;

        normalized.tasks_by_ids[task._id] = {
          ...task,
          start_time: isoToDatetimeLocal(task.start_time),
          end_time: isoToDatetimeLocal(task.end_time),
        };
      });

      normalized.milestone_by_ids[milestone._id] = normalized_milestone_by_id;
    });


    return {
      success: true,
      message: "Normalized milestone and tasks",
      norm_milestone: normalized,
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to normalize the milestone",
      norm_milestone: {},
    };
  }
}

export const normalizeMilestone = (milestone) => {
  try {
    const normalized_milestone = {
      _id: milestone._id,
      title: milestone.title,
      description: milestone.description,
      start_time: isoToDatetimeLocal(milestone.start_time),
      end_time: isoToDatetimeLocal(milestone.end_time),
      tasks: [],
      completed_task: 0,
    };

    return {
      success: true, 
      norm_milestone: normalized_milestone
    }
  } catch (e) {
    return {
      success: false
    }
  }
}

export const normalizeTask = (task) => {
  const normalized_task = {
    _id: task._id,
    title: task.title,
    description: task.description,
    start_time: isoToDatetimeLocal(task.start_time),
    end_time: isoToDatetimeLocal(task.end_time),
    completed: task.completed
  };

  return {
    success: true, 
    norm_task: {...normalized_task}
  };
}

export const getLocalTimeString = (time) => {
  const date = new Date(time);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getLocalDateTimeString = (time) => {
  if(!time) return "Not Specified"
  const date = new Date(time);
  return date.toLocaleString("en-US", {
    month: "short", 
    day: "numeric", 
    year: "numeric", 
    hour: "numeric",
    minute: "numeric"
  })
}

export const validateMileston = (milestone, time_should_be_in_future = true) => {
  const errors = [];

  // ISO 8601 date-time regex (YYYY-MM-DDTHH:mm or with seconds and Z)
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(?:\.\d+)?Z?$/;

  const now = new Date();


  // 1️⃣ Title (required, string, trimmed, length 3–100)
  if (!milestone.title || typeof milestone.title !== "string") {
    errors.push("Title is required and must be a string.");
  } else {
    const title = milestone.title.trim();
    if (title.length < 3) {
      errors.push("Title must be at least 3 characters long.");
    }
    if (title.length > 100) {
      errors.push("Title cannot exceed 100 characters.");
    }
  }

  // 2️⃣ Description (optional, string, max 500)
  if (milestone.description !== undefined && milestone.description !== null) {
    if (typeof milestone.description !== "string") {
      errors.push("Description must be a string.");
    } else if (milestone.description.length > 500) {
      errors.push("Description cannot exceed 500 characters.");
    }
  }

  // 3️⃣ Start time (optional, regex + valid date + future)
  let start = null;
  if (milestone.start_time) {
    if (
      typeof milestone.start_time !== "string" ||
      !dateRegex.test(milestone.start_time)
    ) {
      errors.push("start_time must be a valid ISO 8601 date-time string.");
    } else {
      start = new Date(milestone.start_time);
      if (isNaN(start.getTime())) {
        errors.push("start_time must be a valid date.");
      } else if (time_should_be_in_future && start <= now) {
        errors.push("start_time must be in the future.");
      }
    }
  }

  // 4️⃣ End time (optional, regex + valid date + future)
  let end = null;
  if (milestone.end_time) {
    if (
      typeof milestone.end_time !== "string" ||
      !dateRegex.test(milestone.end_time)
    ) {
      errors.push("end_time must be a valid ISO 8601 date-time string.");
    } else {
      end = new Date(milestone.end_time);
      if (isNaN(end.getTime())) {
        errors.push("end_time must be a valid date.");
      } else if ((time_should_be_in_future) && (end <= now)) {
        errors.push("end_time must be in the future.");
      }
    }
  }

  // 5️⃣ Logical check: start_time <= end_time
  if (start && end && start > end) {
    errors.push("start_time cannot be after end_time.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};