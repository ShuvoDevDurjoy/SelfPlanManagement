import React from 'react'
    import { MdCheck, MdEdit } from 'react-icons/md';
import IndividualPlanIndex from './IndividualPlanIndex';

const IndividualPlane = ({
  plan,
  plan_date,
  onStatusChange,
  onDelete,
  setUpdatePlanId,
  setUpdatePlaneVisible,
  filter,
  timeFilter,
}) => {


  return plan && (
    <div className="plane flex flex-col gap-3">
      <div className="">
        <div className="w-full flex flex-col h-full justify-start ">
          {
            plan.all_ids &&
            plan.all_ids.map((id,index) => {
              return (
                <div key={index} className="w-full">
                  <IndividualPlanIndex
                    list_key={`${id}-${index}`}
                    plane={plan.by_ids[id]}
                    plan_date={plan_date}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    setUpdatePlanId={setUpdatePlanId}
                    setUpdatePlaneVisible={setUpdatePlaneVisible}
                    filter={filter}
                    timeFilter={timeFilter}
                  ></IndividualPlanIndex>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default IndividualPlane

