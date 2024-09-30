import type { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";

interface SidebarCollapseProps {
  children: ReactNode;
}

const SidebarCollapse = (props: SidebarCollapseProps) => {
  return (
    <Sheet>
      <SheetTrigger className="fixed right-3 rounded-md p-2 transition-colors hover:bg-gray-800 xl:hidden">
        Icono Toc
      </SheetTrigger>
      <SheetContent className="flex flex-col p-6 py-[12px] text-sm">
        <SheetHeader className="mb-3 flex w-full items-center justify-between border-b border-gray-800 py-2">
          <span>On this page</span>
          <SheetClose className="hover:opacity-90">
            aqui icono
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-1">{props.children}</nav>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarCollapse;
