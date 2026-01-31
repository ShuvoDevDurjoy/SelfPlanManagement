import React from "react";
import { usePlanReducer } from "../usePlane";
import { MdCheck, MdEdit } from "react-icons/md";
import PreviousIndividualPlanIndex from "./PreviousIndividualPlanIndex";

const PreviousIndividualPlan = ({
  plan,
  plan_date,
  filter,
  timeFilter,
}) => {
  return (
    plan && (
      <div className="plane flex flex-col gap-3">
        <div className="">
          <div className="w-full flex flex-col h-full justify-start ">
            {plan.all_ids &&
              plan.all_ids.map((id, index) => {
                return (
                  <div key={index} className="w-full">
                    <PreviousIndividualPlanIndex
                      list_key={`${id}-${index}`}
                      plane={plan.by_ids[id]}
                      plan_date={plan_date}
                      filter={filter}
                      timeFilter={timeFilter}
                    ></PreviousIndividualPlanIndex>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
};

export default PreviousIndividualPlan;
