import { daily_plane } from "@/data/daily_plane";
import axios from "axios";

function getTimeHHMM(dateInput) {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}


function NormalizePlan(p) {
  try {
    if (!p) return false;

    console.log("startTime : ", p["start_time"]);
    console.log("endTime : ", p["end_time"]);

    const start_time = p["start_time"] ? new Date(p["start_time"]) : null;
    const end_time = p["end_time"] ? new Date(p["end_time"]) : null;

    const current_time = new Date();

    console.log("current time: ", current_time);
    console.log("Start time: ", start_time);
    console.log("End Time: ", end_time);

    let plan_time_status = "ongoing";

    if (end_time && current_time >= end_time) {
      plan_time_status = "past";
    } else if (start_time && current_time < start_time) {
      plan_time_status = "upcoming";
    }
    else if (start_time && (start_time <= current_time && (end_time && end_time > current_time))) {
      plan_time_status = "ongoing"
    }

    const start_time_to_hhmm = p["start_time"]
      ? getTimeHHMM(p["start_time"])
      : null;

    const end_time_to_hhmm = p["end_time"] ? getTimeHHMM(p["end_time"]) : null;

    const normalized_plan = {
      ...p,
      plan_time_status,
      start_time: start_time_to_hhmm,
      end_time: end_time_to_hhmm,
    };

    return normalized_plan;
  } catch (e) {
    console.log("<<<<< Error while normalizing the plan", e);
    return false;
  }
}



function NormalizeDailyPlaneById(p, setTotalCount, setCompletedCount) {
  //check if a plan at the given date is found or not
  if (!p) return;

  //normalized structure to hold the structure of the normalized plan after reduction
  const normalized = {
    all_ids: [],
    by_ids: {},
  };

  p?.forEach((ind_element) => {
    normalized.all_ids.push(ind_element._id);
    const normalized_ind_element = NormalizePlan(ind_element);
    if(normalized_ind_element)
    normalized.by_ids[ind_element._id] = normalized_ind_element;
  });

  return normalized;
}

function getDailyPlaneById(plan_date) {
  const plane_in_list = daily_plane.find((plane) => plane.date === plan_date);
  return plane_in_list;
}

async function getPlan(date) {
  try {
    if (!date) return {
      success: false, 
      message: "Invalid date or route"
    }
    const response = await axios.get(`/api/daily_plans/${date}`);

    console.log(response);
    if (response.data.success) {
      return response.data;
    }
  } catch (e) {
    return {
      success: false, 
      message: "Failed to load plan from database"
    }
  }
}

/**
 * Validate time format (HH:MM or HH:MM:SS) and convert to complete Date object with plan_date
 */
const validateTimeFormat = (value, plan_date) => {
  try {
    if (typeof value !== "string") {
      return { success: false, message: "Time must be a string" };
    }

    // HH:mm or HH:mm:ss (24-hour)
    const regex = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

    if (!regex.test(value)) {
      return { success: false, message: "Invalid time format. Use HH:MM or HH:MM:SS" };
    }

    // Validate plan_date format (yyyy-mm-dd)
    if (!plan_date || typeof plan_date !== "string") {
      return { success: false, message: "Valid plan date is required (yyyy-mm-dd)" };
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(plan_date)) {
      return { success: false, message: "Invalid date format. Use yyyy-mm-dd" };
    }

    // Parse the date and time
    const [year, month, day] = plan_date.split("-").map(Number);
    const [hours, minutes, seconds = "0"] = value.split(":").map(Number);

    // Create Date object in UTC (consistent with backend)
    const dateTime = new Date(year, month - 1, day, hours, minutes, seconds);

    // Validate the created date is valid
    if (isNaN(dateTime.getTime())) {
      return { success: false, message: "Invalid date or time combination" };
    }

    return {
      success: true,
      value: dateTime, // Return full Date object
      timeString: value.substring(0, 5) // Also return HH:MM for display
    };
  } catch (e) {
    return { success: false, message: "Error validating time" };
  }
};

/**
 * Validate plan data before sending to API
 */
const validatePlan = (plan_date, plan_data) => {
  try {
    if (!plan_data) return { success: false, message: "Plan data is required" };


    // Validate title (required)
    if (!plan_data.title || plan_data.title.trim() === "") {
      return { success: false, message: "Title is required" };
    }

    if(!plan_data.completed){
      plan_data.completed = false;
    }


    return {
      success: true,
      value: {
        title: plan_data.title.trim(),
        description: plan_data.description?.trim() || "", // Optional, defaults to empty string
        start_time: plan_data.start_time,
        end_time: plan_data.end_time,
        completed: plan_data.completed || false
      }
    };
  } catch (e) {
    console.log("Error while validating plan", e);
    return { success: false, message: "Error validating plan data" };
  }
};

/**
 * Add a new plan to the database
 */
async function addPlan(plan_date, plan_data) {
  try {
    console.log("Adding plan to database for date: ", plan_date);
    console.log("Adding plan to database is: ", plan_data);
    
    // Validate plan data with plan_date
    const validation = validatePlan(plan_date, plan_data);

    console.log('validation is: ', validation)
    if (!validation.success) {
      return {
        success: false,
        message: validation.message
      };
    }

    console.log("Validated plan: ", validation.value);

    // Send to API
    const response = await axios.post(`/api/daily_plans/${plan_date}`, validation.value);

    if (response.data.success) {
      console.log("Plan added to database successfully");
      console.log("VAlidation data from database is: ", response.data.data);
      return {
        success: true,
        data: response.data.data,
        message: "Plan added successfully"
      };
    }

    return {
      success: false,
      message: response.data.message || "Failed to add plan"
    };

  } catch (e) {
    console.log("Error while adding plan to database", e);
    return {
      success: false,
      message: e.response?.data?.message || "Failed to add plan to database"
    };
  }
}

/**
 * Update an existing plan
 */
async function updatePlan(plan_id, plan_date, plan_data) {
  try {
    console.log("Updating plan with ID: ", plan_id, " for date: ", plan_date);
    console.log("And updating plan data is: ", plan_data);
    
    if (!plan_id) {
      return {
        success: false,
        message: "Plan ID is required"
      };
    }

    // Validate plan data with plan_date
    const validation = validatePlan(plan_date, plan_data);

    console.log(validation);
    if (!validation.success) {
      return {
        success: false,
        message: validation.message
      };
    }

    console.log("Validated plan update: ", validation.value);

    // Send to API
    const response = await axios.patch(`/api/daily_plans/${plan_date}/by_ids/${plan_id}`, validation.value);

    if (response.data.success) {
      console.log("Plan updated successfully");
      return {
        success: true,
        data: response.data.task,
        message: "Plan updated successfully"
      };
    }

    return {
      success: false,
      message: response.data.message || "Failed to update plan"
    };

  } catch (e) {
    console.log("Error while updating plan", e);
    return {
      success: false,
      message: e.response?.data?.message || "Failed to update plan"
    };
  }
}

/**
 * Delete a plan by ID
 */
const deletePlanById = async (plan_id) => {
  try {
    if (!plan_id) {
      return {
        success: false,
        message: "Plan ID is required"
      };
    }

    console.log("Deleting plan with ID: ", plan_id);

    const response = await axios.delete(`/api/daily_plans/by_ids/${plan_id}`);

    if (response.data.success) {
      console.log("Plan deleted successfully");
      return {
        success: true,
        message: "Plan removed from database successfully",
        data: response.data.data
      };
    }

    return {
      success: false,
      message: response.data.message || "Failed to delete plan"
    };

  } catch (e) {
    console.log("Error while deleting plan", e);
    return {
      success: false,
      message: e.response?.data?.message || "Failed to delete plan from database"
    };
  }
};

const getDateString = (plan_date) => {
  if (!plan_date) return;
  const date = plan_date.split("-");
  if (date.length !== 3) return;
  const targetDate = new Date(date[0], date[1] - 1, date[2]);
  const date_to_set = targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return date_to_set;
}

export { NormalizeDailyPlaneById, getDailyPlaneById, getDateString, updatePlan, addPlan, getPlan, NormalizePlan, validatePlan, deletePlanById };
