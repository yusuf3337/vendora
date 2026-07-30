import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "accent" | "glow";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer",
          {
            "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm": variant === "default",
            "bg-accent text-white hover:bg-orange-600 shadow-md shadow-orange-500/20":
              variant === "accent",
            "bg-accent text-white hover:bg-orange-600 shadow-[0_0_20px_rgba(255,69,0,0.35)] hover:shadow-[0_0_30px_rgba(255,69,0,0.5)]":
              variant === "glow",
            "border border-zinc-200 bg-white/80 text-zinc-900 hover:bg-zinc-100 hover:border-zinc-300 shadow-xs":
              variant === "outline",
            "bg-zinc-100 text-zinc-900 hover:bg-zinc-200": variant === "secondary",
            "hover:bg-zinc-100 hover:text-zinc-900 text-zinc-600": variant === "ghost",
            "h-10 px-6 py-2": size === "default",
            "h-8 px-4 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10 p-0 rounded-full": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
