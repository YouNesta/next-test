import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className={cn(
            "peer h-5 w-5 shrink-0 rounded border-2 border-white/40 bg-white/30 backdrop-blur-md appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        <Check className="absolute h-4 w-4 pointer-events-none hidden peer-checked:block text-gray-800 left-0.5" />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
