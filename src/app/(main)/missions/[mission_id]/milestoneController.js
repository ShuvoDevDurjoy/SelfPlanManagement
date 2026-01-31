import axios from "axios";
import { normalizeMilestone, normalizeMilestoneWithTask, normalizeTask, validateMileston } from "./validation";

export async function getMilestoneWithTask(mission_id) {
  try {
    if (!mission_id) return [];

    const response = await axios.get(`/api/missions/${mission_id}/milestone`);

    if (response.data.success) {
      const normalized = await normalizeMilestoneWithTask(
        response.data.mission_with_milestone,
      );

      if (normalized && normalized.success) {
        return normalized.norm_milestone;
      }
    }

    return false;
  } catch (e) {
    console.log("This is Error while fetching the mission's milestones");
    return false;
  }
}

export const createMilestone = async (mission_id, milestone, onCreateMilestone) => {
  try {
    //chekc if the mission id is defined or not
    if (!mission_id) {
      consoel.log("mission id is not provied");
      return {
        success: false,
      };
    }

    //validate the mission before sending to the database
    const validate_milestone = validateMileston(milestone);

    //check if the validation is successfull,
    //if not then return saying the validation is not successfull
    //else proceed to the next step
    if (!validate_milestone.isValid) {
      console.log(validate_milestone);
      return {
        success: false,
      };
    }

    //send teh validated milestone to the database
    const response = await axios.post(
      `/api/missions/${mission_id}/milestone`,
      milestone,
    );

    if (response.data.success) {
      const normalization = normalizeMilestone(response.data.milestone);
      if (normalization.success) {
        onCreateMilestone(normalization.norm_milestone);
        return {
          success: true,
        };
      }
    }

    return {
      success: false,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
};

export const updateMilestone = async (
  mission_id,
  milestone,
  onUpdateMilestone,
) => {
  try {
    //chekc if the mission id is defined or not
    if (!mission_id)
      return {
        success: false,
      };

    //validate the mission before sending to the database
    const validate_milestone = validateMileston(milestone, false);

    //check if the validation is successfull,
    //if not then return saying the validation is not successfull
    //else proceed to the next step
    if (!validate_milestone.isValid) {
      return {
        success: false,
      };
    }

    console.log("milestone_id: ", milestone);

    //send teh validated milestone to the database
    const response = await axios.patch(
      `/api/missions/${mission_id}/milestone/${milestone.id}`,
      milestone,
    );

    if (response.data.success) {
      const normalization = normalizeMilestone(response.data.milestone)
      if(normalization.success)
        onUpdateMilestone(normalization.norm_milestone);

      return{
        success: true
      }
    }

    return {
      success: false
    }
  } catch (e) {
    return {
      success: false,
    };
  }
};

export const createTask = async (mission_id, milestone_id, task, onAddTask) => {
  try{
    if (!mission_id || !milestone_id) {
      return {
        success: false,
      };
    }

    //validate the mission before sending to the database
    const validate_task = validateMileston(task);

    //check if the validation is successfull,
    //if not then return saying the validation is not successfull
    //else proceed to the next step
    if (!validate_task.isValid) {
      return {
        success: false,
      };
    }

    console.log(validate_task);
    console.log(mission_id);
    console.log(milestone_id);
    console.log(task);


    //send teh validated milestone to the database
    const response = await axios.post(
      `/api/missions/${mission_id}/milestone/${milestone_id}/tasks`,
      task,
    );

    if (response.data.success) {
      const normalization = normalizeMilestone(response.data.task);
      if (normalization.success)
        onAddTask(milestone_id, normalization.norm_milestone);

      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (e) {
    return {
      success: false
    }
  }
}

export const updateTask = async (mission_id, milestone_id, task, onUpdateTask) => {
  try {
    console.log(mission_id);
    console.log(milestone_id);
    console.log(task.id)
    if (!mission_id || !milestone_id) {
      return {
        success: false,
      };
    }

    //validate the mission before sending to the database
    const validate_task = validateMileston(task, false);

    console.log(validate_task);

    //check if the validation is successfull,
    //if not then return saying the validation is not successfull
    //else proceed to the next step
    if (!validate_task.isValid) {
      return {
        success: false,
      };
    }

    console.log(validate_task);
    console.log(task);

    console.log(
      `/api/missions/${mission_id}/milestone/${milestone_id}/tasks/${task.id}`,
    );

    // return;

    //send teh validated milestone to the database
    const response = await axios.patch(
      `/api/missions/${mission_id}/milestone/${milestone_id}/tasks/${task.id}`,
      task,
    );

    console.log(response.data);

    if (response.data.success) {
      console.log("normalization");
      const normalization = normalizeTask(response.data.updatedTask);
      console.log(normalization)
      if (normalization.success) {
        onUpdateTask(normalization.norm_task);

      return {
        success: true,
      };}
    }

    return {
      success: false,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
}

export const DeleteMilestone = async(mission_id, milestone_id, onDeleteMilestone) => {
  try {

    console.log("mission_id: ", mission_id, "milestone_id: ", milestone_id,)

    console.log("This is a call for delete")
    
    const response = await axios.delete(`/api/missions/${mission_id}/milestone/${milestone_id}`);

    if (response.data.success) {
      onDeleteMilestone(milestone_id);

      return {
        success: true
      }
    }

    return {
      success: false
    }

  } catch (e) {
    
  }
};

export const DeleteTask = async (mission_id, milestone_id, task_id, onDeleteTask) => {
  try {
    const response = await axios.delete(
      `/api/missions/${mission_id}/milestone/${milestone_id}/tasks/${task_id}`,
    );

    console.log(response)

    if (response.data.success) {
      onDeleteTask(milestone_id,task_id);
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};

export const completedTaskCount = (tasks) => {
  if (!tasks) return 0;
  let count = 0;
  Object.entries(tasks).forEach(([key, val]) => {
    if (val.completed) count++;
  })

  return count;
}