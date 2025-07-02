import * as React from "react";

import { cx } from "@/utils/cx";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cx(
          "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-gray-800 dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-700",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
