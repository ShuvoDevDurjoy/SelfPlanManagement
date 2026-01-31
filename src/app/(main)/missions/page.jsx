"use client";
import React, { useEffect, useState } from "react";
import { getMission } from "./missionController";
import MissionView from "./MissionView";

const Page = () => {
  const [missions, setMissions] = useState(null);

  const [showAdd, setShowAdd] = useState(false);

  const [updateMissionId, setUpdateMissionId] = useState(null);

  const handleShowAddPane = (value) => {
    setUpdateMissionId(null);
    setShowAdd(value);
  };

  const handleUpdateMissionId = (id) => {
    setUpdateMissionId(id);
    setShowUpdate(true);
    setShowAdd(false);
  };

  const handleShowUpdate = (id) => {
    if (!id) {
      setUpdateMissionId(null);
    }

    setShowAdd(false);
    setUpdateMissionId(id);
  };

  const getMissions = async (user_id) => {
    const missions = await getMission(user_id);
    console.log('mission retuned from database', missions);
    setMissions(missions);
  };

  useEffect(() => {
    getMissions("6979fc4234d8f130d22dffaf");
  }, []);

  return (
    missions && (
      <MissionView
        missions={missions}
        showAdd={showAdd}
        handleShowAddPane={handleShowAddPane}

        updateMissionId={updateMissionId}
        handleShowUpdatePane={handleShowUpdate}
      ></MissionView>
    )
  );
};

export default Page;
