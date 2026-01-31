export const missionActionType = {
  ADD_MISSION: 1,
  DELETE_MISSION: 10,
  UPDATE_MISSION: 20,
};

const addMissionToState = (state, mission) => {
    if (!mission) return state;
    const initialState = [ ...state ];
    initialState.push(mission);
    return initialState;
}

const deleteMissionFromState = (state, mission_id)=>{
    if (!mission_id) return state;
    const initialState = [ ...state ];

    const missionAfterDeletion = initialState.filter((m => m._id != mission_id));

    return missionAfterDeletion;
}

const updateMissionFromState = (state, mission) => {
  if (!mission) return state;

  console.log("Updating mission id in dispathcher is: ", mission);

  return state.map((m) => (m._id === mission._id ? { ...m, ...mission } : m));
};

export const missionReducer = (state, action) => {
  switch (action.type) {
    case missionActionType.ADD_MISSION:
      return addMissionToState(state, action.mission);

    case missionActionType.DELETE_MISSION:
      return deleteMissionFromState(state, action.mission);

    case missionActionType.UPDATE_MISSION:
      return updateMissionFromState(state, action.mission);

    default:
      return state;
  }
};
