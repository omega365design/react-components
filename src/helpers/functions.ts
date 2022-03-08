import {
  getDaysInMonth,
  getISODay,
  isAfter,
  isBefore,
  isEqual,
  startOfMonth,
} from "date-fns";

export function getDates(date: Date) {
  let daysInMonth = getDaysInMonth(date);
  let dayOfWeek = getISODay(startOfMonth(date));
  let emptyCells = dayOfWeek - 1;
  let cells = new Array(daysInMonth + emptyCells).fill(0);
  cells = cells.map((cell, i) => {
    if (i < emptyCells) return null;
    return new Date(date.getUTCFullYear(), date.getMonth(), i - emptyCells + 1);
  });

  return cells;
}

export function ucfirst(value: string) {
  let firstChar = value[0].toUpperCase();
  return firstChar + value.slice(1);
}

export function isInRange(selectedDate: Date, fromDate: Date, toDate: Date) {
  return (
    (fromDate &&
      toDate &&
      isBefore(fromDate, selectedDate) &&
      isAfter(toDate, selectedDate)) ||
    (fromDate && isEqual(selectedDate, fromDate)) ||
    (toDate && isEqual(selectedDate, toDate))
  );
}
