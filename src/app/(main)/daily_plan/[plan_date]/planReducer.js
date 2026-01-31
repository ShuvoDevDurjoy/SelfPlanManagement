import { updatePlan } from "./planeUtils";

export const Action = {
  "UPDATE_PLANE_STATUS": 1,
  "UPDATE_PLANE": 2,
  "UPDATE_START_TIME": 3,
  "UPDATE_END_TIME": 4,
  "UPDATE_DESC": 5,

  "ADD_PLAN": 20,

  "DELETE_PLAN": 30
};

const checkIfExists = (set, id) => {
  const idSet = new Set(set);
  return idSet.has(id);
};

const change = (state, id, type, value) => {
  if (checkIfExists(state.all_ids, id)) {

    console.log("State Object is: ", state)
    const changingstate =  {
      ...state,
      by_ids: {
        ...state.by_ids, 
        [id]: {
          ...state.by_ids[id], 
          [type]: value
        }
      }
    };
    console.log("Changing State is: ", changingstate);
    return changingstate;
  } else {
    return {
      ...state,
    };
  }
};

const rollback = (state) => {
  return {
    ...state
  }
}


export const planeReducer = (state, action) => {
  // console.log("Plane Reducer is called with action : ", action_type, id);
  switch (action.action_type) {
    case Action.UPDATE_PLANE:
      return change(state, action.id, "title", action.value);
    case Action.UPDATE_PLANE_STATUS:
      return change(state, action.id, "completed", action.value);
    case Action.UPDATE_START_TIME:
      return change(state, action.id, "start_time", action.value);
    case Action.UPDATE_END_TIME:
      return change(state, action.id, "end_time", action.value);
    case Action.UPDATE_DESC:
      return change(state, action.id, "description", action.value);
    case Action.ADD_PLAN:
      return {
        ...state,
        all_ids: [...state.all_ids, action.id],
        by_ids: {
          ...state.by_ids,
          [action.id]: action.value
        }
      };
    case Action.DELETE_PLAN:
      if (checkIfExists(state.all_ids, action.id)) {
        const updatedByIds = { ...state.by_ids };
        delete updatedByIds[action.id];
        return {
          ...state,
          all_ids: state.all_ids.filter(id => id !== action.id),
          by_ids: updatedByIds
        };
      }
      return state;
    default:
      return state;
  }
};