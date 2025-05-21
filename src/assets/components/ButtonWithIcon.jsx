import React from "react";
import classNames from "classnames";

const ButtonWithIcon = ({
  children,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyle =
    "inline-flex items-center gap-2 px-4 py-2 rounded font-semibold transition duration-200 focus:outline-none hover:cursor-pointer";

  const variants = {
    primary: "bg-[#FEFAE0] text-[#626F47] hover:bg-[#FFCF50]",
    secondary: "bg-[#626F47] text-[#FEFAE0] hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        baseStyle,
        variants[variant],
        disabled && disabledStyle,
        className
      )}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

export default ButtonWithIcon;
