import React from "react";
import classNames from "classnames";

type ButtonWithIconProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
};

const ButtonWithIcon = ({
  children,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonWithIconProps) => {
  const baseStyle =
    "inline-flex items-center gap-2 px-4 py-2 rounded font-semibold transition duration-200 focus:outline-none hover:cursor-pointer";

  const variants: Record<string, string> = {
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
