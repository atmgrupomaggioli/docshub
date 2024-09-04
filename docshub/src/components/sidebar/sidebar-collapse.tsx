import type { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Image } from "astro:assets";
import MenuIcon from "../icons/menu";

interface SidebarCollapseProps {
  children: ReactNode;
}

const SidebarCollapse = (props: SidebarCollapseProps) => {
  return (
    <Sheet>
      <SheetTrigger className="block rounded-md p-2 transition-colors hover:bg-gray-800 md:hidden">
        <MenuIcon className="h-6" />
      </SheetTrigger>
      <SheetContent className="flex flex-col p-6 py-[12px] text-sm">
        <SheetHeader className="mb-3 flex w-full items-center justify-between border-b border-gray-800 py-2">
          <span>🔎 Docshub</span>
          <SheetClose className="hover:opacity-90">X</SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-1">{props.children}</nav>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarCollapse;
