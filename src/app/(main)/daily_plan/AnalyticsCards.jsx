import React from "react";
import {
  MdCheckCircle,
  MdSchedule,
  MdTrendingUp,
  MdTimeline,
  MdAnalytics,
} from "react-icons/md";

const AnalyticsCards = ({ chartData }) => {
  const totalPlans = chartData.reduce((sum, d) => sum + d.total, 0);
  const completedPlans = chartData.reduce((sum, d) => sum + d.completed, 0);
  const uncompletedPlans = chartData.reduce((sum, d) => sum + d.uncompleted, 0);
  const averageCompletion =
    chartData.length > 0
      ? (
          chartData.reduce((sum, d) => sum + d.ratio, 0) / chartData.length
        ).toFixed(1)
      : 0;

  const stats = [
    {
      label: "Total",
      value: totalPlans,
      icon: MdSchedule,
      bg: "from-blue-500 to-blue-600",
      light: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Completed",
      value: completedPlans,
      icon: MdCheckCircle,
      bg: "from-green-500 to-green-600",
      light: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "Pending",
      value: uncompletedPlans,
      icon: MdTrendingUp,
      bg: "from-orange-500 to-orange-600",
      light: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      label: "Success %",
      value: `${averageCompletion}%`,
      icon: MdTimeline,
      bg: "from-purple-500 to-purple-600",
      light: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="bg-linear-to-r from-purple-500 via-purple-600 to-pink-600 p-3 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <MdAnalytics size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Monthly Statistics</h2>
              <p className="text-purple-100 text-sm">Overview of your planning progress</p>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`${stat.light} rounded-xl p-5 border-2 border-gray-200/50 hover:shadow-lg transition-all duration-300 group cursor-default hover:scale-105 transform`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${stat.text} mb-2`}>
                        {stat.label}
                      </p>
                      <p className={`text-3xl font-bold ${stat.text}`}>
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`bg-linear-to-br ${stat.bg} p-3 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-colors-${stat.bg.split('-')[1]}-500), var(--tw-colors-${stat.bg.split('-')[1]}-600))`
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;
