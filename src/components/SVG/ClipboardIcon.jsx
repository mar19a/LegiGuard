import React from "react";

const ClipboardIcon = ({
  width = 24,
  height = 25,
  stroke = "#292929",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 4.5H18C18.5304 4.5 19.0391 4.71071 19.4142 5.08579C19.7893 5.46086 20 5.96957 20 6.5V20.5C20 21.0304 19.7893 21.5391 19.4142 21.9142C19.0391 22.2893 18.5304 22.5 18 22.5H6C5.46957 22.5 4.96086 22.2893 4.58579 21.9142C4.21071 21.5391 4 21.0304 4 20.5V6.5C4 5.96957 4.21071 5.46086 4.58579 5.08579C4.96086 4.71071 5.46957 4.5 6 4.5H8M9 2.5H15C15.5523 2.5 16 2.94772 16 3.5V5.5C16 6.05228 15.5523 6.5 15 6.5H9C8.44772 6.5 8 6.05228 8 5.5V3.5C8 2.94772 8.44772 2.5 9 2.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClipboardIcon;
