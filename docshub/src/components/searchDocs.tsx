import { CommandDialog, CommandInput } from "./ui/command";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./ui/button";
import { CommandIcon, SearchIcon } from "lucide-react";

interface iSearchDocs {
  children: ReactNode;
}

const SearchDocs = ({ children }: iSearchDocs) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="justify-between px-2 text-gray-500 dark:text-gray-400"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="flex items-center space-x-2">
          <SearchIcon size={16} strokeWidth={1.5} />
          <span>Search...</span>
        </div>
        <div className="flex items-center space-x-1">
          <CommandIcon size={12} />
          <span className="font-mono tracking-tight">k</span>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search docs..." />
        {children}
      </CommandDialog>
    </>
  );
};

export default SearchDocs;
