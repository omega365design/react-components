import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "./Calendar";
import "./CalendarBox.css";
import { SearchIcon } from "@chakra-ui/icons";
import { addMonths, addDays, format, isAfter } from "date-fns";
import nb from "date-fns/locale/nb";
import Cell from "./Cell";

interface CalendarBoxProps {
  title?: string;
}

function CalendarBox({ title = "Velg dato" }: CalendarBoxProps) {
  let [currentDate, setDate] = useState(new Date());
  let [fromDate, setFrom] = useState(null);
  let [toDate, setTo] = useState(null);

  let onCellClick = (options: any) => {
    if (fromDate && toDate) {
      setFrom(null);
      setTo(null);
    } else if (!fromDate) {
      setFrom(options.cellDate);
    } else if (!toDate && isAfter(options.cellDate, fromDate)) {
      setTo(options.cellDate);
    }
  };

  return (
    <div className="calendar-box">
      <div className="title">{title}</div>
      <div className="inputs"></div>
      <div className="calendar1">
        <Calendar
          date={currentDate}
          onPrev={(newDate) => setDate(newDate)}
          fromDate={fromDate}
          toDate={toDate}
          renderCell={(options) => (
            <Cell
              onClick={() => onCellClick(options)}
              isSelected={options.isSelected}
              key={options.index}
            >
              {options.cellDate ? options.cellDate.getDate() : null}
            </Cell>
          )}
        />
      </div>
      <div className="calendar2">
        <Calendar
          date={addMonths(currentDate, 1)}
          onNext={(newDate) => setDate(newDate)}
          fromDate={fromDate}
          toDate={toDate}
          renderCell={(options) => (
            <Cell
              onClick={() => onCellClick(options)}
              isSelected={options.isSelected}
              key={options.index}
            >
              {options.cellDate ? options.cellDate.getDate() : null}
            </Cell>
          )}
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
