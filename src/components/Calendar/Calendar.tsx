import React, { ReactNode } from "react";

import {
  getDates,
  isBetween,
  isSelected,
  ucfirst,
} from "../../helpers/functions";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  format,
  subMonths,
  addMonths,
  isThisYear,
  differenceInDays,
} from "date-fns";
import nb from "date-fns/locale/nb";
import { isPast } from "date-fns/esm";
import { CalendarProps } from "../../helpers/types";

function Calendar({
  date,
  onPrev,
  onNext,
  fromDate,
  toDate,
  renderCell,
}: CalendarProps) {
  function handlePrevDate() {
    if (onPrev) onPrev(subMonths(date, 1));
  }

  function handleNextDate() {
    if (onNext) onNext(addMonths(date, 1));
  }

  let dayToCell = (day: string, i: number) => (
    <div key={i} className="day">
      {day}
    </div>
  );

  let dateToCell = (date: Date, i: number) =>
    renderCell({
      cellDate: date,
      isBetween: isBetween(date, fromDate, toDate),
      isSelected: isSelected(date, fromDate, toDate),
      isPast: isPast(date) && differenceInDays(new Date(), date) > 0,
      index: i,
    });

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
            format(date, isThisYear(date) ? "LLLL" : "LLLL Y", {
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
        {getDates(date).map(dateToCell)}
      </div>
    </Box>
  );
}

export default Calendar;
