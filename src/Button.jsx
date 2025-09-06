import React from 'react'

const Button = ({
    children,
    size = "small",
    variation = "primary",
    className = "",
    ...props
}) => {

    const sizeClasses = {
        small: "px-4 py-2 font-bold text-center tracking-wide text-sm",
        medium: "text-sm px-4 py-3 font-medium",
        large: "text-base px-6 py-3 font-medium"
    };

    const variationClasses = {
        primary: "text-[var(--primary-button-text)] bg-[var(--primary-button-bg)] hover:bg-[var(--primary-button-hover)] cursor-pointer",
        secondary: "text-[var(--secondary-button-text)] bg-[var(--secondary-button-bg)] border border-[var(--secondary-button-border)] hover:bg-[var(--secondary-button-hover)] cursor-pointer",
        danger: "text-red-400 hover:text-red-500 border border-red-400 hover:border-red-500 cursor-pointer"
      };

  return (
    <button
    className={`
    rounded-lg shadow-sm
    ${sizeClasses[size]}
    ${variationClasses[variation]}
    ${className}
    `}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button