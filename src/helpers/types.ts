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

export type RenderCellFC = (options: RenderCellOptions) => JSX.Element;

export interface CalendarProps {
  date: Date;
  fromDate?: Date | null;
  toDate?: Date | null;
  onPrev?: (date: Date) => void;
  onNext?: (date: Date) => void;
  renderCell: RenderCellFC;
}
