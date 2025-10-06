import React from "react";
import { cn } from "@/utils/cn";

const Avatar = React.forwardRef(({ src, alt, size = "md", isOnline, className, ...props }, ref) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)} {...props}>
      <img 
        src={src} 
        alt={alt}
        className={cn(
          "rounded-full object-cover",
          sizeClasses[size]
        )}
      />
      {isOnline !== undefined && (
        <div className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-white",
          isOnline ? "bg-accent" : "bg-gray-400",
          size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
        )} />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;