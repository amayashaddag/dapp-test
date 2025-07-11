import React from "react";

const CustomButton = ({
  width = "auto",
  height = "auto",
  text = "Click me",
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-[#7357FF] opacity-100"
      style={{
        width,
        height,
      }}
    >
      <span
        className="font-inter text-white font-semibold text-[14px] leading-6"
        style={{
          letterSpacing: "0%",
          verticalAlign: "middle",
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default CustomButton;
