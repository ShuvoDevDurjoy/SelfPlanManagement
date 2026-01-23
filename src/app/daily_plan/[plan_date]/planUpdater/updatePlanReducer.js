
export const UpdatePlanAction = {
  "UPDATE_PLANE_TITLE": 1,
  "UPDATE_PLANE_DESC": 2,
  "UPDATE_START_TIME": 3,
  "UPDATE_END_TIME": 4,
};

export function updatePlanReducer(state, action) {
    switch (action.action_type) {
        case UpdatePlanAction.UPDATE_PLANE_TITLE:
            return {
                ...state, 
                ["plane"]: action.value
            }
            break;
        case UpdatePlanAction.UPDATE_PLANE_DESC:
            return {
                ...state, 
                ["description"]: action.value
            }
            break;
        case UpdatePlanAction.UPDATE_START_TIME:
            return {
                ...state, 
                ["start_time"]: action.value
            }
            break;
        case UpdatePlanAction.UPDATE_END_TIME:
            return {
                ...state, 
                ["end_time"]: action.value
            }
            break;
        default:
            return state;
    }
}