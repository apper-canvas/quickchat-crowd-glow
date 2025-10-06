import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children,
  variant = "primary",
  className,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary text-white",
    success: "bg-success text-white",
    error: "bg-error text-white",
    warning: "bg-warning text-white"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;