"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getMilestoneWithTask } from "./milestoneController";
import MissionView from "./MissionView";

const page = ({ mission }) => {
  const { mission_id } = useParams();

  const [milestone, setMilestone] = useState();

  
  if (!mission_id) return;

  const fetchMission = async (m_id) => {
    const response = await getMilestoneWithTask(m_id);

    if (response) {
      setMilestone(response);
    }
  };

  useEffect(() => {
    fetchMission(mission_id);
  }, [mission_id]);

  return (
    milestone && <MissionView mission_id={mission_id} initial_data={milestone}></MissionView>
  );
};

export default page;
