import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cx } from "@/utils/cx";

const buttonVariants = cva(
  "inline-flex space-x-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-gray-700",
  {
    variants: {
      variant: {
        default:
          "shadow bg-gray-50 text-gray-900 hover:bg-gray-50/90",
        destructive:
          "shadow-sm hover:bg-red-500/90 bg-red-900 text-gray-50 bg-red-900/90",
        outline:
          "border shadow-sm hover:bg-gray-100 hover:text-gray-900 border-gray-800 bg-gray-900 hover:bg-gray-800 hover:text-gray-50",
        secondary:
          "shadow-sm hover:bg-gray-100/80 bg-gray-800 text-gray-50 hover:bg-gray-800/80",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 hover:bg-gray-800 hover:text-gray-50",
        link: "text-gray-900 underline-offset-4 hover:underline text-gray-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
