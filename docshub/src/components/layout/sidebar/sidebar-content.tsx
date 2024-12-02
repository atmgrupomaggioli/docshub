import type { CollectionEntry } from "astro:content";
import { cx } from "@/utils/cx";

import { BoxIcon, FileIcon, FolderIcon, HouseIcon } from "lucide-react";

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
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import SearchDocs from "@/components/searchDocs";

import { convertCategory } from "@/utils/convertCategory";
import { SidebarFolder, SidebarItemActive } from "../sidebar-item";

interface SidebarContentProps {
  docs: CollectionEntry<"docs">[];
  pathname: string;
  className?: string;
}

// 📦 Ignore documents
// Then, add the slug manually:
const ignoreDocuments = ["getting-started"];

const SidebarContent = (props: SidebarContentProps) => {
  const allDocs = [
    ...props.docs
      .filter((doc) => !ignoreDocuments.includes(doc.slug))
      .map((doc) => ({
        ...doc,
        slug: doc.slug.startsWith("/") ? doc.slug : `/${doc.slug}`,
      })),
  ];

  const categories = Array.from(
    new Set(allDocs.map((doc) => doc.data.category)),
  );

  const docsByCategory = categories
    .map((category) => ({
      category,
      docs: allDocs.filter((doc) => doc.data.category === category),
    }))
    .filter((group) => group.docs.length > 0);

  const handleGoToDoc = (slug: string) => {
    window.location.href = `${slug}`;
  };

  // Document Styles:
  const iconStroke = 1.5;

  return (
    <div className={cx("flex flex-col space-y-4", props.className)}>
      <SearchDocs>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {docsByCategory.map((category, index) => (
            <>
              <CommandGroup
                heading={convertCategory(category.category)}
                key={category.category}
              >
                {category.docs.map((doc) => (
                  <CommandItem
                    key={doc.slug}
                    onSelect={() => handleGoToDoc(doc.slug)}
                    className="flex flex-col justify-start"
                  >
                    <span>{doc.data.sidebarTitle}</span>
                    <span className="truncate text-gray-500">
                      {doc.data.description}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          ))}
        </CommandList>
      </SearchDocs>
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
        {docsByCategory.length > 0 &&
          docsByCategory.map((category) => (
            <Accordion
              key={category.category}
              type="single"
              defaultValue={
                category.docs.some(
                  (doc) => doc.slug === props.pathname.replace(/\/$/, ""),
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
                      (doc) => doc.slug === props.pathname.replace(/\/$/, ""),
                    ) && "font-medium text-gray-900 dark:text-gray-50",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {category.category === "components" ? (
                      <BoxIcon strokeWidth={iconStroke} size={16} />
                    ) : (
                      <FolderIcon strokeWidth={iconStroke} size={16} />
                    )}
                    <span className="max-w-28 truncate">
                      {convertCategory(category.category)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mb-2 flex w-full flex-col">
                  {category.docs.map((doc) => (
                    <a
                      key={doc.slug}
                      href={doc.slug}
                      title={doc.data.sidebarTitle}
                      className={cx(
                        SidebarFolder,
                        "border-l border-gray-300 dark:border-gray-800",
                        "ml-[14px]",
                        props.pathname.replace(/\/$/, "") === doc.slug &&
                          SidebarItemActive,
                      )}
                    >
                      <FileIcon strokeWidth={iconStroke} size={16} />
                      <span className="max-w-40 truncate">
                        {doc.data.sidebarTitle}
                      </span>
                    </a>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </nav>
    </div>
  );
};

export default SidebarContent;
