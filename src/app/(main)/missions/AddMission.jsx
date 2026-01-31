"use client";
import React, { useEffect, useState } from "react";
import { addMission, getMissionById } from "./missionController";
import { MdClose } from "react-icons/md";

const AddMission = ({
  mission_id,
  showAdd,
  handleShowAddPane,
  onAddMission,
}) => {
  const [mission, setMission] = useState({
    name: "",
    description: "",
    icon: "MdPendingActions",
    color: "#00ff00",
    start_time: "",
    end_time: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission((prev) => ({ ...prev, [name]: value }));
  };

  // Close modal
  const handleClose = () => handleShowAddPane(false);

  // Submit (you can call your API here)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Mission data submitted:", mission);
    const response = await addMission(mission);

    if (response.success) {
      console.log("Request successfull to add mission");
      onAddMission(response.mission);
      setMission({
        name: "",
        description: "",
        icon: "MdPendingActions",
        color: "#00ff00",
        start_time: "",
        end_time: "",
      });
      handleClose();
    } else {
      console.log(response);
    }
  };

  if (!showAdd) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 relative max-h-[95%] overflow-y-scroll custom-scrollbar">
        <div
          onClick={() => {
            handleShowAddPane(false);
          }}
          className="absolute cursor-pointer group top-3 right-3 p-1 w-7 aspect-square bg-gray-300 rounded-full text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          <MdClose className="group-hover:rotate-90 w-full h-full transition-all duration-200 group-hover:duration-200"></MdClose>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center py-2 after:block after:absolute relative after:w-full after:h-0.5 after:rounded-full after:content-[''] after:bottom-0 after:bg-gray-400">
          {"Add Mission"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center gap-2 justify-between">
            <label className="py-2 text-sm text-gray-600 font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={mission.name}
              onChange={handleChange}
              className="border-2 border-gray-300 outline-gray-400 p-2 min-w-125 text-md tracking-wider text-gray-700"
              required
            />
          </div>

          <div className="flex items-center gap-2 justify-between">
            <label className="py-2 text-sm text-gray-600 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={mission.description}
              onChange={handleChange}
              className="border-2 border-gray-300 outline-gray-400 p-2 min-w-125 text-md tracking-wider text-gray-700"
            />
          </div>

          <div className="flex gap-2 justify-between">
            <label className="py-2 text-sm text-gray-600 font-semibold">
              Icon
            </label>
            <select
              name="icon"
              value={mission.icon}
              onChange={handleChange}
              className="border-2 border-gray-300 outline-gray-400 p-2 min-w-125 text-md tracking-wider text-gray-700"
            >
              <option value="MdCheck">Check</option>
              <option value="MdPendingActions">Pending</option>
              <option value="GrInProgress">Ongoing</option>
              <option value="MdCheckCircle">Check Circle</option>
              <option value="MdFlag">Flag</option>
              <option value="MdStar">Star</option>
              <option value="MdRocket">Rocket</option>
              <option value="MdTrendingUp">Trending Up</option>
              <option value="MdAccessTime">Access Time</option>
            </select>
          </div>

          <div className="flex items-center gap-2 justify-evenly">
            <label className="py-2 text-sm text-gray-600 font-semibold">
              Color
            </label>
            <input
              type="color"
              name="color"
              value={mission.color}
              onChange={handleChange}
              className="w-16 h-10 border rounded p-0"
            />
          </div>

          <div className="flex items-center gap-2 justify-between">
            <label className="py-2 text-sm text-gray-600 font-semibold">
              Start Time
            </label>
            <input
              type="datetime-local"
              name="start_time"
              value={mission.start_time}
              onChange={handleChange}
              className="border-2 border-gray-300 outline-gray-400 p-2 min-w-125 text-md tracking-wider text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="py-2 text-sm text-gray-600 font-semibold">
              End Time
            </label>
            <input
              type="datetime-local"
              name="end_time"
              value={mission.end_time}
              onChange={handleChange}
              className="border-2 border-gray-300 outline-gray-400 p-2 min-w-125 text-md tracking-wider text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {mission_id ? "Update Mission" : "Add Mission"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMission;
