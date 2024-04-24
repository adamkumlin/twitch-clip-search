import { useEffect, useState } from "react";
import type { SearchQuery } from "../types";

interface DatePickerProps {
  searchQuery: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

export function DatePicker({ searchQuery }: DatePickerProps) {
  const [dayElements, setDayElements] = useState<JSX.Element[]>([]);

  function millisecondsToWholeDays(milliseconds: number): number {
    return Math.round(Math.floor(milliseconds / 1000 / 60 / 60 / 24));
  }

  function drawCalendar(daysDifference: number, startDate: Date, endDate: Date): JSX.Element[] {
    const daysBetween: Date[] = [];
    const dayElements: JSX.Element[] = [];

    for (let i = 1; i <= daysDifference; i++) {
      const dayBetween = new Date(startDate);
      dayBetween.setDate(dayBetween.getDate() + i);
      daysBetween.push(dayBetween);
    }

    for (let i = 0; i < daysBetween.length; i++) {
      const dayElement: JSX.Element = <div key={i}>{daysBetween[i].getDate()}</div>;
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
    setDayElements([...days])
  }, [searchQuery.startDate, searchQuery.endDate]);

  return (
    <div className="DatePicker flex flex-col">
      <div className="flex flex-row justify-center *:p-2">
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
        <span>Su</span>
      </div>
      <div className="grid grid-cols-7 grid-rows-7">{dayElements}</div>
    </div>
  );
}
