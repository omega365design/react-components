import { ReactNode } from "react";
export declare type RenderCellFC = (options: {
    cellDate: Date | null;
    isBetween: boolean;
    isSelected: boolean;
    isPast: boolean;
    index: number;
}) => ReactNode;
export interface CalendarProps {
    date: Date;
    fromDate?: Date | null;
    toDate?: Date | null;
    onPrev?: (date: Date) => void;
    onNext?: (date: Date) => void;
    renderCell: RenderCellFC;
}
