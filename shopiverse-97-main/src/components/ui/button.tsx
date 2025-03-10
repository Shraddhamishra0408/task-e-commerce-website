
// Rename Button.tsx to button.tsx (lowercase)
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", size = "md", isLoading = false, fullWidth = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-shop-accent text-white hover:bg-shop-accent/90 shadow-sm": variant === "primary",
            "bg-shop-dark text-white hover:bg-shop-dark/90": variant === "secondary",
            "border border-shop-dark/20 bg-transparent hover:bg-shop-light": variant === "outline",
            "bg-transparent hover:bg-shop-light/60": variant === "ghost",
            "bg-transparent underline-offset-4 hover:underline p-0 h-auto": variant === "link",
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-5 text-base": size === "md",
            "h-12 px-8 text-lg": size === "lg",
            "w-full": fullWidth,
          },
          "button-hover-effect",
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={cn({ "opacity-0": isLoading })}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

// Add the buttonVariants export that's needed by alert-dialog.tsx
export const buttonVariants = ({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
} = {}) => {
  return cn(
    "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-shop-accent text-white hover:bg-shop-accent/90 shadow-sm": variant === "primary",
      "bg-shop-dark text-white hover:bg-shop-dark/90": variant === "secondary",
      "border border-shop-dark/20 bg-transparent hover:bg-shop-light": variant === "outline",
      "bg-transparent hover:bg-shop-light/60": variant === "ghost",
      "bg-transparent underline-offset-4 hover:underline p-0 h-auto": variant === "link",
      "h-9 px-3 text-sm": size === "sm",
      "h-11 px-5 text-base": size === "md",
      "h-12 px-8 text-lg": size === "lg",
    },
    "button-hover-effect",
    className
  );
};

export { Button };
