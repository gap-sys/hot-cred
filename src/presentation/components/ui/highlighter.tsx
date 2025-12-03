import React from "react";

type HighlighterProps = {
  action: "underline" | "highlight";
  color: string;
  children: React.ReactNode;
  className?: string;
};

export const Highlighter: React.FC<HighlighterProps> = ({ action, color, children, className }) => {
  const style =
    action === "underline"
      ? { textDecoration: "underline", textDecorationColor: color }
      : { backgroundColor: color, borderRadius: 4, padding: "0 4px" };
  return (
    <span style={style} className={className}>
      {children}
    </span>
  );
};

