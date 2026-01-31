import { useReducer } from "react";
import { MilestoneActionTypes, MilestoneReducer } from "./milestoneReducer";


export function useMileston(initialData){
    

    const [state, dispatcher] = useReducer(MilestoneReducer, initialData);

    const onCreateMilestone = (milestone) => {
        dispatcher({ type: MilestoneActionTypes.CREATE_MILESTONE, milestone: milestone });
    }

    const onUpdateMilestone = (milestone) => {
        dispatcher({type: MilestoneActionTypes.UPDATE_MILESTONE, milestone_id: milestone._id, milestone: milestone})
    }

    const onCreateTask = (milestone_id, task) => {
        console.log("This is creating task");
        dispatcher({ type: MilestoneActionTypes.CREATE_TASK, milestone_id, task: task });
    }

    const onUpdateTask = (task) => {
        console.log("Updating task requested", task)
        dispatcher({ type: MilestoneActionTypes.UPDATE_TASK, task_id: task._id, task: task });
    }

    const onDeleteMilestone = (id) => {
        console.log("delete requested", id);
        dispatcher({ type: MilestoneActionTypes.DELETE_MILESTONE, milestone_id: id });
    }

    const onDeleteTask = (milestone_id, id) => {
        console.log("delete task requsetd")
        dispatcher({ type: MilestoneActionTypes.DELETE_TASK, milestone_id: milestone_id, id: id });
    }

    

    return {
        state, 
        onCreateMilestone, 
        onUpdateMilestone,
        onCreateTask, 
        onUpdateTask, 
        onDeleteMilestone, 
        onDeleteTask
    }
}