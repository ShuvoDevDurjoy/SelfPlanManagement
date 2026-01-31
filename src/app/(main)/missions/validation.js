const ALLOWED_ICONS = [
  "MdCheck",
  "MdPendingActions",
  "MdCheckCircle",
  "GrInProgress",
  "MdFlag",
  "MdStar",
  "MdRocket",
  "MdTrendingUp",
  "MdAccessTime",
];
export async function validateMission(mission) {
  try {
    const errors = {};

    /* ---------------- Name ---------------- */
    if (!mission.name || mission.name.trim().length === 0) {
      errors.name = "Mission name is required";
    } else if (mission.name.trim().length < 3) {
      errors.name = "Mission name must be at least 3 characters";
    }

    /* ---------------- Description ---------------- */
    if (mission.description && mission.description.length > 500) {
      errors.description = "Description cannot exceed 500 characters";
    }

    /* ---------------- Icon ---------------- */
    if (mission.icon && !ALLOWED_ICONS.includes(mission.icon)) {
      errors.icon = "Invalid mission icon selected";
    }

    /* ---------------- Color ---------------- */
    const hexColorRegex = /^#([0-9A-Fa-f]{6})$/;
    if (mission.color && !hexColorRegex.test(mission.color)) {
      errors.color = "Invalid color value";
    }

    /* ---------------- Time Validation ---------------- */

    const dateTimeRegex =
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/;

    const now = new Date();

    let startDate = null;
    let endDate = null;

    /* ---- start_time ---- */
    if (mission.start_time && mission.start_time !== "") {

      console.log("mission start time: ", mission.start_time);
      if (!dateTimeRegex.test(mission.start_time)) {
        errors.start_time = "Invalid start time format";
      } else {
        startDate = new Date(mission.start_time);
        if (isNaN(startDate.getTime())) {
          errors.start_time = "Invalid start time";
        } else if (startDate <= now) {
          errors.start_time = "Start time must be in the future";
        }
      }
    }

    /* ---- end_time ---- */
    if (mission.end_time && mission.end_time !== "") {
      if (!dateTimeRegex.test(mission.end_time)) {
        errors.end_time = "Invalid end time format";
      } else {
        endDate = new Date(mission.end_time);
        if (isNaN(endDate.getTime())) {
          errors.end_time = "Invalid end time";
        } else if (endDate <= now) {
          errors.end_time = "End time must be in the future";
        }
      }
    }

    /* ---- start vs end ---- */
    if (startDate && endDate && endDate <= startDate) {
      errors.time = "End time must be after start time";
    }

    /* ---------------- Result ---------------- */
    if (Object.keys(errors).length > 0) {
      return { valid: false, errors };
    }

    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      errors: { global: "Validation failed unexpectedly" },
    };
  }
}

export async function validateMissionUpdate(mission) {
  try {
    const errors = {};

    /* ---------------- Name ---------------- */
    if (!mission.name || mission.name.trim().length === 0) {
      errors.name = "Mission name is required";
    } else if (mission.name.trim().length < 3) {
      errors.name = "Mission name must be at least 3 characters";
    }

    /* ---------------- Description ---------------- */
    if (mission.description && mission.description.length > 500) {
      errors.description = "Description cannot exceed 500 characters";
    }

    /* ---------------- Icon ---------------- */
    if (mission.icon && !ALLOWED_ICONS.includes(mission.icon)) {
      errors.icon = "Invalid mission icon selected";
    }

    /* ---------------- Color ---------------- */
    const hexColorRegex = /^#([0-9A-Fa-f]{6})$/;
    if (mission.color && !hexColorRegex.test(mission.color)) {
      errors.color = "Invalid color value";
    }

    /* ---------------- Time Validation ---------------- */

    const dateTimeRegex =
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/;

    const now = new Date();

    let startDate = null;
    let endDate = null;

    /* ---- start_time ---- */
    if (mission.start_time && mission.start_time !== "") {
      console.log("mission start time: ", mission.start_time);
      if (!dateTimeRegex.test(mission.start_time)) {
        errors.start_time = "Invalid start time format";
      } else {
        startDate = new Date(mission.start_time);
        if (isNaN(startDate.getTime())) {
          errors.start_time = "Invalid start time";
        } 
      }
    }

    /* ---- end_time ---- */
    if (mission.end_time && mission.end_time !== "") {
      if (!dateTimeRegex.test(mission.end_time)) {
        errors.end_time = "Invalid end time format";
      } else {
        endDate = new Date(mission.end_time);
        if (isNaN(endDate.getTime())) {
          errors.end_time = "Invalid end time";
        } 
      }
    }

    /* ---- start vs end ---- */
    if (startDate && endDate && endDate <= startDate) {
      errors.time = "End time must be after start time";
    }

    /* ---------------- Result ---------------- */
    if (Object.keys(errors).length > 0) {
      return { valid: false, errors };
    }

    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      errors: { global: "Validation failed unexpectedly" },
    };
  }
}

export function isoToDatetimeLocal(iso) {
  if (!iso) return "";

  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
