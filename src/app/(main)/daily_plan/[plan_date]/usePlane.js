import { addPlan, deletePlanById, NormalizePlan, updatePlan } from "./planeUtils";

const { useReducer } = require("react");
const { planeReducer, Action } = require("./planReducer");

const init = (initial_state) => {
  return initial_state;
};

const applyChanges = async (state, id, plan_date, type, value) => {
  try {
    const updatingState = getPlanUpdateState(state, id, type, value);

    console.log("updating state is: ", updatingState);

    if (!updatingState) return;

    const response = await updatePlan(id, plan_date, updatingState);

    return response.success;
  } catch (e) {
    console.log("Error while applying changes in plan reducer");
    console.log(e);
    return false;
  }

  return false;
};

const getPlanUpdateState = (state, plan_id, type, value) => {
  const updatingState = { ...state.by_ids[plan_id] };
  updatingState[type] = value;
  return updatingState;
};

export const usePlanReducer = (
  initialState,
  setTotalCount,
  setCompletedCount,
) => {
  const [state, dispatcher] = useReducer(planeReducer, initialState, init);

  const onPlaneChange = async (id, value) => {
    // const success = await applyChanges(state, id, "plane", value);
    // if (success)
      dispatcher({ action_type: Action.UPDATE_PLANE, id: id, value: value });
  };

  const onStatusChange = async (id, value) => {
    const ch_status = !value;
    // const success = await applyChanges(state, id, "status", ch_status);
    // console.log("<<<<<Requeting status value is: ", ch_status);
    // if (success)
      dispatcher({action_type: Action.UPDATE_PLANE_STATUS,id: id,value: ch_status});
  };

  const onStartTimeChange = async (id, value) => {
    // const success = await applyChanges(state, id, "start_time", value);
    // if (success)
      dispatcher({action_type: Action.UPDATE_START_TIME,id: id,value: value});
  };

  const onEndTimeChange = async (id, value) => {
    // const success = await applyChanges(state, id, "end_time", value);
    // if (success)
      dispatcher({ action_type: Action.UPDATE_END_TIME, id: id, value: value });
  };

  const onDescChange = async (id, value) => {
    // const success = await applyChanges(state, id, "description", value);
    // if (success)
      dispatcher({ action_type: Action.UPDATE_DESC, id: id, value: value });
  };

  const changeStatus = async (id, plan_date, value) => {
    const ch_status = !value;
    console.log("Changing status object is: ", state.by_ids[id])
    // dispatcher({action_type: Action.UPDATE_PLANE_STATUS,id: id,value: ch_status});
    const success = await applyChanges(state, id, plan_date, "completed", ch_status);
    if (success) {
      dispatcher({ action_type: Action.UPDATE_PLANE_STATUS, id: id, value: ch_status });
    }
    console.log("<<<<<Requeting status value is: ", ch_status);
  };

  const addNewPlan = async (plan_date, plan) => {
    try {
      const validated_plan = await addPlan(plan_date, plan);

      if (!validated_plan.success) {
        console.log(validated_plan.message);
        return;
      }

      const normalized_plan = NormalizePlan(validated_plan.data);

      dispatcher({ action_type: Action.ADD_PLAN, id: normalized_plan._id, value: normalized_plan });

    } catch (e) {
      console.log("Error while adding daily plan to database")
    }
    
  }

  const deletePlan = async (plan_id) => {
    try {
      const response = await deletePlanById(plan_id);

      if (response.success) {
        dispatcher({ action_type: Action.DELETE_PLAN, id: plan_id });
      }
    } catch (e) {
      console.log("Error while deleting plan from database");
      console.log(e);
    }
  }

  const getPlan = () => {
    return state;
  };

  const getIndividualPlanByIndex = (plan_id) => {
    try {
      return state.by_ids[plan_id];
    } catch (_) {}
  };
  return {
    state,
    onPlaneChange,
    onStatusChange,
    changeStatus,
    onStartTimeChange,
    onEndTimeChange,
    getPlan,
    getIndividualPlanByIndex,
    onDescChange,
    addNewPlan, 
    deletePlan
  };
};
