"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const [monthSelected, setMonthSelected] = useState(`${year}-${month}`); 
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
    const dateOfTheMonth = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dateOfTheMonth.push(new Date(year, month-1, day));
    }

    setDates(dateOfTheMonth);
    
  }

  useEffect(() => {
    onChangeDate()
  }, [monthSelected])



  return (
    <div className="daily_plane_container relative h-full flex flex-col gap-2 overflow-y-scroll scrollbar-none">
      <div className="bg-red-300 p-2 sticky top-0 flex items-center justify-center gap-5">
        <div className="flex items-center justify-between w-full px-2 gap-2">
          <button className="bg-white/10 px-3 py-1 border-1 rounded-md border-white/40 hover:bg-white/20 cursor-pointer text-sm transition-all duration-200 hover:duration-200" onClick={changeMonthPrev}>Previous</button>
          <input className="border-2 px-7 py-1 rounded-full border-white/20" type="month" min="2021-12" max={`${year + 10}-12`} value={monthSelected} onChange={(e)=>{setMonthSelected(e.target.value)}} />
          <button className="bg-white/10 px-3 py-1 border-1 rounded-md border-white/40 hover:bg-white/20 cursor-pointer text-sm transition-all duration-200 hover:duration-200" onClick={changeMonthNext}>Next</button>
        </div>
      </div>
      <div className="grid grid-cols-7 h-full gap-2 p-2">
        {dates.map((date, index) => {
          const link_date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
          return (
            <Link
              href={`daily_plan/${link_date}`}
              className={`h-full flex flex-col justify-between p-2 aspect-square rounded-md cursor-pointer transition-colors duration-500 hover:duration-500 ${checkDate(date) ? "bg-cyan-200 hover:bg-cyan-300 border-2 border-gray-500" : "bg-blue-100 hover:bg-blue-200"}`}
              key={index}
            >
              <p className="text-center">
                {date.toLocaleDateString("en-US", { weekday: "long" })}
              </p>
              <p className="text-center text-2xl">{date.getDate()}</p>
              <div className="flex justify-between">
                <p>{months[date.getMonth()]}</p>
                <p>{date.getFullYear()}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
