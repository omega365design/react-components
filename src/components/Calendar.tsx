import React from "react";
import "./Calendar.css";
import Cell from "./Cell";
import { getDates, ucfirst } from "../helpers/functions";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  format,
  subMonths,
  addMonths,
  isPast,
  isThisYear,
  getDate,
  differenceInDays,
  isBefore,
  isAfter,
  isEqual,
} from "date-fns";
import nb from "date-fns/locale/nb";

interface CalendarProps {
  currentDate: Date;
  disablePast?: boolean;
  onDateClick?: (date: Date) => void;
  fromDate?: Date;
  toDate?: Date;
  onPrev?: (date: Date) => void;
  onNext?: (date: Date) => void;
}

function Calendar({
  currentDate,
  onPrev,
  onNext,
  disablePast,
  onDateClick,
  fromDate,
  toDate,
}: CalendarProps) {
  function handlePrevDate() {
    if (onPrev) onPrev(subMonths(currentDate, 1));
  }

  function handleNextDate() {
    if (onNext) onNext(addMonths(currentDate, 1));
  }

  let dayToCell = (day: string) => (
    <Cell key={day}>
      <div className="day">{day}</div>
    </Cell>
  );

  let dateToCell = (date: Date, i: number) => (
    <Cell
      key={i}
      isSelected={
        (fromDate &&
          toDate &&
          isBefore(fromDate, date) &&
          isAfter(toDate, date)) ||
        (fromDate && isEqual(date, fromDate)) ||
        (toDate && isEqual(date, toDate))
      }
      disabled={
        disablePast
          ? isPast(date) && differenceInDays(new Date(), date) > 0
          : false
      }
    >
      <div
        className={
          fromDate && isEqual(date, fromDate)
            ? "selected-cell-button"
            : "cell-button"
        }
      >
        {date && getDate(date)}
      </div>
    </Cell>
  );

  return (
    <Box className="calendar">
      <Flex width="100%" justifyContent="space-between">
        <Box>
          {onPrev && (
            <IconButton
              aria-label="Go to previous month"
              icon={<ArrowBackIcon />}
              onClick={handlePrevDate}
            />
          )}
        </Box>
        <Box>
          {ucfirst(
            format(currentDate, isThisYear(currentDate) ? "LLLL" : "LLLL Y", {
              locale: nb,
            })
          )}
        </Box>
        <Box>
          {onNext && (
            <IconButton
              aria-label="Go to next month"
              icon={<ArrowForwardIcon />}
              onClick={handleNextDate}
            />
          )}
        </Box>
      </Flex>
      <div className="body">
        {["man", "tir", "ons", "tor", "fre", "lør", "søn"]
          .map(ucfirst)
          .map(dayToCell)}
        {getDates(currentDate).map(dateToCell)}
      </div>
    </Box>
  );
}

export default Calendar;
