import { validateDailyPlan } from "@/validations/validation";
import { NormalizePlan, updatePlan, validatePlan } from "../planeUtils";

const { useReducer, useState, useEffect } = require("react");
const { updatePlanReducer, UpdatePlanAction } = require("./updatePlanReducer");

const init = (plan) => {
    return plan;
}

export const useUpdatePlanController = (plane_id, plan_date, getPlanById, updateTitle, updateStartTime, updateEndTime, updateDesc) => {

    const plan = getPlanById(plane_id);

    const [updatingPlan, setUpdatingPlan] = useState({
        _id: "",
        title: "", 
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

    const onUpdate = async () => {
        try {

            const response = await updatePlan(plane_id, plan_date, updatingPlan);
            if (!response || !response.success) {
                return false;
            }
            console.log(response.data);
            
            const normalized_plan = NormalizePlan(response.data);
            if (response.success) {
                updateTitle(plane_id, normalized_plan.title);
                updateDesc(plane_id, normalized_plan.description);
                updateStartTime(plane_id, normalized_plan.start_time);
                updateEndTime(plane_id, normalized_plan.end_time);
                updateStatus(plane_id, normalized_plan.status);
            }

            return true
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