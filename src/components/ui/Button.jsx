import React from 'react'

const Button = ({children, className, variant, size, ...props}) => {
    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/50",
        secondary: "bg-background text-primary hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50",
        notice: "bg-red-500 text-primary-foreground hover:bg-red-500/90 focus-visible:border-red-500 focus-visible:ring-red-300",
    };
    const sizes = {sm: "px-2 py-1.5 h-9", md: "px-4 py-2 h-9", lg: "w-full text-lg px-4 py-2 h-9"}
  return (
    <button className={`border border-border inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-[3px] shadow-xs disabled:pointer-events-none disabled:opacity-50  ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
    </button>
  )
}

export {Button}