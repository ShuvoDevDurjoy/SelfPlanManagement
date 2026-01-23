import { daily_plane } from "@/data/daily_plane";

function getTimeHHMM(dateInput) {
  // Take only the hour and minutes part of the ISO string
  return dateInput.substring(11, 16);
}


function NormalizeDailyPlaneById(p) {
  //check if a plan at the given date is found or not
  if (!p) return;

  //normalized structure to hold the structure of the normalized plan after reduction
  const normalized = {
    date: "",
    id: "",
    plans: {
      by_id: {},
      all_ids: [],
    },

    ind_plans: {
      by_ids: {},
      all_ids: new Set(),
    },
  };

  //set to contain all the plan ids at a specific day
  /*
   **** Set is used to aviod duplication
   */
  let all_ind_ids = new Set();

  normalized.date = p.date;
  normalized.id = p.id;

  const current_time = new Date();

  // console.log("Curren titme si: ", current_time);

  let all_plan_id = new Set();
  p.plans.forEach((element) => {
    all_plan_id.add(element.id);
    normalized.plans.by_id[element.id] = {};
    normalized.plans.by_id[element.id]["id"] = element.id;
    normalized.plans.by_id[element.id]["plane_name"] = element.plane_name;
    normalized.plans.by_id[element.id]["plane_list"] = [];
    let plane_set = new Set();
    element.plane_list?.forEach((ind_element) => {
      plane_set.add(ind_element.id);
      all_ind_ids.add(ind_element.id);
      const start_time = new Date(ind_element["start_time"]);
      const end_time = new Date(ind_element["end_time"]);
      // console.log("Starting time: ", ind_element['start_time'])
      // console.log("Start time: ", start_time);
      // console.log("Ending time: ", ind_element['end_time'])
      // console.log("End Time: ", end_time);
      let plan_time_status = "ongoing";
      if (current_time >= end_time) {
        plan_time_status = "past";
      } else if (current_time < start_time) {
        plan_time_status = "upcoming";
      }

      const normalized_ind_element = {
        ...ind_element,
        ["plan_time_status"]: plan_time_status,
        ["start_time"]: getTimeHHMM(ind_element["start_time"]),
        ["end_time"]: getTimeHHMM(ind_element["end_time"])
      }
      normalized.ind_plans.by_ids[ind_element.id] = normalized_ind_element;
    });
    normalized.plans.by_id[element.id]["plane_list"] = [...plane_set];
  });
  normalized.plans.all_ids = [...all_plan_id];

  normalized.ind_plans.all_ids = all_ind_ids;
  console.log(normalized);

  return normalized;
}

function getDailyPlaneById(plan_date) {
  const plane_in_list = daily_plane.find((plane) => plane.date === plan_date);
  return plane_in_list;
}

export { NormalizeDailyPlaneById, getDailyPlaneById };
