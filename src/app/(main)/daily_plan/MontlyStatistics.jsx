import React from "react";
import { MdCheckCircle, MdSchedule, MdTrendingUp, MdTimeline } from "react-icons/md";

const MontlyStatistics = ({ chartData }) => {
  const totalPlans = chartData.reduce((sum, d) => sum + d.total, 0);
  const completedPlans = chartData.reduce((sum, d) => sum + d.completed, 0);
  const uncompletedPlans = chartData.reduce((sum, d) => sum + d.uncompleted, 0);
  const averageCompletion = chartData.length > 0 
    ? (chartData.reduce((sum, d) => sum + d.ratio, 0) / chartData.length).toFixed(1)
    : 0;

  const stats = [
    {
      label: "Total Plans",
      value: totalPlans,
      icon: MdSchedule,
      bgColor: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      label: "Completed",
      value: completedPlans,
      icon: MdCheckCircle,
      bgColor: "from-green-500 to-green-600",
      lightBg: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      label: "Pending",
      value: uncompletedPlans,
      icon: MdTrendingUp,
      bgColor: "from-orange-500 to-orange-600",
      lightBg: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      label: "Avg Completion",
      value: `${averageCompletion}%`,
      icon: MdTimeline,
      bgColor: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.lightBg} rounded-xl p-5 border ${stat.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 transform group`}
          >
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className={`bg-linear-to-br ${stat.bgColor} p-3 rounded-lg text-white shadow-lg group-hover:shadow-xl transition-all`}>
                <Icon size={24} />
              </div>
              <div className={`w-8 h-8 ${stat.lightBg} rounded-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity`}>
                <span className={`text-xs font-bold ${stat.textColor}`}>→</span>
              </div>
            </div>

            {/* Stats Content */}
            <p className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.textColor}`}>{stat.value}</p>

            {/* Footer Bar */}
            <div className={`mt-3 h-1 bg-linear-to-r ${stat.bgColor} rounded-full opacity-60 group-hover:opacity-100 transition-all`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default MontlyStatistics;
