import React from 'react'
import { MdCheck, MdEdit } from 'react-icons/md';

const IndividualPlanIndex = ({ plane_id, plane, list_key, setUpdatePlanId, setUpdatePlaneVisible, onStatusChange, filter, timeFilter }) => {
  
  let should_show = true;

  const plan = plane.ind_plans.by_ids[plane_id];
  if (!plan) return;

  // console.log("found paln", plan);

  if (filter != "all") {
    should_show = filter === plan.status;
  }

  if (should_show && timeFilter != "all") {
    should_show = timeFilter === plan.plan_time_status;
  }

  const editable = plan.plan_time_status !== "past";


  // console.log("show should");

  if (!should_show) return;



  return (
    should_show && (
      <div
        className="flex my-2 gap-2 group rounded-lg relative shadow-lg origin-center transition-all duration-200 hover:duration-200 hover:-translate-y-0.5"
        key={list_key}
      >
        <div className="absolute right-0 bottom-0 p-3">
          {editable && (
            <div
              className="p-2 bg-gray-300 rounded-full aspect-square cursor-pointer group-hover:opacity-100 opacity-0 duration-200 group-hover:duration-200 transition-all"
              onClick={() => {
                setUpdatePlanId(plane_id);
                setUpdatePlaneVisible(true);
              }}
            >
              <MdEdit></MdEdit>
            </div>
          )}
        </div>
        <span
          className={`block absolute w-2 rounded-full h-2 content-[''] top-2 right-5 ${plane.ind_plans.by_ids[plane_id]?.status === "completed" ? "bg-green-500" : plane.ind_plans.by_ids[plane_id].plan_time_status === "upcoming"?"bg-yellow-300": "bg-red-500"}`}
        ></span>
        <div className="p-1.5">
          <div
            className="bg-gray-100 flex items-center justify-center cursor-pointer border-2 border-gray-300 w-6 h-6 aspect-square rounded-full relative"
            onClick={(e) => {
              onStatusChange(plane_id, plane.ind_plans.by_ids[plane_id].status);
            }}
          >
            {plane.ind_plans.by_ids[plane_id]?.status === "completed" && (
              <MdCheck></MdCheck>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 p-1">
          <div className="py-0.5">
            <h3
              className={`font-semibold text-md py-0.5 ${plane.ind_plans.by_ids[plane_id].status === "completed" ? "line-through text-gray-500" : "color-black"}`}
            >
              {plane.ind_plans.by_ids[plane_id]?.plane}
            </h3>
            <p
              className={`text-gray-400 text-sm py-0.5 ${plane.ind_plans.by_ids[plane_id].status === "completed" ? "line-through" : ""}`}
            >
              {plane.ind_plans.by_ids[plane_id]?.description}
            </p>
          </div>
          <div className="py-0.5">
            <p className="text-gray-500 p-0.5 px-3 inline-block text-sm font-bold relative after:block after:absolute after:w-px after:content-[''] after:bg-gray-400 after:h-full after:right-0 after:top-0">
              <span>
                {plane.ind_plans.by_ids[plane_id]?.start_time} -{" "}
                {plane.ind_plans.by_ids[plane_id]?.end_time}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default IndividualPlanIndex
