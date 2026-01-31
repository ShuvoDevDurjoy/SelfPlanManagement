
export const UpdatePlanAction = {
  "UPDATE_PLANE_TITLE": 1,
  "UPDATE_PLANE_DESC": 2,
  "UPDATE_START_TIME": 3,
  "UPDATE_END_TIME": 4,
};

const convertTimeToDateTime = (previous_date_time, time)=>{
    try {
        const date = new Date(previous_date_time);
        const [hour, minute] = time.split(":");

        date.setHours(hour);
        date.setMinutes(minute);

        return date;
    } catch (e) {
        console.log("Error in the convert time to data time ");

        return new Date(previous_date_time);
    }
}

export function updatePlanReducer(state, action) {
    switch (action.action_type) {
        case UpdatePlanAction.UPDATE_PLANE_TITLE:
            return {
                ...state, 
                ["title"]: action.value
            }
            break;
        case UpdatePlanAction.UPDATE_PLANE_DESC:
            return {
                ...state, 
                ["description"]: action.value
            }
            break;
        case UpdatePlanAction.UPDATE_START_TIME:
            const start_time = convertTimeToDateTime(state.start_time, action.value);
            console.log(start_time);
            return {
                ...state, 
                ["start_time"]: action.value
            }
            break;
        case UpdatePlanAction.UPDATE_END_TIME:
            const end_time = convertTimeToDateTime(state.end_time, action.value);
            console.log(end_time);
            return {
                ...state, 
                ["end_time"]: action.value
            }
            break;
        default:
            return state;
    }
}