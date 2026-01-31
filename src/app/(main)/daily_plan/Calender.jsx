"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdArrowForward, MdArrowLeft, MdArrowRight } from "react-icons/md";

const Calender = ({monthSelected, setMonthSelected}) => {

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  useEffect(()=>{setMonthSelected(`${year}-${month}`); }, [])
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [dates, setDates] = useState([]);

  const changeMonthPrev = () => {
    try {
      const [yearStr, monthStr] = monthSelected.split("-");
      const year = parseInt(yearStr);
      const month = parseInt(monthStr); 

      const date = new Date(year, month - 1, 1);

      date.setMonth(date.getMonth() - 1);

      const newYear = date.getFullYear();
      const newMonth = String(date.getMonth() + 1).padStart(2, "0");

      setMonthSelected(`${newYear}-${newMonth}`);
    } catch (e) {
      console.error(e);
    }
  };

  const checkDate = (date) => {
    try {
      const today = new Date();
      if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      
    }
  }

  const isCurrentMonth = (date) => {
    const [yearStr, monthStr] = monthSelected.split("-");
    return date.getFullYear() === parseInt(yearStr) && 
           date.getMonth() === parseInt(monthStr) - 1;
  }

  const changeMonthNext = () => {
    try {
      const [yearStr, monthStr] = monthSelected.split("-");
      const year = parseInt(yearStr);
      const month = parseInt(monthStr); // 1-12

      const date = new Date(year, month - 1, 1);

      date.setMonth(date.getMonth() + 1);

      const newYear = date.getFullYear();
      const newMonth = String(date.getMonth() + 1).padStart(2, "0");

      setMonthSelected(`${newYear}-${newMonth}`);
    } catch (e) {
      console.error(e);
    }
  };


  const onChangeDate = () => {
    console.log(monthSelected)
    const month = monthSelected.split('-')[1];
    const year = monthSelected.split('-')[0];
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Get the first day of the month to find starting weekday
    const firstDay = new Date(year, month - 1, 1).getDay();
    
    const dateOfTheMonth = [];
    
    // Add empty days before the month starts
    for (let i = 0; i < firstDay; i++) {
      dateOfTheMonth.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      dateOfTheMonth.push(new Date(year, month - 1, day));
    }

    // Fill remaining cells to complete the grid (42 cells = 6 rows × 7 columns)
    while (dateOfTheMonth.length < 42) {
      dateOfTheMonth.push(null);
    }

    setDates(dateOfTheMonth);
    
  }

  useEffect(() => {
    onChangeDate()
  }, [monthSelected])

  const [yearStr, monthStr] = monthSelected.split('-');
  const monthIndex = parseInt(monthStr) - 1;

  return (
    <div className="h-full flex flex-col gap-4 p-3 overflow-hidden">
      {/* Header with Month/Year and Navigation */}
      <div className="bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button 
            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white hover:scale-110 transform" 
            onClick={changeMonthPrev}
            aria-label="Previous month"
          >
            <MdArrowLeft size={20} />
          </button>
          <div className="text-center flex-1">
            <h2 className="text-white text-3xl font-bold">{months[monthIndex]}</h2>
            <p className="text-blue-100 text-sm mt-1">{yearStr}</p>
          </div>
          <input 
            className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 transition-all" 
            type="month" 
            min="2021-12" 
            max={`${year + 10}-12`} 
            value={monthSelected} 
            onChange={(e)=>{setMonthSelected(e.target.value)}} 
          />
          <button 
            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white hover:scale-110 transform" 
            onClick={changeMonthNext}
            aria-label="Next month"
          >
            <MdArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        {/* Weekday Headers Row */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div
              key={`header-${index}`}
              className="text-center font-bold text-blue-600 text-sm py-3 bg-linear-to-b from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid - 7 columns x 6 rows = 42 cells */}
        <div className="grid grid-cols-7 grid-rows-6 gap-2 flex-1">
          {dates.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="bg-gray-100/50 rounded-lg border border-dashed border-gray-300 opacity-30 hover:opacity-50 transition-opacity"
                />
              );
            }
            
            const link_date = `${date.getFullYear()}-${new String(parseInt(date.getMonth() + 1)).padStart(2, "0")}-${String(date.getDate()).padStart(2, '0')}`
            const isToday = checkDate(date);
            const isCurrentMonthDate = isCurrentMonth(date);
            
            return (
              <Link
                href={`daily_plan/${link_date}`}
                className={`rounded-md aspect-square cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl transform border flex items-center justify-center font-bold text-center overflow-hidden group relative ${
                  isToday 
                    ? "bg-linear-to-br from-emerald-400 to-green-500 border-green-600 text-white shadow-lg" 
                    : isCurrentMonthDate
                      ? "bg-primary border-blue-300 text-blue-700 hover:from-blue-100 hover:to-blue-200"
                      : "bg-gray-100 border-gray-300 text-gray-400 opacity-60 hover:opacity-80"
                }`}
                key={`date-${index}`}
              >
                <span className="text-lg font-semibold relative z-10">{date.getDate()}</span>
                {isToday && (
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all rounded-lg" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-linear-to-r from-blue-50 to-gray-50 p-4 rounded-lg border border-blue-200/50 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <strong>Today</strong> | 
          <span className="w-3 h-3 bg-blue-400 rounded-full ml-2"></span>
          <strong>Current Month</strong>
        </p>
      </div>
    </div>
  );
};

export default Calender;
