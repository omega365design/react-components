import {
  differenceInDays,
  getDaysInMonth,
  getISODay,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  setHours,
  setMinutes,
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

export function isBetween(
  cellDate: Date,
  fromDate: Date | null | undefined,
  toDate: Date | null | undefined
): boolean {
  if (fromDate == null || toDate == null) return false;
  return (
    fromDate &&
    toDate &&
    isBefore(fromDate, cellDate) &&
    isAfter(toDate, cellDate)
  );
}

export function isSelected(
  cellDate: Date,
  fromDate: Date | null | undefined,
  toDate: Date | null | undefined
): boolean {
  return (
    (fromDate != null && isEqual(cellDate, fromDate)) ||
    (toDate != null && isEqual(cellDate, toDate)) ||
    (fromDate != null &&
      differenceInDays(cellDate, fromDate) == 0 &&
      isSameDay(fromDate, cellDate)) ||
    (toDate != null &&
      differenceInDays(cellDate, toDate) == 0 &&
      isSameDay(toDate, cellDate))
  );
}
