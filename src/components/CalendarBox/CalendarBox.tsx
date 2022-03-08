import { Box, Button, Icon, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import "./CalendarBox.css";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import {
  addMonths,
  addDays,
  format,
  isAfter,
  differenceInDays,
  subMonths,
} from "date-fns";
import nb from "date-fns/locale/nb";
import Cell from "../Cell/Cell";
import { isBetween } from "../../helpers/functions";

interface CalendarBoxProps {
  title?: string;
}

function CalendarBox({ title = "Velg dato" }: CalendarBoxProps) {
  let [currentDate, setDate] = useState(new Date());
  let [fromDate, setFrom] = useState(null);
  let [toDate, setTo] = useState(null);

  function isCellBetweenBookings(cellDate: Date, bookings: any[]) {
    return bookings.some((booking) =>
      isBetween(cellDate, booking.from, booking.to)
    );
  }

  let bookings = [
    {
      from: addDays(new Date(), 10),
      to: addDays(new Date(), 15),
    },
    {
      from: addDays(new Date(), 17),
      to: addDays(new Date(), 22),
    },
  ];

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

  function renderthis(options: any) {
    if (options.isBetween) {
      return (
        <IconButton aria-label="" icon={<StarIcon />} key={options.index} />
      );
    }

    if (options.cellDate == null) return <div key={options.index}></div>;

    if (isCellBetweenBookings(options.cellDate, bookings)) {
      return (
        <Button key={options.index} colorScheme={"red"} m={1}>
          {options ? options.cellDate?.getDate() : null}
        </Button>
      );
    }

    return (
      <Button
        onClick={() => onCellClick(options)}
        key={options.index}
        disabled={options.isPast}
        colorScheme={
          options.isBetween
            ? "purple"
            : options.isSelected
            ? "pink"
            : options.isPast
            ? "gray"
            : "teal"
        }
        m={1}
      >
        {options ? options.cellDate?.getDate() : null}
      </Button>
    );
    /* <Cell
        onClick={() => onCellClick(options)}
        isSelected={options.isSelected}
        key={options.index}
      >
        {options.cellDate ? options.cellDate.getDate() : null}
      </Cell> */
  }

  return (
    <div className="calendar-box">
      <div className="title">{title}</div>
      <div className="inputs"></div>
      <div className="calendar1">
        <Calendar
          date={currentDate}
          onNext={(newDate) => setDate(newDate)}
          onPrev={(newDate) => setDate(newDate)}
          fromDate={fromDate}
          toDate={toDate}
          renderCell={renderthis}
        />
      </div>
      <div className="calendar2">
        <Calendar
          date={addMonths(currentDate, 1)}
          onNext={(newDate) => setDate(newDate)}
          onPrev={(newDate) => setDate(subMonths(newDate, 1))}
          fromDate={fromDate}
          toDate={toDate}
          renderCell={renderthis}
        />
      </div>
      <div className="rules">
        {fromDate != null &&
          toDate != null &&
          `Days: ${differenceInDays(toDate, fromDate)}`}
      </div>
      <div className="buttons">
        <Button leftIcon={<SearchIcon />}>Book</Button>
      </div>
    </div>
  );
}

export default CalendarBox;
