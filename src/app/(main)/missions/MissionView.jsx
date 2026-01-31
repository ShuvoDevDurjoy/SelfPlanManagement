import React, { useEffect, useState } from "react";
import {
  MdCheckCircle,
  MdPendingActions,
  MdAccessTime,
  MdTrendingUp,
  MdStar,
  MdRocket,
  MdFlag,
  MdCheck,
  MdAdd,
  MdUpdate,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import AddMission from "./AddMission";
import useMission from "./useMission";
import UpdateMission from "./UpdateMission";
import { deleteMission } from "./missionController";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getLocalDateTimeString, getLocalTimeString } from "./[mission_id]/validation";

// Map DB icon strings to actual React components
const ICONS = {
  MdCheckCircle,
  MdPendingActions,
  GrInProgress,
  MdAccessTime,
  MdTrendingUp,
  MdStar,
  MdRocket,
  MdFlag,
  MdCheck,
};

const getStatusBadge = (status) => {
  const badges = {
    completed: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "✓ Completed",
    },
    "in-progress": {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "⟳ In Progress",
    },
    "not-started": {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: "○ Not Started",
    },
  };
  return badges[status] || badges["not-started"];
};

const MissionView = ({
  missions,
  showAdd,
  handleShowAddPane,
  updateMissionId,
  handleShowUpdatePane,
}) => {
  const { state, onAddMission, onUpdate, onDeleteMission } =
    useMission(missions);

  const router = useRouter();

  const updateButtonClicked = (mission_id) => {
    if (!mission_id) return;
    handleShowUpdatePane(mission_id);
    console.log("the mission id that is being set is: ", mission_id);
  };

  const deleteButtonClicked = async (mission_id) => {
    if (!mission_id) return;
    const response = await deleteMission(mission_id);
    if (response.success) {
      onDeleteMission(mission_id);
    }
  };

  console.log(missions);
  console.log("state is: ", state);

  return (
    <div className="relative w-full h-full overflow-y-scroll min-h-screen bg-gray-100 custom-scrollbar">
      {/* Header */}
      <div className=" shadow-md top-0 z-40">
        <div className="p-5 text-cyan-600 max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-semibold mb-1">Missions</h1>
              <p className="text-gray-400 text-md">
                Track and complete your personal goals and missions
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg">
              <MdFlag className="w-12 h-12 text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      <AddMission
        showAdd={showAdd}
        handleShowAddPane={handleShowAddPane}
        onAddMission={onAddMission}
      ></AddMission>

      {updateMissionId && (
        <UpdateMission
          updateMissionId={updateMissionId}
          handleShowUpdatePane={handleShowUpdatePane}
          onUpdateMission={onUpdate}
        ></UpdateMission>
      )}

      {/* Content */}
      <div className="px-3 py-6 max-w-7xl mx-auto">
        {/* Missions Grid */}
        <div className="flex flex-wrap gap-3">
          {state.map((mission) => {
            const Icon = ICONS[mission.icon] || MdFlag;
            const statusBadge = getStatusBadge(mission.status);

            return (
              <div
                key={mission._id}
                className="rounded-xl max-w-75 group relative flex flex-col gap-2 justify-between p-4 border-2  border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:duration-300 hover:-translate-y-px transform cursor-pointer group"
              >
                <div
                  className="absolute top-2 right-2 w-8 rounded-full aspect-square p-2 bg-white/40 backdrop-blur-md z-10 hidden group-hover:block"
                  onClick={() => {
                    updateButtonClicked(mission._id);
                  }}
                >
                  <MdEdit className="text-gray-500 w-full h-full"></MdEdit>
                </div>
                <div
                  className="absolute top-2 left-2 w-8 rounded-full aspect-square p-2 bg-white/40 backdrop-blur-md z-10 hidden group-hover:block"
                  onClick={() => {
                    deleteButtonClicked(mission._id);
                  }}
                >
                  <MdDelete className="text-gray-500 w-full h-full"></MdDelete>
                </div>
                {/* Mission Card Header */}
                <div className="flex items-center relative overflow-hidden w-full mb-2 justify-between">
                  <div
                    className="rounded-full"
                    style={{ backgroundColor: mission.color }}
                  >
                    <Icon className="w-10 h-10 p-2 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="w-10 h-10 items-center flex justify-center content-center p-2 bg-gray-300 rounded-full">
                    <p
                      className="rounded-full text-xl font-bold bg-gray-300"
                      style={{ color: mission.color }}
                    >
                      {mission.milestones.length}
                    </p>
                  </div>
                </div>

                {/* Mission Card Body */}
                <div className="flex flex-col justify-between">
                  <Link
                    className="text-2xl font-bold mb-2 hover:underline"
                    style={{ color: mission.color }}
                    href={`/missions/${mission._id}`}
                  >
                    {mission.name}
                  </Link>
                  <p className="text-gray-500 block text-sm mb-2">
                    {mission.description || (
                      <span className="text-gray-400">No Description</span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2">
                    <p className="font-semibold whitespace-nowrap text-gray-600">Start Time:</p>
                    <span className="text-sm text-gray-400">
                      {mission.start_time? getLocalDateTimeString(mission.start_time): "Not specified"}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <p className="font-semibold whitespace-nowrap text-gray-600">End Time:</p>
                    <span className="text-sm text-gray-400">
                      {mission.end_time?getLocalDateTimeString(mission.end_time):"Not specified"}
                    </span>
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {missions.length === 0 && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-gray-500 text-lg font-semibold">
                No missions yet
              </p>
              <p className="text-gray-400 mt-2">
                Create your first mission to get started
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        className="bg-purple-500 fixed group bottom-5  right-5 w-15 p-2 aspect-square rounded-full"
        onClick={() => {
          handleShowAddPane(true);
        }}
      >
        <MdAdd className="w-full h-full text-white transition-all group-hover:rotate-90 duration-200 group-hover:duration-200 cursor-pointer"></MdAdd>
      </div>
    </div>
  );
};

export default MissionView;
