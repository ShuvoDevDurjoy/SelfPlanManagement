"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getNormalizedChartData } from "./utils";
import AnalyticsCards from "./AnalyticsCards";
import MonthlyStats from "./MonthlyStats";

const DailyAnalytics = ({chartData}) => {
  

  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-5xl mb-4">📊</div>
          <p className="text-gray-600 text-lg font-semibold">No data available</p>
          <p className="text-gray-400 text-sm mt-1">Create and complete plans to see analytics</p>
        </div>
      </div>
    );
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm">
          <p className="font-bold text-gray-800">Day {data.day}</p>
          <p className="text-green-600">✓ {data.completed}</p>
          <p className="text-orange-600">✗ {data.uncompleted}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col">
      {/* Bar Chart - Daily Breakdown */}
      <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 border-2 border-emerald-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-linear-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
          <div>
            <h4 className="text-lg font-bold text-gray-800">Daily Progress</h4>
            <p className="text-sm text-gray-500">Completed vs pending plans per day</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="uncompleted" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyAnalytics;
