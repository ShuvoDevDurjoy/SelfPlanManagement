const { useReducer } = require("react")
const { planeReducer, Action } = require("./planReducer")

const init = (initial_state) => {
    return initial_state;
}

export const usePlanReducer = (initialState) => {    
    const [ state, dispatcher ] = useReducer(planeReducer, initialState, init);

    const onPlaneChange = (id, value) => {
        dispatcher({action_type: Action.UPDATE_PLANE, id: id, value: value});
    }

    const onStatusChange = (id, value) => {
        const ch_status = (value == "completed") ? "not-completed" : "completed";
        dispatcher({action_type: Action.UPDATE_PLANE_STATUS, id: id, value: ch_status})
    }

    const onStartTimeChange = (id, value) => {
        dispatcher({ action_type: Action.UPDATE_START_TIME, id: id, value: value });
    }

    const onEndTimeChange = (id, value) => {
        dispatcher({ action_type: Action.UPDATE_END_TIME, id: id, value: value });
    }

    const onDescChange = (id, value) => {
        dispatcher({ action_type: Action.UPDATE_DESC, id: id, value: value });
    }

    const getPlan = () => {
        return state;
    }

    const getIndividualPlanByIndex = (plan_id)=>{
        try {
            return state.ind_plans.by_ids[plan_id];
        } catch (_) {
            
        }
    }
    return {
        state,
        onPlaneChange,
        onStatusChange, 
        onStartTimeChange, 
        onEndTimeChange,
        getPlan, 
        getIndividualPlanByIndex,
        onDescChange
    }
}  