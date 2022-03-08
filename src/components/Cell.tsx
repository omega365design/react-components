interface CellProps {
  children: React.ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  isBetween?: boolean;
}

export default function Cell({ children, disabled, isSelected }: CellProps) {
  let classes = ["cell"];
  if (disabled) classes.push("disabled");
  if (isSelected) classes.push("selected");
  return <div className={classes.join(" ")}>{children}</div>;
}
