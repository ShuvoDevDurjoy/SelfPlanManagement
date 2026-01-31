import React from "react";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";

const PreviousIndividualPlanIndex = ({
  plane,
  plan_date,
  list_key,
  filter,
  timeFilter,
}) => {
  let should_show = true;

  if (!plane) return;

  if (filter != "all") {
    should_show = filter === plane.status;
  }

  if (should_show && timeFilter != "all") {
    should_show = timeFilter === plane.plan_time_status;
  }


  if (!should_show) return;

  return (
    should_show && (
      <div
        className="flex my-2 gap-2 group rounded-lg relative shadow-lg origin-center transition-all duration-200 hover:duration-200 hover:-translate-y-0.5"
        key={list_key}
      >
        <div className="absolute right-0 bottom-0 p-3">
        </div>
        <span
          className={`block absolute w-2 rounded-full h-2 content-[''] top-2 right-5 ${plane.status === "completed" ? "bg-green-500" : plane.plan_time_status === "upcoming" ? "bg-yellow-300" : "bg-red-500"}`}
        ></span>
        <div className="flex flex-col gap-1 p-1">
          <div className="py-0.5">
            <h3
              className={`font-semibold text-md py-0.5 ${plane.completed ? "line-through text-gray-500" : "color-black"}`}
            >
              {plane.title}
            </h3>
            <p
              className={`text-gray-400 text-sm py-0.5 ${plane.completed ? "line-through" : ""}`}
            >
              {plane.description}
            </p>
          </div>
          <div className="py-0.5">
            <p className="text-gray-500 p-0.5 px-3 inline-block text-sm font-bold relative after:block after:absolute after:w-px after:content-[''] after:bg-gray-400 after:h-full after:right-0 after:top-0">
              <span>
                {plane.start_time} - {plane.end_time}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default PreviousIndividualPlanIndex;
