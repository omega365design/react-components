import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "./Calendar";
import "./CalendarBox.css";
import { SearchIcon } from "@chakra-ui/icons";
import { addMonths, addDays } from "date-fns";

interface CalendarBoxProps {
  title?: string;
}

function CalendarBox({ title = "Velg dato" }: CalendarBoxProps) {
  let [currentDate, setDate] = useState(new Date());

  return (
    <div className="calendar-box">
      <div className="title">{title}</div>
      <div className="inputs"></div>
      <div className="calendar1">
        <Calendar
          currentDate={currentDate}
          onPrev={(newDate) => setDate(newDate)}
          disablePast={true}
          fromDate={new Date(2022, 2, 7)}
          toDate={addDays(new Date(2022, 2, 7), 4)}
        />
      </div>
      <div className="calendar2">
        <Calendar
          currentDate={addMonths(currentDate, 1)}
          onNext={(newDate) => setDate(newDate)}
          disablePast={true}
        />
      </div>
      <div className="rules"></div>
      <div className="buttons">
        <Button leftIcon={<SearchIcon />}>Book</Button>
      </div>
    </div>
  );
}

export default CalendarBox;
