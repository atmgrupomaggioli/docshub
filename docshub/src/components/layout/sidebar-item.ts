import { cx } from "@/utils/cx";
import { buttonVariants } from "../ui/button";

export const SidebarFolder = cx(
  buttonVariants({
    variant: "ghost",
  }),
  "px-3 py-2",
  "truncate w-full",
  "font-normal",
  "justify-start",
  "rounded-none",
  "text-gray-600 dark:text-gray-400",
  "hover:bg-gray-300/60 dark:hover:bg-gray-800/70",
  "border-l border-gray-300 dark:border-gray-700",
);

export const SidebarItemActive = cx(
  SidebarFolder,
  "font-medium",
  "justify-start",
  "text-gray-900 dark:text-gray-50",
  "border-l border-gray-500 dark:border-gray-400",
);
