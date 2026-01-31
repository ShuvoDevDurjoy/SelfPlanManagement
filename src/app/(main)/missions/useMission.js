const { useReducer } = require("react")
const { missionReducer, missionActionType } = require("./missionReducer")


const useMission = (initialState) => {


    const [state, dispatcher] = useReducer(missionReducer, initialState);

    const onUpdate = (mission)=>{
        if (mission) {
            dispatcher({ type: missionActionType.UPDATE_MISSION, mission: mission });
        }
    }

    const onAddMission = (mission) => {
        if (mission) {
            dispatcher({ type: missionActionType.ADD_MISSION, mission: mission });
        }
    }

    const onDeleteMission = (mission) => {
        if (mission) {
            dispatcher({ type: missionActionType.DELETE_MISSION, mission: mission });
        }
    }

    return {
        state, onAddMission, onUpdate, onDeleteMission
    }
}

export default useMission;