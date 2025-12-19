import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "default";
  size?: "default" | "icon";
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const baseStyles =
      variant === "primary"
        ? "bg-brand-600 text-white hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400"
        : variant === "outline"
        ? "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        : variant === "default"
        ? "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        : "bg-transparent text-brand-600 hover:bg-brand-100 dark:text-brand-300 dark:hover:bg-slate-800";
    const sizeStyles =
      size === "icon"
        ? "p-2 min-h-[2.25rem] min-w-[2.25rem] h-9 w-9"
        : "px-4 py-2";
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition",
          baseStyles,
          sizeStyles,
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
