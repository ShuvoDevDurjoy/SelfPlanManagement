import React from 'react'

const Filter = ({filter, setFilter, timefilter, setTimefilter}) => {
  return (
    <div className="p-2 sticky bg-white z-50 top-0 left-0">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => {
            setFilter("all");
            setTimefilter("all");
          }}
          className={`${filter === "all" && timefilter === "all" ? "border-black" : "border-gray-300"} p-2 shadow-md shadow-gray-300 cursor-pointer hover:border-black/50 relative hover:shadow-xl transition-all duration-200 hover:duration-200 hover:translate-x-px capitalize after:block after:content-[''] after:absolute after:w-1 after:h-1 after:bg-black after:rounded-full after:right-3 after:top-1 hover:-translate-y-px px-4 border-2 rounded-full text-sm`}
        >
          show all
        </button>
        <button
          onClick={() => {
            setTimefilter((prev) => (prev === "past" ? "all" : "past"));
          }}
          className={`${timefilter === "past" ? "border-purple-500" : "border-gray-300"} p-2 shadow-md shadow-gray-300 cursor-pointer hover:border-purple-200 relative hover:shadow-xl transition-all duration-200 hover:duration-200 hover:translate-x-px capitalize after:block after:content-[''] after:absolute after:w-1 after:h-1 after:bg-purple-500 after:rounded-full after:right-3 after:top-1 hover:-translate-y-px px-4 border-2 rounded-full text-sm`}
        >
          past
        </button>
        <button
          onClick={() => {
            setTimefilter((prev) => (prev === "ongoing" ? "all" : "ongoing"));
          }}
          className={`${timefilter === "ongoing" ? "border-purple-500" : "border-gray-300"} p-2 shadow-md shadow-gray-300 cursor-pointer hover:border-purple-200 relative hover:shadow-xl transition-all duration-200 hover:duration-200 hover:translate-x-px capitalize after:block after:content-[''] after:absolute after:w-1 after:h-1 after:bg-purple-500 after:rounded-full after:right-3 after:top-1 hover:-translate-y-px px-4 border-2 rounded-full text-sm`}
        >
          ongoing
        </button>
        <button
          onClick={() => {
            setTimefilter((prev) => (prev === "upcoming" ? "all" : "upcoming"));
          }}
          className={`${timefilter === "upcoming" ? "border-purple-500" : "border-gray-300"} p-2 shadow-md shadow-gray-300 cursor-pointer hover:border-purple-200 relative hover:shadow-xl transition-all duration-200 hover:duration-200 hover:translate-x-px capitalize after:block after:content-[''] after:absolute after:w-1 after:h-1 after:bg-yellow-500 after:rounded-full after:right-3 after:top-1 hover:-translate-y-px px-4 border-2 rounded-full text-sm`}
        >
          upcoming
        </button>
        <button
          onClick={() => {
            setFilter((prev) => (prev === "completed" ? "all" : "completed"));
          }}
          className={`${filter === "completed" ? "border-green-500" : "border-gray-300"} p-2 shadow-md shadow-gray-300 cursor-pointer hover:border-green-300 relative hover:shadow-xl transition-all duration-200 hover:duration-200 hover:translate-x-px capitalize after:block after:content-[''] after:absolute after:w-1 after:h-1 after:bg-green-500 after:rounded-full after:right-3 after:top-1 hover:-translate-y-px px-4 border-2 rounded-full text-sm`}
        >
          completed
        </button>
        <button
          onClick={() => {
            setFilter((prev) =>
              prev === "not-completed" ? "all" : "not-completed",
            );
          }}
          className={`${filter === "not-completed" ? "border-red-500" : "border-gray-300"} p-2 shadow-md shadow-gray-300 cursor-pointer hover:border-yellow-200 relative hover:shadow-xl transition-all duration-200 hover:duration-200 hover:translate-x-px capitalize after:block after:content-[''] after:absolute after:w-1 after:h-1 after:bg-red-500 after:rounded-full after:right-3 after:top-1 hover:-translate-y-px px-4 border-2 rounded-full text-sm`}
        >
          Not completed
        </button>
      </div>
    </div>
  );
}

export default Filter
