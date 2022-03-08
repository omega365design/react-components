import React from "react";
import "./Cell.css";
interface CellProps {
    children: React.ReactNode;
    disabled?: boolean;
    isSelected?: boolean;
    isBetween?: boolean;
    onClick?: () => void;
}
export default function Cell({ children, disabled, isSelected, onClick, }: CellProps): JSX.Element;
export {};
