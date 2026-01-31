import React, { useEffect, useState } from "react";
import { getMissionById, updateMission } from "./missionController";
import { MdClose } from "react-icons/md";

const UpdateMission = ({
  updateMissionId,
  handleShowUpdatePane,
  onUpdateMission,
}) => {
  console.log("updating mission id is: ", updateMissionId);

  const [mission, setMission] = useState(null);

  const getMissionAndSet = async (mission_id) => {
    console.log("mission id to fetch: ", mission_id);
    const response = await getMissionById(mission_id);

    console.log(response);

    if (response.success) {
      setMission(response.mission);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Mission data submitted:", mission);
    const response = await updateMission(updateMissionId, mission);

    if (response.success) {
      console.log("Request successfull to add mission");
      onUpdateMission(response.mission);
      setMission({
        name: "",
        description: "",
        icon: "MdCheck",
        color: "#00ff00",
        start_time: "",
        end_time: "",
      });
      handleShowUpdatePane(null);
    } else {
      console.log(response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getMissionAndSet(updateMissionId);
  }, []);

  return (
    updateMissionId &&
    mission && (
      <div className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-white/10 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-6 relative max-h-[95%] overflow-y-scroll custom-scrollbar">
          <div
            onClick={() => {
              handleShowUpdatePane(null);
            }}
            className="absolute cursor-pointer group top-3 right-3 p-1 w-7 aspect-square bg-gray-300 rounded-full text-gray-500 hover:text-gray-800 font-bold text-xl"
          >
            <MdClose className="group-hover:rotate-90 w-full h-full transition-all duration-200 group-hover:duration-200"></MdClose>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center py-2 after:block after:absolute relative after:w-full after:h-0.5 after:rounded-full after:content-[''] after:bottom-0 after:bg-gray-400">
            {"Update Mission"}
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
              {"Update Mission"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateMission;
