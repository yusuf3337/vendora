import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "glow";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200",
        {
          "border-transparent bg-zinc-100 text-zinc-800": variant === "default",
          "border-accent/30 bg-accent/10 text-accent": variant === "accent",
          "border-accent/40 bg-accent/15 text-orange-600 shadow-xs": variant === "glow",
          "border-zinc-200 bg-white/80 text-zinc-700 backdrop-blur-md shadow-2xs":
            variant === "secondary",
          "border-zinc-300 text-zinc-600": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
