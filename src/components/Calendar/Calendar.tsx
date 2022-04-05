import React, { ReactNode, useCallback } from "react";
import "./Calendar.css";
import {
  getDates,
  isBetween,
  isSelected,
  ucfirst,
} from "../../helpers/functions";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
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
  nextButton: NextButton,
  prevButton: PrevButton,
  fromDate,
  toDate,
  renderCell: CellComponent,
  classNames = {
    className: "calendar",
    headerClassName: "calendar-header",
    buttonClassName: "calendar-button",
    bodyClassName: "calendar-body",
    weekDayClassName: "calendar-weekday",
  },
  weekDays = ["man", "tir", "ons", "tor", "fre", "lør", "søn"],
}: CalendarProps) {
  let handlePrevDate = useCallback(() => {
    if (onPrev) onPrev(subMonths(date, 1));
  }, [onPrev]);

  let handleNextDate = useCallback(() => {
    if (onNext) onNext(addMonths(date, 1));
  }, [onNext]);

  let dayToCell = (day: string, i: number) => (
    <div key={i} className={classNames.weekDayClassName}>
      {day}
    </div>
  );

  let dateToCell = (date: Date, i: number) => (
    <CellComponent
      key={i}
      {...{
        cellDate: date,
        isBetween: isBetween(date, fromDate, toDate),
        isSelected: isSelected(date, fromDate, toDate),
        isPast: isPast(date) && differenceInDays(new Date(), date) > 0,
        fromDate,
        toDate,
        index: i,
      }}
    />
  );

  return (
    <div className={classNames.className}>
      <div className={classNames.headerClassName}>
        <div>
          {onPrev &&
            (PrevButton ? (
              <PrevButton onClick={handlePrevDate} />
            ) : (
              <button
                className={classNames.buttonClassName}
                aria-label="Go to previous month"
                onClick={handlePrevDate}
              >
                <BsArrowLeftShort style={{ width: 30, height: 30 }} />
              </button>
            ))}
        </div>
        <div className={classNames.monthClassName}>
          {ucfirst(
            format(date, isThisYear(date) ? "LLLL" : "LLLL Y", {
              locale: nb,
            })
          )}
        </div>
        <div>
          {onNext &&
            (NextButton ? (
              <NextButton onClick={handleNextDate} />
            ) : (
              <button
                className={classNames.buttonClassName}
                aria-label="Go to next month"
                onClick={() => handleNextDate()}
              >
                <BsArrowRightShort style={{ width: 30, height: 30 }} />
              </button>
            ))}
        </div>
      </div>
      <div className={classNames.bodyClassName}>
        {weekDays.map(ucfirst).map(dayToCell)}
        {getDates(date).map(dateToCell)}
      </div>
    </div>
  );
}

export default Calendar;
