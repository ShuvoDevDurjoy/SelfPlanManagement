import React, { useState } from "react";
import { usePlanReducer } from "./usePlane";
import IndividualPlane from "./IndividualPlane";
import PlaneUpdatePane from "./PlaneUpdatePane";
import UpdatePlanView from "./planUpdater/UpdatePlaneView";
import Filter from "./Filter";

const PlaneView = ({ initial_state, plane_date }) => {
  const { state, onPlaneChange, onStatusChange, onStartTimeChange, onEndTimeChange,onDescChange, getPlan, getIndividualPlanByIndex } = usePlanReducer(initial_state);

  const [updatePlaneVisible, setUpdatePlaneVisible] = useState(false);
  const [updatePlanId, setUpdatePlanId] = useState(null);

  const plane = state;

  const [filter, setFilter] = useState("all");
  const [timefilter, setTimefilter] = useState("all");

  return (
    <div className="w-full h-full">
      <UpdatePlanView
        visible={updatePlaneVisible}
        setVisible={setUpdatePlaneVisible}
        getPlanById={getIndividualPlanByIndex}
        plan_id={updatePlanId}
        updatePlanTitle={onPlaneChange}
        updateStartTime={onStartTimeChange}
        updateEndTime={onEndTimeChange}
        updateDesc={onDescChange}
      ></UpdatePlanView>
      {plane ? (
        <div className="relative flex flex-col h-full">
          <div className="sticky top-0 left-0 w-full h-12.5 text-center">
            <h1 className="p-3 text-center bg-black/10 inline-block mx-auto rounded-full px-5 backdrop-blur-xl">{plane_date}</h1>
          </div>
          <div className="relative overflow-y-scroll h-[calc(100% - 50px)] w-full">
            <Filter
              filter={filter}
              timeFilter={timefilter}
              setFilter={setFilter}
              setTimefilter={setTimefilter}
            ></Filter>
            <div className="flex flex-col p-2 bg-primary">
              {plane?.plans?.by_id &&
                Object.entries(plane.plans.by_id)?.map(([key, plan]) => {
                  return (
                    <div key={`${plane.id}-${key}`}>
                      <IndividualPlane
                        plane_id={plane.id}
                        plan={plan}
                        getPlan={getPlan}
                        onPlaneChange={onPlaneChange}
                        onStatusChange={onStatusChange}
                        onStartTimeChange={onStartTimeChange}
                        onEndTimeChange={onEndTimeChange}
                        setUpdatePlanId={setUpdatePlanId}
                        setUpdatePlaneVisible={setUpdatePlaneVisible}
                        filter={filter}
                        timeFilter={timefilter}
                      />
                    </div>
                  );
                  on;
                })}
            </div>
          </div>
        </div>
      ) : (
        <div>No Plan Found</div>
      )}
    </div>
  );
};

export default PlaneView;
