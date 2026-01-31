import { MdLockClock } from "react-icons/md";

export function MissionHeader({ title, description, startTime, endTime, progress }) {
  return (
    <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl px-6 py-4">
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-7 h-7 p-1">
              <MdLockClock className="w-full h-full"></MdLockClock>
            </div>
            <p className="flex gap-2">
              <span className="text-green-400">{startTime}</span> -{" "}
              <span className="text-red-400">{endTime}</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Overall Progress
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-50">
                {progress}%
              </span>
            </div>
            <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className={`absolute top-0 left-0 transition-all duration-200 block content-[''] h-full bg-green-500 rounded-full`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
