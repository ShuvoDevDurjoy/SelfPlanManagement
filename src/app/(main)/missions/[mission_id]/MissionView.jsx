"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  completedTaskCount,
  createMilestone,
  createTask,
  DeleteMilestone,
  DeleteTask,
  getMilestoneWithTask,
  updateMilestone,
  updateTask,
} from "./milestoneController";
import { MdAdd } from "react-icons/md";
import AddTask from "./AddTask";
import { MissionHeader } from "./component/MissionHeader";
import { getLocalDateTimeString, getLocalTimeString } from "./validation";
import { MilestoneView } from "./MilestoneView";
import { AddOrEditMilestone } from "./AddOrEditMilestone";
import { useMileston } from "./useMilestone";

const MissionView = ({ mission_id, initial_data }) => {
  const [milestone, setMilestone] = useState();
  const [progress, setProgress] = useState(0);

  const defaultInitial = {
    id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    completed: false
  };

  const [ui, setUI] = useState({
    type: "",
    mode: "",
    id: "",
    initialObject: { ...defaultInitial },
  });

  const handleMShow = (mode, id, initial = { ...defaultInitial }) => {
    setUI({
      type: "milestone",
      mode,
      id,
      initialObject: { ...initial },
    });
  };

  const handleTShow = (mode, id, initial = { ...defaultInitial }) => {
    setUI({
      type: "task",
      mode,
      id,
      initialObject: { ...initial },
    });
  };

  const onClose = () => {
    setUI({
      type: "",
      mode: "",
      id: "",
      initialObject: { ...defaultInitial },
    });
  };

  const {
    state,
    onCreateMilestone,
    onUpdateMilestone,
    onCreateTask,
    onUpdateTask,
    onDeleteMilestone,
    onDeleteTask,
  } = useMileston(initial_data);

  const onMilestoneDeleted = async (milestone_id) => {
    try {
      const response = await DeleteMilestone(
        mission_id,
        milestone_id,
        onDeleteMilestone,
      );
    } catch (e) {
      return {
        success: false,
      };
    }
  };

  const onTaskDeleted = async (milestone_id, task_id) => {
    try {
      const response = await DeleteTask(
        mission_id,
        milestone_id,
        task_id,
        onDeleteTask,
      );
    } catch (e) {
      return {
        success: false,
      };
    }
  };

  const onMilestoneCreated = async (mission_id, milestone) => {
    try {
      console.log("Here trying to create");
      const response = await createMilestone(
        mission_id,
        milestone,
        onCreateMilestone,
      );
    } catch (e) {
      console.log("Error while creating milestone");
    }
  };

  const onTaskCreated = async (milestone_id, task) => {
    try {
      const response = await createTask(
        mission_id,
        milestone_id,
        task,
        onCreateTask,
      );
    } catch (e) {
      console.log("This is adding task");
    }
  };

  const onTaskUpdate = async (milestone_id, task) => {
    try {
      const response = await updateTask(
        mission_id,
        milestone_id,
        task,
        onUpdateTask,
      );
    } catch (e) {
      console.log("This is Updating task");
    }
  };

  const onMilestoneUpdated = async (mission_id, milestone) => {
    try {
      const response = await updateMilestone(
        mission_id,
        milestone,
        onUpdateMilestone,
      );
    } catch (e) {
      console.log("Error while updating the milestone");
    }
  };

  useEffect(() => {
    if (state) {
      setMilestone(state);
      const completedCount = completedTaskCount(state.tasks_by_ids);
      const totalCount = state.tasks_ids.length;
      const progress = totalCount === 0 ? 0 : (completedCount / totalCount * 100);
      setProgress(progress);
    }
  }, [state]);

  const getSubmitHandler = () => {
    if (ui.type === "milestone") {
      if (ui.mode === "edit") {
        return onMilestoneUpdated;
      } else if (ui.mode === "add") {
        console.log("This si add");
        return onMilestoneCreated;
      }
    } else if (ui.type == "task") {
      if (ui.mode === "add") {
        return onTaskCreated;
      } else if (ui.mode === "edit") {
        return onTaskUpdate;
      }
    }
  };

  return (
    <div className="misson_milestone_container w-full h-full overflow-y-auto custom-scrollbar">
      <AddOrEditMilestone
        visible={ui.type === "milestone" || ui.type === "task"}
        mode={ui.mode}
        type={ui.type}
        id={ui.id}
        initial={ui.initialObject}
        onClose={onClose}
        onSubmit={getSubmitHandler()}
      ></AddOrEditMilestone>
      <AddTask></AddTask>
      {milestone && (
        <div>
          <MissionHeader
            title={milestone.name}
            description={milestone.description}
            startTime={getLocalDateTimeString(milestone.start_time)}
            endTime={getLocalDateTimeString(milestone.end_time)}
            progress={progress}
          ></MissionHeader>
          <div className="milestone_container p-3 flex flex-col gap-4">
            {milestone.milestone_ids.map((id, index) => {
              return (
                <div key={id}>
                  <MilestoneView
                    mission_id={mission_id}
                    onUpdateHandler={handleMShow}
                    onTaskAddHandler={handleTShow}
                    onChangeMilestoneStatus={onMilestoneUpdated}
                    onChangeTaskStatus={onTaskUpdate}
                    onClose={onClose}
                    milestone={milestone.milestone_by_ids[id]}
                    tasks={milestone.tasks_by_ids}
                    onMilestoneDeleted={onMilestoneDeleted}
                    onTaskDeleted={onTaskDeleted}
                  ></MilestoneView>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        className="w-15 h-15 p-2 rounded-full z-20 absolute bottom-5 bg-linear-to-br from-purple-500 to-pink-400 hover:scale-105 duration-400 hover:duration-400 cursor-pointer group right-5"
        onClick={() => {
          handleMShow("add", mission_id);
        }}
      >
        <MdAdd className="w-full h-full text-white group-hover:rotate-180 duration-400 hover:duration-500"></MdAdd>
      </div>
    </div>
  );
};

export default MissionView;
