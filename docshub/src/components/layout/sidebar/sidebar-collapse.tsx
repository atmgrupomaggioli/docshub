import type { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../ui/sheet";
import defaultDocshubConfig from "docshub.config";
import { MenuIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface SidebarCollapseProps {
  children: ReactNode;
}

const SidebarCollapse = (props: SidebarCollapseProps) => {
  return (
    <Sheet>
      <SheetTrigger
        title="Toggle Menu"
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "block xl:hidden",
        })}
      >
        <MenuIcon size={22} />
      </SheetTrigger>
      <SheetContent className="flex flex-col p-6 py-3 text-sm" side={"left"}>
        <SheetHeader className="flex w-full justify-between py-2">
          <div className="flex items-center gap-2">
            <img
              className="h-6 w-6"
              src={defaultDocshubConfig().logoUrl}
              alt={defaultDocshubConfig().documentationTitle}
            />
            <p className="max-w-48 truncate text-lg font-bold">
              {defaultDocshubConfig().documentationTitle}
            </p>
          </div>
          <SheetClose className="hover:opacity-90"></SheetClose>
        </SheetHeader>
        <nav className="flex h-full flex-col overflow-y-auto">
          {props.children}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarCollapse;
