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
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { getNormalizedChartData } from "./utils";
import MontlyStatistics from "./MontlyStatistics";

const MonthlyStats = ({chartData}) => {
    
  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-5xl mb-4">📈</div>
          <p className="text-gray-600 text-lg font-semibold">No data available</p>
          <p className="text-gray-400 text-sm mt-1">Create and complete plans to see monthly trends</p>
        </div>
      </div>
    );
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200 backdrop-blur-sm">
          <p className="font-bold text-gray-800 text-center mb-2">Day {data.day}</p>
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span><span className="text-green-600 font-semibold">Completed: {data.completed}</span></p>
            <p className="flex items-center gap-2"><span className="w-2 h-2 bg-orange-500 rounded-full"></span><span className="text-orange-600 font-semibold">Uncompleted: {data.uncompleted}</span></p>
            <p className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span><span className="text-blue-600 font-semibold">Total: {data.total}</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Completion Trend Chart */}
      <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-6 border-2 border-blue-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <div>
            <h4 className="text-lg font-bold text-gray-800">Completion Trend</h4>
            <p className="text-sm text-gray-500">Track your success rate over time</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="ratio"
              stroke="url(#colorGradient)"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 7, fill: "#1e40af" }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyStats;
