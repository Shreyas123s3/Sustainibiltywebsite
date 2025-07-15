import React from "react";
import { cn } from "../../lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-xl overflow-hidden transition-all group",
        "hover:shadow-neon-green/30 hover:border-neon-green/40",
        "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:opacity-60 before:bg-gradient-to-br before:from-neon-green/10 before:to-transparent before:blur-sm",
        className
      )}
      {...props}
    >
      {/* Animated neon border */}
      <span className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-neon-green/60 transition-all animate-pulse" />
      {children}
    </div>
  )
);
Card.displayName = "Card";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent"; 