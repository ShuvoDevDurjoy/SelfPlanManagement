export const Action = {
  "UPDATE_PLANE_STATUS": 1,
  "UPDATE_PLANE": 2,
  "UPDATE_START_TIME": 3,
  "UPDATE_END_TIME": 4,
  "UPDATE_DESC": 5,
};

const checkIfExists = (set, id) => {
  return set.has(id);
};

const change = (state, id, type, value) => {
  if (checkIfExists(state.ind_plans.all_ids, id)) {
    return {
      ...state,
      ind_plans: {
        ...state.ind_plans,
        by_ids: {
          ...state.ind_plans.by_ids,
          [id]: {
            ...state.ind_plans.by_ids[id],
            [type]: value,
          },
        },
      },
    };
  } else {
    return {
      ...state,
    };
  }
};

export const planeReducer = (state, action) => {
  // console.log("Plane Reducer is called with action : ", action_type, id);
  switch (action.action_type) {
    case Action.UPDATE_PLANE:
      return change(state, action.id, "plane", action.value);
    case Action.UPDATE_PLANE_STATUS:
      return change(state, action.id, "status", action.value);
    case Action.UPDATE_START_TIME:
      return change(state, action.id, "start_time", action.value);
    case Action.UPDATE_END_TIME:
      return change(state, action.id, "end_time", action.value);
    case Action.UPDATE_DESC:
      return change(state, action.id, "description", action.value);
  }
};
