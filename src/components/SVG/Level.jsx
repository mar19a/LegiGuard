import React from "react";

const Level = ({
  width = 24,
  height = 24,
  stroke = "#002868",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 21H3V3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 4H10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 7H13"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 20.5L10 12L14 15L19 10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Level;
