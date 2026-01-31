import axios from "axios";
import { isoToDatetimeLocal, validateMission, validateMissionUpdate } from "./validation";

export async function getMission(user_id) {
  try {
    const response = await axios.get("/api/missions/");

    console.log(response);

    if (response.data.success) {
      return response.data.missions.map((mission) => ({
        ...mission,
        start_time: isoToDatetimeLocal(mission.start_time),
        end_time: isoToDatetimeLocal(mission.end_time),
      }));
    }

    return [];
  } catch (e) {
    return [];
  }
}

export async function getMissionById(mission_id) {
  try {
    if (!mission_id) return false;
    const response = await axios.get("/api/missions/" + mission_id);

    console.log("response si: ", response);

    if (response.data.success) {
      return {
        success: true,
        mission: {
          ...response.data.mission, 
          start_time: isoToDatetimeLocal(response.data.mission.start_time), 
          end_time: isoToDatetimeLocal(response.data.mission.end_time)
        },
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
}

export async function addMission(mission) {
  try {
    const { valid, errors } = await validateMission(mission);

    if (!valid) {
      console.log("Validation Error");
      return {
        success: false,
        error: errors,
      };
    }

    const response = await axios.post("/api/missions", mission);

    if (response.data.success) {
      return {
        success: true,
        message: "mission is added successfully",
        mission: response.data.mission,
      };
    }

    return {
      success: false,
      message: "Failed to add the mission to db",
    };
  } catch (e) {
    return {
      success: false,
      message: "Error while adding the mission to db",
    };
  }
}

export async function updateMission(mission_id, mission) {
  try {
    const { valid, errors } = await validateMissionUpdate(mission);

    if (!valid) {
      console.log("Validation Error");
      return {
        success: false,
        error: errors,
      };
    }

    const response = await axios.patch("/api/missions/" + mission_id, mission);

    if (response.data.success) {
      return {
        success: true,
        message: "mission is added successfully",
        mission: response.data.mission,
      };
    }

    return {
      success: false,
      message: "Failed to add the mission to db",
    };
  } catch (e) {
    return {
      success: false,
      message: "Error while adding the mission to db",
    };
  }
}

export async function deleteMission(mission_id) {
  try {
    if (!mission_id)
      return {
        success: false,
      };

      const response = await axios.delete("/api/missions/" + mission_id);

      if (response.data.success) {
          return {
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
}
