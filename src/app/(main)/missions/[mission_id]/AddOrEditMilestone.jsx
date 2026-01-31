import { useState, useEffect } from "react";
import { X, Calendar, Clock } from "lucide-react";

export function AddOrEditMilestone({
  visible,
  type,
  mode,
  id,
  initial,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (!initial) return;
    setFormData({
      id: initial._id,
      title: initial.title,
      description: initial.description,
      start_time: initial.start_time,
      end_time: initial.end_time,
    });
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id, formData);
    onClose();
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    visible &&
    formData && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {mode === "edit" ? "Edit" : "Add New"}{" "}
                {type === "milestone" ? "Milestone" : "Task"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {mode === "edit"
                  ? "Update the details below"
                  : `Fill in the details below to create a new ${type}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="px-6 py-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {type === "milestone" ? "Milestone" : "Task"} Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder={`Enter ${type} title`}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Provide a clear description of what needs to be done"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Start Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      type="datetime-local"
                      value={formData.start_time}
                      onChange={(e) =>
                        handleChange("start_time", e.target.value)
                      }
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    End Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      type="datetime-local"
                      value={formData.end_time}
                      onChange={(e) => handleChange("end_time", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Info box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900 dark:text-blue-300">
                    <p className="font-semibold mb-1">Scheduling Tips</p>
                    <p className="text-blue-700 dark:text-blue-400">
                      {type === "milestone"
                        ? "Milestones should cover broader time ranges and contain multiple tasks."
                        : "Tasks should be specific, actionable items with clear start and end times."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 hover:bg-gray-100 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-end gap-3">
              <button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6 py-3 hover:bg-gray-300 cursor-pointer duration-200 hover:duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                {mode === "edit"
                  ? "Save Changes"
                  : `Add ${type === "milestone" ? "Milestone" : "Task"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
