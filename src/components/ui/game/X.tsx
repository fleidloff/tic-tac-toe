import React from "react";

export default function X() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="15"
        y1="15"
        x2="85"
        y2="85"
        stroke="red"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="85"
        y1="15"
        x2="15"
        y2="85"
        stroke="red"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
