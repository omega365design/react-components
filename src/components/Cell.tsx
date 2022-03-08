import "./Cell.css";

interface CellProps {
  children: React.ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  isBetween?: boolean;
  onClick?: () => void;
}

export default function Cell({
  children,
  disabled,
  isSelected,
  onClick,
}: CellProps) {
  let classes = ["cell"];
  if (disabled) classes.push("disabled");
  if (isSelected) classes.push("selected");
  return (
    <div onClick={onClick} className={classes.join(" ")}>
      {children}
    </div>
  );
}
