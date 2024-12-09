import type { MarkdownHeading } from "astro";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { TableOfContentsIcon } from "lucide-react";
import { SidebarFolder } from "../sidebar-item";
import { cx } from "@/utils/cx";
import { buttonVariants } from "@/components/ui/button";

interface SidebarCollapseProps {
  headings: MarkdownHeading[];
}

const SidebarTocCollapse = (props: SidebarCollapseProps) => {
  return (
    <Sheet key="right">
      <SheetTrigger
        className={buttonVariants({
          variant: "outline",
          className:
            "mb-2 w-full rounded-none border-l-0 border-r-0 border-t-0 bg-transparent shadow-none",
        })}
      >
        <TableOfContentsIcon size={16} />
        <span>On this page</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-6 py-[12px] text-sm">
        <SheetHeader className="mb-3 flex justify-between border-b border-gray-200 py-1 dark:border-gray-800">
          <SheetTitle>On this page</SheetTitle>
          <SheetClose className="hover:opacity-90"></SheetClose>
        </SheetHeader>
        <nav className="flex flex-col overflow-y-auto">
          {props.headings.map((heading) => (
            <a
              key={heading.id}
              title={heading.text}
              href={`#${heading.id}`}
              className={cx(
                SidebarFolder,
                "border-gray-300 dark:border-gray-800",
                "hover:font-medium",
              )}
            >
              <span className="max-w-44 truncate">{heading.text}</span>
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default SidebarTocCollapse;
