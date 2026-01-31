"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getDailyPlaneById, getPlan, NormalizeDailyPlaneById } from "./planeUtils";
import PlaneView from "./current_plan_views/PlaneView";
import PreviousIndividualPlaneView from "./previous_plan_views/PreviousIndividualPlaneView";
import PreviousPlanView from "./previous_plan_views/PreviousPlanView";
import { daily_plane } from "@/data/daily_plane";

const page = () => {
  var { plan_date } = useParams();


  const [totalPlan, setTotalPlan] = useState(0);
  const [completedPlan, setCompletedPlan] = useState(0);

  const [day_flag, setDayFlag] = useState(0);

  const [initialState, setInitialState] = useState();
  const [date, setDate] = useState();

  async function setDailyPlaneState() {
    const daily_planes = await getPlan(plan_date);
    if (daily_planes && daily_planes.success) {
      const normalized_plane = NormalizeDailyPlaneById(
      daily_planes.tasks,
      setTotalPlan,
      setCompletedPlan,
      );
    if (normalized_plane) setInitialState(normalized_plane);
    }
    
  }

  function normalize(d) {
    return new Date(d.getFullYear(), parseInt(d.getMonth()), d.getDate());
  }

  useEffect(() => {
    setDailyPlaneState();
  }, [date]);

  useEffect(() => {
    if (!plan_date) return;
    const date = plan_date.split("-");
    const today = normalize(new Date());
    const target = normalize(new Date(date[0], parseInt(date[1]) - 1, date[2]));
    const date_to_set = target.toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      },
    );
    setDate(date_to_set);

    if (target < today) {
      setDayFlag(0);
    } else if (target > today) {
      setDayFlag(2);
    } else {
      setDayFlag(1);
    }
  }, [plan_date]);

  if (day_flag == 0) {
    return <PreviousPlanView plane_date={plan_date} plan={initialState} initial_state={initialState} total_plan={totalPlan} completedPlan={completedPlan} setTotalPlan={setTotalPlan} setCompletedPlan={setCompletedPlan} />;
  } else{
    return initialState ? (
      <PlaneView
        initial_state={initialState}
        plane_date={plan_date}
        totalPlan={totalPlan}
        setTotalPlan={setTotalPlan}
        completedPlan={completedPlan}
        setCompletedPlan={setCompletedPlan}
      />
    ) : (
      <div className="flex flex-col items-center justify-center w-full h-full bg-linear-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center">
          <div className="inline-block p-4 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-800">Loading your plans...</p>
          <p className="text-gray-500 mt-2">Getting everything ready for you</p>
        </div>
      </div>
    );
  } 
};

export default page;
