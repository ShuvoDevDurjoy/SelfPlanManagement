import { Clock, CheckCircle2, Circle, Grip, Edit, Delete } from "lucide-react";
import { MdDelete, MdEdit, MdRemove } from "react-icons/md";

export function TaskView({ milestone_id, list_key, task, onToggleComplete, onTaskEditHandler, onTaskDeleted }) {

  const onChangeTaskStatus = (m_id, task) => {
    const norm_task = {
      id: task._id,
      title: task.title, 
      description: task.description, 
      start_time: task.start_time, 
      end_time: task.end_time,
      completed: !task.completed
    }

    onToggleComplete(m_id, norm_task);
  }

  return (
    <div className="group relative pl-8 py-3 hover:bg-gray-50 hover:border-gray-300 border border-transparent dark:hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer">
      {/* Timeline dot */}
      <div className="absolute left-2 top-5 w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500"></div>

      <div className="right-2 top-2 cursor-pointer absolute group-hover:flex gap-2 hidden">
        <MdEdit
          onClick={() => {
            onTaskEditHandler("edit", milestone_id, { ...task });
          }}
          className="w-7 h-7 p-1.5 text-gray-400 bg-gray-300 rounded-full"
        ></MdEdit>
        <MdDelete
          onClick={() => {
            onTaskDeleted(milestone_id, task._id);
          }}
          className="w-7 h-7 p-1.5 text-gray-400 bg-gray-300 rounded-full"
        ></MdDelete>
      </div>

      {/* Connecting line */}
      <div className="absolute left-2.5 top-7 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

      <div className="flex items-start gap-3">
        <button
          className="shrink-0 mt-0.5 transition-transform hover:scale-110 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChangeTaskStatus(milestone_id, task);
          }}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h4
            className={`font-semibold text-gray-900 dark:text-gray-50 mb-1 ${task.completed ? "line-through opacity-60" : ""}`}
          >
            {task.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {task.description || (
              <span className="text-sm text-gray-400">No Description </span>
            )}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
              {task.start_time || "Not Specified"} -{" "}
              {task.end_time || "Not Specified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
