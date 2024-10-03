import type { ReactNode } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { TableOfContentsIcon } from 'lucide-react';

interface SidebarCollapseProps {
  children: ReactNode;
}

const SidebarCollapse = (props: SidebarCollapseProps) => {

  return (
    <Sheet key={'right'}>
      <SheetTrigger className="fixed right-3 top-16 rounded-md p-2 m-4 z-50 transition-colors border border-gray-600 bg-gray-800 hover:bg-gray-900 xl:hidden">
        <TableOfContentsIcon size={25} />
      </SheetTrigger>
      <SheetContent className="flex flex-col p-6 py-[12px] text-sm">
        <SheetHeader className="mb-3 flex justify-between border-b border-gray-800 py-2">
          <span className="font-bold text-xl">On this page</span>
          <SheetClose className="hover:opacity-90">
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-1">{props.children}</nav>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarCollapse;
