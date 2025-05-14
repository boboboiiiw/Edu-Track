import React from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyle =
    "px-4 py-2 rounded font-semibold transition duration-200 hover:cursor-pointer focus:outline-none";

  const variants: Record<string, string> = {
    primary: "bg-[#FEFAE0] text-[#626F47] hover:bg-[#FFCF50]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
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
      {children}
    </button>
  );
};

export default Button;
