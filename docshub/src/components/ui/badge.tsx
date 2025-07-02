import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

interface BadgeProps {
  title?: string;
  className?: string;
  animate?: boolean;
  children?: ReactNode;
}

const Badge = (props: BadgeProps) => {
  return (
    <div
      title={props.title}
      className="relative inline-flex overflow-hidden rounded-full p-px"
    >
      {props.animate && (
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
      )}
      <span
        className={cx(
          "h-full w-full",
          "cursor-default",
          "bg-gray-100 dark:bg-gray-800",
          "border border-gray-300 dark:border-gray-700",
          "text-xs text-black dark:text-white",
          "inline-flex items-center justify-center space-x-2 rounded-full px-3 py-1",
          props.className,
        )}
      >
        {props.children}
      </span>
    </div>
  );
};

export default Badge;
