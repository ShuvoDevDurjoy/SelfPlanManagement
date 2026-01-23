const { useReducer, useState, useEffect } = require("react");
const { updatePlanReducer, UpdatePlanAction } = require("./updatePlanReducer");

const init = (plan) => {
    return plan;
}

export const useUpdatePlanController = (plane_id, getPlanById, updateTitle, updateStartTime, updateEndTime, updateDesc) => {

    const plan = getPlanById(plane_id);

    console.log('plan id: ', plane_id);
    console.log('plan retrieved: ', plan);

    const [updatingPlan, setUpdatingPlan] = useState({
        id: "",
        plane: "", 
        description: "", 
        start_time: "", 
        end_time: "", 
        status: ""
    });

    useEffect(() => { setUpdatingPlan(plan)}, [plan]);
    

    const onTitleChange = (value) => {
        setUpdatingPlan(updatePlanReducer(updatingPlan, {action_type: UpdatePlanAction.UPDATE_PLANE_TITLE, value }));
    }

    const onDescChange = (value) => {
        setUpdatingPlan(updatePlanReducer(updatingPlan, {action_type: UpdatePlanAction.UPDATE_PLANE_DESC, value }));
    }

    const onStartTimeChange = (value) => {
        setUpdatingPlan(updatePlanReducer(updatingPlan, {action_type: UpdatePlanAction.UPDATE_START_TIME, value }));
    }
    
    const onEndTimeChange = (value) => {
        setUpdatingPlan(updatePlanReducer(updatingPlan, {action_type: UpdatePlanAction.UPDATE_END_TIME, value }));
    }

    const onUpdate = () => {
        try {
            updateTitle(plane_id, updatingPlan?.plane);
            updateDesc(plane_id, updatingPlan?.description);
            updateStartTime(plane_id, updatingPlan?.start_time);
            updateEndTime(plane_id, updatingPlan?.end_time);
        } catch (e) {
            return false;
        }

        return true;
    }

    return {
        updatingPlan,
        onTitleChange, 
        onDescChange, 
        onStartTimeChange, 
        onEndTimeChange,
        onUpdate
    }

}