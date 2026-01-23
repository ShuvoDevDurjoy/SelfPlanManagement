import React from 'react'
import { usePlanReducer } from './usePlane';
    import { MdCheck, MdEdit } from 'react-icons/md';
import PlaneUpdatePane from './PlaneUpdatePane';
import IndividualPlanIndex from './IndividualPlanIndex';

const IndividualPlane = ({
  plan,
  getPlan,
  onStatusChange,
  setUpdatePlanId,
  setUpdatePlaneVisible,
  filter, 
  timeFilter
}) => {
  const plane = getPlan();

  return (
    <div className="plane flex flex-col gap-3">
      <div className="">
        <div className="w-full flex flex-col h-full justify-start ">
          {plan.plane_list &&
            plane.ind_plans.by_ids &&
            plan.plane_list?.map((plane_id, index) => {
              return (
                <div key={index} className='w-full'>
                  <IndividualPlanIndex
                  list_key={`${plane_id}-${index}`}
                  plane={plane}
                  plane_id={plane_id}
                  onStatusChange={onStatusChange}
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

