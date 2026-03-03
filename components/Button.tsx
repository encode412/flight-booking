import React from "react";

import { ButtonProps } from "@/types/button";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 active:bg-red-700",
    ghost:
      "bg-transparent text-primary border-2 border-primary hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100",
  };

  const sizeStyles = {
    sm: "px-4 py-1.5 md:text-sm text-xs",
    md: "px-6 py-2.5 text-sm md:text-base",
    lg: "px-8 py-3 text-base md:text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
