"use client";
import React, { useEffect, useState } from "react";
import { usePlanReducer } from "../usePlane";
import Filter from "../components/Filter";
import { MdAdd } from "react-icons/md";
import AddPlanView from "../components/AddPlanView";
import IndividualPlanIndex from "../current_plan_views/IndividualPlanIndex";
import { getDateString } from "../planeUtils";
import PreviousIndividualPlan from "./PreviousIndividualPlaneView";

const PreviousPlanView = ({
  initial_state,
  plane_date,
  totalPlan,
  setTotalPlan,
  completedPlan,
  setCompletedPlan,
}) => {
  const [updatePlaneVisible, setUpdatePlaneVisible] = useState(false);
  const [addPlanVisible, setAddPlanVisible] = useState(false);
  const [updatePlanId, setUpdatePlanId] = useState(null);

  const updatePlanView = (value) => {
    setAddPlanVisible(false);
    setUpdatePlaneVisible(value);
  };

  const addPlanView = (value) => {
    setUpdatePlaneVisible(false);
    setAddPlanVisible(value);
  };

  const plane = initial_state;

  useEffect(() => {
    try {
      // Count total plans
      const total_plan = plane?.all_ids?.length || 0;
      setTotalPlan(total_plan);

      // Count completed plans
      let completedPlanCount = 0;
      if (plane && plane.by_ids) {
        Object.entries(plane.by_ids).forEach(([key, val]) => {
          if (val.completed) {
            completedPlanCount++;
          }
        });
      }

      setCompletedPlan(completedPlanCount);
    } catch (e) {
      console.error("Error counting plans:", e);
    }
  }, [plane]);

  const [filter, setFilter] = useState("all");
  const [timefilter, setTimefilter] = useState("all");

  return (
    <div className="w-full h-full flex flex-col bg-linear-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {plane ? (
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-linear-30 from-blue-400 to-fuchsia-400 shadow-xl">
            <div className="px-6 py-8 text-white">
              <h1 className="text-5xl font-bold mb-2">
                {getDateString(plane_date)}
              </h1>
              <div className="flex items-center gap-8 mt-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <p className="text-sm text-blue-100 font-semibold">
                    Total Plans
                  </p>
                  <p className="text-3xl font-bold">{totalPlan}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <p className="text-sm text-blue-100 font-semibold">
                    Completed
                  </p>
                  <p className="text-3xl font-bold">{completedPlan}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <p className="text-sm text-blue-100 font-semibold">
                    Progress
                  </p>
                  <p className="text-3xl font-bold">
                    {totalPlan > 0
                      ? Math.round((completedPlan / totalPlan) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative overflow-y-auto flex-1 custom-scrollbar">
            <Filter
              filter={filter}
              timeFilter={timefilter}
              setFilter={setFilter}
              setTimefilter={setTimefilter}
            ></Filter>
            <div className="flex flex-col p-6 gap-4">
              <PreviousIndividualPlan
                plan={plane}
                plan_date={plane_date}
                filter={filter}
                timeFilter={timefilter}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 text-lg font-semibold">No Plan Found</p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          addPlanView(true);
        }}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-linear-to-br from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-30 group"
      >
        <MdAdd className="w-8 h-8 cursor-pointer group-hover:rotate-90 transition-transform duration-300"></MdAdd>
      </button>
    </div>
  );
};

export default PreviousPlanView;
