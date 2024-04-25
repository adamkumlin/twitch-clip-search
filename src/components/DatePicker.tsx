import { useEffect, useState } from "react";
import type { SearchQuery } from "../types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface DatePickerProps {
  searchQuery: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

export function DatePicker({ searchQuery }: DatePickerProps) {
  const [dayElements, setDayElements] = useState<JSX.Element[]>([]);
  const [currentStartDate, setCurrentStartDate] = useState<Date>(new Date(Date.parse(searchQuery.startDate)));

  function millisecondsToWholeDays(milliseconds: number): number {
    return Math.round(Math.floor(milliseconds / 1_000 / 60 / 60 / 24));
  }

  function drawCalendar(startDate: Date, daysDifference?: number): JSX.Element[] {
    let daysBetween: Date[] = [];
    const dayElements: JSX.Element[] = [];
    const today = new Date(Date.now()).toLocaleDateString();

    for (let i = 1; i <= 35; i++) {
      const dayBetween = new Date(startDate);
      dayBetween.setDate(dayBetween.getDate() + i);
      daysBetween.push(dayBetween);
    }
    
    for (let i = 0; i < daysBetween.length; i++) {
      if (daysBetween[i].toLocaleDateString() === today) {
        daysBetween = daysBetween.slice(0, i);
        break;
      }
    }

    for (let i = 0; i < daysBetween.length; i++) {
      const dayElement: JSX.Element = (
        <button
          type="button"
          key={i}
          className={daysDifference && i <= daysDifference ? "border-r-2 border-b-2 bg-lime-900" : "border-r-2 border-b-2"}>
          {daysBetween[i].getDate() + "/" + (daysBetween[i].getMonth() + 1)}
        </button>
      );
      dayElements.push(dayElement);
    }

    return dayElements;
  }

  function handleClick(isBack: boolean) {
    const currentStartDateCopy = new Date(currentStartDate);

    if (isBack) {
      currentStartDate.setDate(currentStartDate.getDate() - 35);
    } else {
      currentStartDate.setDate(currentStartDate.getDate() + 35);
    }
    setCurrentStartDate(currentStartDateCopy)
    console.log(currentStartDate)
    const days: JSX.Element[] = drawCalendar(currentStartDate);
    setDayElements([...days]);
  }

  useEffect(() => {
    const millisecondsStartDate = Date.parse(searchQuery.startDate);
    const dateStartDate = new Date(Date.parse(searchQuery.startDate));

    const millisecondsEndDate = Date.parse(searchQuery.endDate);
    const dateEndDate = new Date(Date.parse(searchQuery.endDate));
    console.log(dateEndDate)

    const daysDifference = millisecondsToWholeDays(millisecondsEndDate - millisecondsStartDate);

    const days: JSX.Element[] = drawCalendar(dateStartDate, daysDifference);
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
        <button type="button" onClick={() => handleClick(true)}><ArrowBackIcon/></button>
        <button type="button" onClick={() => handleClick(false)}><ArrowForwardIcon /> </button>
      </div>
    </div>
  );
}
