import { useEffect, useState } from "react";
import { Clock, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TaskView } from "./TaskView";
import { MdDelete, MdEdit } from "react-icons/md";
import { getLocalTimeString } from "./validation";

export function MilestoneView({
  mission_id,
  onUpdateHandler,
  onTaskAddHandler,
  onClose,
  milestone,
  tasks,
  onAddTask,
  onToggleTask,
  onMilestoneDeleted,
  onTaskDeleted,
  onChangeMilestoneStatus,
  onChangeTaskStatus,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const totalTasks = milestone.tasks.length;

  const determineIfMilestoneCompleted = (tasks_ids, tasks) => {
    if (!tasks_ids || !tasks) return false;


    let completed = 0;
    tasks_ids.forEach(taskID => {
      if (tasks[taskID].completed) {
        completed++;
        }
    })

    setCompletedTasks(completed);
  }

  useEffect(() => {
    determineIfMilestoneCompleted(milestone.tasks, tasks);
  }, [tasks])



  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      {/* Milestone Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full relative px-6 py-5 flex items-start gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-t-xl transition-colors"
      >
        {/* Timeline indicator */}
        <div className="shrink-0 mt-1">
          <div
            className={`w-3 h-3 rounded-full ${totalTasks === completedTasks ? "bg-green-500" : "bg-blue-600 dark:bg-blue-500"} ring-4 ring-blue-100 dark:ring-blue-900/30`}
          ></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl capitalize font-bold text-gray-900 dark:text-gray-50">
              {milestone.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {totalTasks > 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {completedTasks}/{totalTasks}
                </span>
              )}
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {milestone.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <Clock className="w-4 h-4" />
            <span>
              {getLocalTimeString(milestone.start_time)} -{" "}
              {getLocalTimeString(milestone.end_time)}
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 flex gap-2 z-10 ">
          <div
            onClick={(e) => {
              e.stopPropagation(true);
              console.log("Edit Clicked");
              onUpdateHandler("edit", mission_id, { ...milestone });
            }}
            className="edit_container flex gap-2 items-center justify-between px-3 py-2 rounded-md hover:bg-black/20 cursor-pointer duration-200 hover:duration-200 group backdrop-blur-xl bg-black/10"
          >
            <div className="w-3 h-3">
              <MdEdit className="w-full h-full text-gray-400"></MdEdit>
            </div>
            <p className="text-sm font-semibold text-gray-400">Edit</p>
          </div>
          <div
            onClick={(e) => {
              console.log("Delete Clicked");
              e.stopPropagation(true);
              onMilestoneDeleted(milestone._id);
            }}
            className="edit_container flex gap-2 items-center justify-between px-3 py-2 rounded-md hover:bg-black/20 cursor-pointer duration-200 hover:duration-200 group backdrop-blur-xl bg-black/10"
          >
            <div className="w-3 h-3">
              <MdDelete className="w-full h-full text-gray-400"></MdDelete>
            </div>
            <p className="text-sm font-semibold text-gray-400">Delete</p>
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      <div>
        {
          <div
            className={` overflow-y-scroll max-h-125 expandable custom-scrollbar ${isExpanded ? "open" : ""}`}
          >
            <div className="px-6 pb-5 h-full overflow-y-scroll custom-scrollbar pt-2 border-t border-gray-100 duratoin-200 dark:border-gray-700">
              {/* Tasks List */}
              {milestone.tasks.length > 0 ? (
                <div className="flex flex-col gap-4 mb-4 overflow-y-scroll custom-scrollbar h-full">
                  {milestone.tasks.map((task_id) => (
                    <TaskView
                      key={task_id}
                      milestone_id={milestone._id}
                      onTaskEditHandler={onTaskAddHandler}
                      list_key={task_id}
                      task={tasks[task_id]}
                      onToggleComplete={onChangeTaskStatus}
                      onTaskDeleted={onTaskDeleted}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
                    <Clock className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    No tasks yet. Add your first task to get started.
                  </p>
                </div>
              )}

              {/* Add Task Button */}
              <button
                onClick={(e) => {
                  onTaskAddHandler("add", milestone._id);
                }}
                className="w-full border-dashed border-slate-400 border-2 rounded-md cursor-pointer p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 duration-500 hover:duration-500 dark:hover:border-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
