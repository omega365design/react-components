import { ReactNode } from "react";

export interface RenderCellOptions {
  cellDate: Date | null;
  isBetween: boolean;
  isSelected: boolean;
  isPast: boolean;
  index: number;
  fromDate: Date | null | undefined;
  toDate: Date | null | undefined;
}

export interface CalendarButtonProps {
  onClick: () => void;
}

export type RenderCellFC = (options: RenderCellOptions) => JSX.Element;

export interface CalendarClassNames {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  monthClassName?: string;
  buttonClassName?: string;
}

export type CalendarButtonFC = (options: CalendarButtonProps) => JSX.Element;

export interface CalendarProps {
  date: Date;
  fromDate?: Date | null;
  toDate?: Date | null;
  onPrev?: (date: Date) => void;
  onNext?: (date: Date) => void;
  nextButton?: CalendarButtonFC;
  prevButton?: CalendarButtonFC;
  renderCell: RenderCellFC;
  classNames?: CalendarClassNames;
  weekDays?: string[];
}
