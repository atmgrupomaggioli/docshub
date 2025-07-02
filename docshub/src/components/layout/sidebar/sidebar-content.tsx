import type { CollectionEntry } from "astro:content";
import { cx } from "@/utils/cx";

import {
  FileIcon,
  FolderIcon,
  HouseIcon,
  icons,
  type LucideIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandItemDescription,
  CommandList,
} from "@/components/ui/command";

import SearchDocs from "@/components/searchDocs";
import { SidebarFolder, SidebarItemActive } from "../sidebar-item";

import { convertCategory } from "@/utils/convertCategory";
import { sortDocs } from "@/utils/docs";

interface SidebarContentProps {
  docs: CollectionEntry<"docs">[];
  pathname: string;
  className?: string;
}

// 📦 Ignore documents
// Then, add the slug manually:
const ignoreDocuments = ["getting-started"];

const SidebarContent = (props: SidebarContentProps) => {
  const categorizedDocs = sortDocs({
    getDocs: props.docs,
    options: {
      ignoreDocs: ignoreDocuments,
    },
  });

  const findLucideIcon = (componentName: string): LucideIcon => {
    const found =
      Object.entries(icons).find(
        ([key]) => key.toLowerCase() === componentName.toLowerCase(),
      )?.[1] ?? FileIcon;
    return found;
  };

  const handleGoToDoc = (slug: string) => {
    window.location.href = `${slug}`;
  };

  // Document Styles:
  const iconStroke = 1.5;

  return (
    <div className={cx("flex flex-col space-y-4", props.className)}>
      {/* Command K Search Modal */}
      <SearchDocs>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {categorizedDocs.map((category) => {
            if (!category.category) {
              return category.docs.map((doc) => (
                <CommandGroup key={doc.id}>
                  <CommandItem
                    key={doc.id}
                    onSelect={() => handleGoToDoc(doc.id)}
                    className="flex flex-col justify-start"
                  >
                    <span>{doc.data.title}</span>
                    <span className={CommandItemDescription}>
                      {doc.data.description}
                    </span>
                  </CommandItem>
                </CommandGroup>
              ));
            }
            return (
              <CommandGroup
                key={category.category}
                heading={convertCategory(category.category)}
              >
                {category.docs.map((doc) => (
                  <CommandItem
                    key={doc.id}
                    onSelect={() => handleGoToDoc(doc.id)}
                    className="flex flex-col justify-start"
                  >
                    <span>{doc.data.title}</span>
                    <span className={CommandItemDescription}>
                      {doc.data.description}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </SearchDocs>
      {/* Nav Links */}
      <nav className="flex w-full flex-col text-sm">
        <a
          href="/"
          className={cx(
            SidebarFolder,
            props.pathname === "/" && SidebarItemActive,
          )}
        >
          <div className="flex items-center space-x-3">
            <HouseIcon strokeWidth={iconStroke} size={16} />
            <span>Introduction</span>
          </div>
        </a>
        {categorizedDocs.length > 0 &&
          categorizedDocs.map((category) => {
            if (!category.category) {
              return category.docs.map((doc) => {
                const DocIcon = findLucideIcon(doc.data.icon ?? "");
                return (
                  <a
                    key={doc.id}
                    href={doc.id}
                    className={cx(
                      SidebarFolder,
                      props.pathname === `/${doc.id}` && SidebarItemActive,
                    )}
                  >
                    <DocIcon strokeWidth={iconStroke} size={16} />
                    <span className="max-w-40 truncate">
                      {doc.data.sidebarTitle}
                    </span>
                  </a>
                );
              });
            }
            return (
              <Accordion
                key={category.category}
                type="single"
                defaultValue={
                  category.docs.some(
                    (doc) =>
                      doc.id.replace(/^\/|\/$/g, "") ===
                      props.pathname.replace(/^\/|\/$/g, ""),
                  )
                    ? category.category
                    : ""
                }
                className="flex flex-col space-y-2"
                collapsible={true}
              >
                <AccordionItem
                  key={category.category}
                  value={category.category}
                  className="border-none"
                >
                  <AccordionTrigger
                    title={convertCategory(category.category)}
                    className={cx(
                      SidebarFolder,
                      "justify-between",
                      category.docs.some(
                        (doc) =>
                          doc.id.replace(/^\/|\/$/g, "") ===
                          props.pathname.replace(/^\/|\/$/g, ""),
                      ) && "font-medium text-gray-900 dark:text-gray-50",
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <FolderIcon strokeWidth={iconStroke} size={16} />
                      <span className="max-w-28 truncate">
                        {convertCategory(category.category)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mb-2 flex w-full flex-col">
                    {category.docs.map((doc) => {
                      const DocIcon = findLucideIcon(doc.data.icon ?? "");
                      return (
                        <a
                          key={doc.id}
                          href={doc.id}
                          title={doc.data.sidebarTitle}
                          className={cx(
                            SidebarFolder,
                            "border-l border-gray-300 dark:border-gray-800",
                            "ml-[14px]",
                            doc.id.replace(/^\/|\/$/g, "") ===
                              props.pathname.replace(/^\/|\/$/g, "") &&
                              SidebarItemActive,
                          )}
                        >
                          <DocIcon strokeWidth={iconStroke} size={16} />
                          <span className="max-w-[138px] truncate">
                            {doc.data.sidebarTitle}
                          </span>
                        </a>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
      </nav>
    </div>
  );
};

export default SidebarContent;
