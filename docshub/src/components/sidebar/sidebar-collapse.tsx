import type { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import MenuIcon from "../icons/menu";

interface SidebarCollapseProps {
  children: ReactNode;
}

const SidebarCollapse = (props: SidebarCollapseProps) => {
  return (
    <Sheet>
      <SheetTrigger className="block rounded-md p-2 transition-colors hover:bg-gray-800 xl:hidden">
        <MenuIcon className="h-6" />
      </SheetTrigger>
      <SheetContent className="flex flex-col p-6 py-[12px] text-sm" side={'left'}>
        <SheetHeader className="mb-3 flex w-full justify-between border-b border-gray-800 py-2">
          <div className="flex items-center gap-2">
            <img
              className="h-6 w-6"
              src="/logo/docshub_transparent.png"
              alt="Docshub Logo"
            />
            <span className="font-bold text-xl">Docshub</span>
          </div>
          <SheetClose className="hover:opacity-90">
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-1">{props.children}</nav>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarCollapse;
