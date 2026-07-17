import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-[0_0_0_1px_rgba(229,57,53,0.4),0_8px_30px_-6px_rgba(229,57,53,0.55)] hover:shadow-[0_0_0_1px_rgba(229,57,53,0.6),0_12px_40px_-6px_rgba(229,57,53,0.75)] hover:-translate-y-0.5",
        outline:
          "border border-border text-foreground hover:border-primary/40 hover:bg-foreground/5",
        ghost: "text-foreground hover:bg-foreground/5",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
