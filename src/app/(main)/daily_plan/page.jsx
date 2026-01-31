"use client";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";
import DailyAnalytics from "./DailyAnalytics";
import { MdCalendarMonth, MdShowChart } from "react-icons/md";
import { getMonthlyStatChartData, getNormalizedChartData } from "./utils";
import AnalyticsCards from "./AnalyticsCards";
import MonthlyStats from "./MonthlyStats";

const montly_plan_stats = [
  {
    _id: 26,
    completedCount: 3,
    unCompletedCount: 1,
  },
  {
    _id: 27,
    completedCount: 1,
    unCompletedCount: 0,
  },
];

const page = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const [monthSelected, setMonthSelected] = useState(`${year}-${month}`);

  const [chartData, setChartData] = useState([]);

  const fetchMonthlyStats = async (month) => {
    try {
      const response = await getMonthlyStatChartData(month);
      if (!response.success) {
        return;
      }
      const monthly_plan_stats = response.monthly_plan_stats;
      setChartData(monthly_plan_stats);
    } catch (e) {
      return {
        success: false,
      };
    }
  };

  useEffect(() => {
    const result = fetchMonthlyStats(monthSelected);
  }, [montly_plan_stats, monthSelected]);

  return (
    <div className="w-full h-full flex flex-col gap-3 bg-linear-to-br from-gray-50 via-white to-blue-50 overflow-y-auto custom-scrollbar">
      {/* Page Header */}
      <div className="sticky top-0 z-40 bg-linear-to-r from-blue-200 via-blue-100 to-blue-300 rounded-sm backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="px-6 py-6">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Daily Planning Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Track your progress and manage your plans efficiently
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-3 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-7xl mx-auto">
          {/* Left Column - Calendar */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg">
                <MdCalendarMonth size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
                <p className="text-sm text-gray-500">
                  Select a date to view plans
                </p>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <Calender
                monthSelected={monthSelected}
                setMonthSelected={setMonthSelected}
              />
            </div>
          </div>

          {/* Right Column - Analytics */}
          <div className="flex flex-col gap-3">
            {/* Analytics Cards */}
            <div>
              <AnalyticsCards chartData={chartData} />
            </div>

            {/* Charts */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 p-3">
                <DailyAnalytics chartData={chartData} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Monthly Stats */}
        <div className="max-w-7xl mt-3 mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 p-6">
            <MonthlyStats chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
