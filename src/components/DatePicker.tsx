import { useEffect, useRef, useState } from "react";
import type { SearchQuery } from "../types";

interface DatePickerProps {
  searchQuery: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

export function DatePicker({ searchQuery }: DatePickerProps) {
  const [dayElements, setDayElements] = useState<JSX.Element[]>([]);

  function millisecondsToWholeDays(milliseconds: number): number {
    return Math.round(Math.floor(milliseconds / 1_000 / 60 / 60 / 24));
  }

  function drawCalendar(daysDifference: number, startDate: Date, endDate: Date): JSX.Element[] {
    const daysBetween: Date[] = [];
    const dayElements: JSX.Element[] = [];

    for (let i = 1; i <= 35; i++) {
      const dayBetween = new Date(startDate);
      dayBetween.setDate(dayBetween.getDate() + i);
      daysBetween.push(dayBetween);
    }

    for (let i = 0; i < daysBetween.length; i++) {
      const dayElement: JSX.Element = (
        <button
          type="button"
          key={i}
          className={i <= daysDifference ? "border-r-2 border-b-2 bg-lime-900" : "border-r-2 border-b-2"}>
          {daysBetween[i].getDate()}
        </button>
      );
      dayElements.push(dayElement);
    }

    return dayElements;
  }

  useEffect(() => {
    const millisecondsStartDate = Date.parse(searchQuery.startDate);
    const dateStartDate = new Date(Date.parse(searchQuery.startDate));

    const millisecondsEndDate = Date.parse(searchQuery.endDate);
    const dateEndDate = new Date(Date.parse(searchQuery.endDate));

    const daysDifference = millisecondsToWholeDays(millisecondsEndDate - millisecondsStartDate);

    const days: JSX.Element[] = drawCalendar(daysDifference, dateStartDate, dateEndDate);
    setDayElements([...days]);
  }, [searchQuery.startDate, searchQuery.endDate]);

  return (
    <div className="DatePicker flex flex-col bg-gray-900 border-2 w-1/4 h-fit">
      <div className="grid grid-cols-7 *:p-2 *:font-bold border-b-2">
        <span>Mo</span>
        <span className="border-l-2 border-r-2">Tu</span>
        <span>We</span>
        <span className="border-l-2 border-r-2">Th</span>
        <span>Fr</span>
        <span className="border-l-2 border-r-2">Sa</span>
        <span>Su</span>
      </div>
      <div className="days-container grid grid-cols-7 grid-rows-5 *:p-2">{dayElements}</div>
      <div>
        
      </div>
    </div>
  );
}
