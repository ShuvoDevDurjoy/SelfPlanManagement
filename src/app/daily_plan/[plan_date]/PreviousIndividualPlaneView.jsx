import React from "react";
import { usePlanReducer } from "./usePlane";
import { MdCheck } from "react-icons/md";

const PreviousIndividualPlaneView = ({ plan_id, plan, plan_obj }) => {
  return (
    <div className="plane flex flex-col gap-3">
      <div className="p-2">
        <div className="w-full flex flex-col gap-4">
          {plan.plane_list &&
            plan_obj &&
            plan.plane_list?.map((plane_id, index) => {
              return (
                <div
                  className="flex gap-2 rounded-lg relative shadow-lg origin-center transition-all duration-200 hover:duration-200 hover:-translate-y-0.5"
                  key={`${plane_id}-${index}`}
                >
                  <span
                    className={`block absolute w-1.5 rounded-full h-1.5 content-[''] top-2 right-5 ${plan_obj[plane_id].status === "completed" ? "bg-green-500" : "bg-yellow-500"}`}
                  ></span>
                  <div className="p-1.5">
                    <div className="bg-gray-100 flex items-center justify-center cursor-pointer border-2 border-gray-300 w-6 h-6 aspect-square rounded-full relative">
                      {plan_obj[plane_id].status === "completed" && (
                        <MdCheck></MdCheck>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-1">
                    <div className="py-0.5">
                      <h3 className="font-semibold text-md py-0.5">
                        {plan_obj[plane_id].plane}
                      </h3>
                      <p className="text-gray-400 text-sm py-0.5">
                        {plan_obj[plane_id].description}
                      </p>
                    </div>
                    <div className="py-0.5">
                      <p className="text-gray-500 p-0.5 px-3 inline-block text-sm font-bold relative after:block after:absolute after:w-px after:content-[''] after:bg-gray-400 after:h-full after:right-0 after:top-0">
                        <span>
                          {plan_obj[plane_id].start_time} -{" "}
                          {plan_obj[plane_id].end_time}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PreviousIndividualPlaneView;
