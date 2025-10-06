import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const Group = ({ 
  name, 
  count = 0, 
  variant = "default",
  className,
  ...props 
}) => {
  const variantStyles = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border text-sm font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span>{name}</span>
      {count > 0 && (
        <Badge 
          variant={variant === "default" ? "secondary" : variant}
          className="min-w-[20px] h-5 flex items-center justify-center"
        >
          {count}
        </Badge>
      )}
    </div>
  );
};

export default Group;