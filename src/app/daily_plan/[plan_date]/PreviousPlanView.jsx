import React from "react";
import PreviousIndividualPlaneView from "./PreviousIndividualPlaneView";

const PreviousPlanView = ({ plane_date, plan }) => {
  return (
    <div className="overflow-y-scroll w-full h-full">
      {plan ? (
        <div>
          <div className="sticky top-0 z-100 ">
            <h1 className="p-3 text-center bg-cyan-200">{plane_date}</h1>
          </div>
          <div className="flex flex-col gap-3 py-3">
            {plan?.plans?.by_id &&
              Object.entries(plan.plans.by_id)?.map(([key, plane]) => {
                return (
                  <div key={`${plane.id}-${key}`}>
                    <PreviousIndividualPlaneView
                      plane_id={plane.id}
                      plan={plane}
                      plan_obj={plan?.ind_plans?.by_ids}
                    />
                  </div>
                );
                on;
              })}
          </div>
        </div>
      ) : (
        <div>No Plan Found</div>
      )}
    </div>
  );
};

export default PreviousPlanView;
