import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const AddPlanView = ({ visible, setVisible, plan_date, onAddPlan }) => {
  const [plan, setPlan] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const updatePlan = (e) => {
    try {
      setPlan((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    } catch (e) {
      console.log("Error with Updating while adding plan");
    }
  };

  return (
    visible && (
      <div className="fixed w-full h-full bg-white/5 z-100 backdrop-blur-[2px] top-0 left-0 flex items-center justify-center">
        <div className="max-h-[95%] group overflow-y-auto bg-white p-5 rounded-xl shadow-md py-10 border border-gray-400 flex flex-col gap-3 relative">
          <div
            className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hidden group-hover:block cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <MdClose></MdClose>
          </div>
          <div className="plan_update_container flex justify-center items-center w-full">
            <h1 className="text-gray-600 text-2xl font-bold inline-block text-center px-10 py-1 w-[70%] after:block after:absolute relative after:content-[''] after:h-0.5 after:w-full after:bg-gray-400 after:left-0 after:bottom-0">
              Add New Plan
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col item-start">
              <label
                htmlFor="title"
                className="py-2 text-gray-600 text-sm font-semibold"
              >
                Plan Title
              </label>
              <input
                className="border-2 border-gray-300 outline-gray-400 p-2 min-w-125 text-md tracking-wider text-gray-700"
                type="text"
                name="title"
                value={plan?.title}
                onChange={(e) => {
                  updatePlan(e);
                }}
              />
            </div>
            <div className="flex flex-col item-start">
              <label
                htmlFor="description"
                className="py-2 text-sm text-gray-600 font-semibold"
              >
                Plan Description
              </label>
              <textarea
                className="border-2 min-h-10 border-gray-300 outline-gray-400 p-2 min-w-125 text-md tracking-wider text-gray-700"
                rows="5"
                name="description"
                value={plan?.description}
                onChange={updatePlan}
              />
            </div>
            <div className="flex items-center justify-evenly p-2">
              <div className="flex flex-col">
                <label className="py-1" htmlFor="start_time">
                  Start At
                </label>
                <input
                  className="ps-5"
                  type="time"
                  name="start_time"
                  value={plan?.start_time}
                  max={plan?.end_time}
                  onChange={updatePlan}
                />
              </div>
              <div className="flex flex-col">
                <label className="py-1" htmlFor="end_time">
                  End At
                </label>
                <input
                  className="ps-5"
                  type="time"
                  name="end_time"
                  value={plan?.end_time}
                  onChange={updatePlan}
                  min={plan?.start_time}
                />
              </div>
            </div>
          </div>

          <button
            className=" bg-gray-400 text-gray-100 texl-xl font-bold rounded-md w-[50%] mx-auto px-2 py-2 cursor-pointer hover:bg-gray-600"
            onClick={() => {
                const success = onAddPlan(plan_date, plan);
                if (success) {
                  setVisible(false);
                }
            }}
          >
            Add Plan
          </button>
        </div>
      </div>
    )
  );
};

export default AddPlanView;
