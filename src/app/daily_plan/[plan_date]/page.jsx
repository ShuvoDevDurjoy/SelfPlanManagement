"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getDailyPlaneById, NormalizeDailyPlaneById } from "./planeUtils";
import PlaneView from "./PlaneView";
import PreviousIndividualPlaneView from "./PreviousIndividualPlaneView";
import PreviousPlanView from "./PreviousPlanView";

const page = () => {
  var { plan_date } = useParams();

  const [day_flag, setDayFlag] = useState(0);

  const [initialState, setInitialState] = useState();
  const [date, setDate] = useState();

  function setDailyPlaneState() {
    const daily_plane = getDailyPlaneById(plan_date);
    if (daily_plane) {
      const normalized_plane = NormalizeDailyPlaneById(daily_plane);
      if (normalized_plane) setInitialState(normalized_plane);
    }
  }

  function normalize(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }


  useEffect(() => {
    if (!plan_date) return;
    const date = plan_date.split("-");
    const today = normalize(new Date());
    const target = normalize(new Date(date[2], date[1], date[0]));
    const date_to_set = new Date(date[2], date[1], date[0]).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      },
    );
    setDate(date_to_set);

    console.log(today);
    console.log(target);

    if (target < today) {
      setDayFlag(0);
    }
    else if (target > today) {
      setDayFlag(2);
    }
    else {
      setDayFlag(1);
    }

    setDailyPlaneState();
  }, [plan_date]);

  if (day_flag == 0) {
    return <PreviousPlanView plane_date={date} plan={initialState} />
  }
  else if (day_flag == 1) {
    return initialState ? (
      <PlaneView initial_state={initialState} plane_date={date} />
    ) : (
      <div className="flex flex-col items-center justify-center w-full h-full text-xl">
        Loading...
      </div>
    );
  }
  else{
    return <div>Next time</div>
  }

};

export default page;
