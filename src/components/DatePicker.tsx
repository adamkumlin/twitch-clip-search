import { useEffect, useState } from "react";
import type { SearchQuery } from "../types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { today } from "../constants";
interface DatePickerProps {
  searchQuery: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
  editDateStatus: "start" | "end" | null;
  setEditDateStatus: React.Dispatch<React.SetStateAction<"start" | "end" | null>>;
}

export function DatePicker({ searchQuery, setSearchQuery, editDateStatus, setEditDateStatus }: DatePickerProps) {
  const [dayElements, setDayElements] = useState<JSX.Element[]>([]);
  const [currentStartDate, setCurrentStartDate] = useState<Date>(new Date(Date.parse(searchQuery.startDate)));
  const currentStartDateCopy = new Date(currentStartDate);

  function handleDateClick(date: Date) {

    if (editDateStatus === "start") {
      setSearchQuery((current) => ({...current, startDate: date.toLocaleDateString()}))
      setCurrentStartDate(date);
    } else {
      setSearchQuery((current) => ({ ...current, endDate: date.toLocaleDateString() }));
    }

    setEditDateStatus(null);
  }

  function drawCalendar(startDate: Date): JSX.Element[] {
    let daysBetween: Date[] = [];
    const dayElements: JSX.Element[] = [];

    // Add 35 days starting from the start date
    for (let i = 1; i <= 35; i++) {
      const dayBetween = new Date(startDate);
      dayBetween.setDate(dayBetween.getDate() + i);
      daysBetween.push(dayBetween);
    }

    // If today's date is included in the array, remove every day after today
    let lastDayIndex: number | null = null;
    for (let i = 0; i < daysBetween.length; i++) {
      if (daysBetween[i].toLocaleDateString() === today.toLocaleDateString()) {
        daysBetween = daysBetween.slice(0, i + 6);
        lastDayIndex = i;
        break;
      }
    }

    for (let i = 0; i < daysBetween.length; i++) {
      const dayElement: JSX.Element = (
        <button
          type="button"
          key={i}
          disabled={lastDayIndex && i > lastDayIndex ? true : false}
          className={
            lastDayIndex && i > lastDayIndex
              ? "border-r-2 border-b-2 opacity-35"
              : "border-r-2 border-b-2"
          }
            onClick={() => handleDateClick(daysBetween[i])}>
          {daysBetween[i].getDate() + "/" + (daysBetween[i].getMonth() + 1)}
        </button>
      );
      dayElements.push(dayElement);
    }

    return dayElements;
  }

  function handlePageButtonClick(isBack: boolean) {
    const latestDate = new Date(currentStartDateCopy);
    latestDate.setDate(latestDate.getDate() + 30);

    // If back is clicked and the calendar would scroll after today's date
    if (!isBack && latestDate.toLocaleDateString() === today.toLocaleDateString()) {
      return;
    }

    if (isBack) {
      currentStartDateCopy.setDate(currentStartDateCopy.getDate() - 35);
    } else if (!isBack) {
      currentStartDateCopy.setDate(currentStartDateCopy.getDate() + 35);
    }

    setCurrentStartDate(currentStartDateCopy);
    const days: JSX.Element[] = drawCalendar(currentStartDate);
    setDayElements([...days]);
  }
  useEffect(() => {
    const dateStartDate = new Date(Date.parse(searchQuery.startDate));

    const days: JSX.Element[] = drawCalendar(dateStartDate);
    setDayElements([...days]);
  }, [searchQuery.startDate, searchQuery.endDate]);

  useEffect(() => {
    const days: JSX.Element[] = drawCalendar(currentStartDate);
    setDayElements([...days]);
  }, [currentStartDate]);

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
      <div className="bg-black flex flex-row justify-evenly">
        <button type="button" onClick={() => handlePageButtonClick(true)}>
          <ArrowBackIcon />
        </button>
        <button type="button" onClick={() => handlePageButtonClick(false)}>
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
}
