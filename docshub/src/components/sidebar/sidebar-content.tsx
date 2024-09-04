import type { CollectionEntry } from "astro:content";
import { useState } from "react";
import { cx } from "@/utils/cx";
import {
  CornerDownRightIcon,
  FileIcon,
  FileSearch2Icon,
  FolderIcon,
  HouseIcon,
  SearchIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { buttonVariants } from "../ui/button";
import { convertCategory } from "@/utils/convertCategory";

interface SidebarContentProps {
  docs: CollectionEntry<"docs">[];
  pathname: string;
  className?: string;
}

const SidebarContent = (props: SidebarContentProps) => {
  const [inputSearch, setInputSearch] = useState<string>("");
  // All docs + custom links:
  const allDocs = [
    ...props.docs.map((doc) => ({
      ...doc,
      slug: doc.slug.startsWith("/") ? doc.slug : `/${doc.slug}`,
    })),
  ];

  // Filter only the docs that match the search:
  const filteredDocs = allDocs.filter(
    (doc) =>
      doc.data.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
      (doc.data.description &&
        doc.data.description.toLowerCase().includes(inputSearch.toLowerCase())),
  );

  // Obtain all unique categories:
  const categories = Array.from(
    new Set(filteredDocs.map((doc) => doc.data.category)),
  );

  // Group docs by category:
  const docsByCategory = categories.map((category) => ({
    category,
    docs: filteredDocs.filter((doc) => doc.data.category === category),
  }));

  // Document Styles:
  const docItemClasses = cx(
    "ml-[10px] truncate border-l border-gray-700 py-2 pl-4 text-gray-400 hover:text-white transition-colors",
  );
  const iconStroke = 1.5;

  return (
    <div className={cx("flex flex-col space-y-3 p-4", props.className)}>
      <div className="relative w-full text-[12px]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <div className="pointer-events-none">
            <SearchIcon
              strokeWidth={iconStroke}
              size={16}
              className="text-gray-400"
            />
          </div>
        </div>
        <input
          type="search"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search..."
          autoComplete="off"
          className="w-full rounded-md border border-gray-800 bg-gray-800/20 py-2 pl-10 pr-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
      </div>
      <nav className="flex w-full flex-col space-y-1 text-sm font-medium">
        <a
          href="/"
          className={cx(
            buttonVariants({
              variant: "ghost",
            }),
            "w-full justify-between px-1.5 text-gray-400",
            props.pathname === "/" && "text-white",
          )}
        >
          <div className="flex items-center space-x-3">
            <HouseIcon strokeWidth={iconStroke} size={16} />
            <span>Introduction</span>
          </div>
        </a>
        {inputSearch ? (
          <div className="flex flex-col">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <a
                  key={doc.slug}
                  href={doc.slug}
                  title={doc.slug}
                  className={cx(
                    docItemClasses,
                    props.pathname.replace(/\/$/, "") === doc.slug &&
                      "border-gray-400 text-white",
                  )}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                      <FileIcon strokeWidth={iconStroke} size={16} />
                      <span>{doc.data.sidebarTitle}</span>
                    </div>
                    <div className="ml-[6px] flex items-center space-x-3">
                      <CornerDownRightIcon strokeWidth={iconStroke} size={16} />
                      <span>{convertCategory(doc.data.category)}</span>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 p-2 text-gray-400">
                <FileSearch2Icon strokeWidth={1.5} size={25} />
                <p>No hay resultados</p>
              </div>
            )}
          </div>
        ) : docsByCategory.length > 0 ? (
          docsByCategory.map((category) => (
            <Accordion
              type="single"
              defaultValue={
                category.docs.some(
                  (doc) => doc.slug === props.pathname.replace(/\/$/, ""),
                )
                  ? category.category
                  : ""
              }
              className="flex flex-col space-y-2"
              collapsible
            >
              <AccordionItem
                key={category.category}
                value={category.category}
                className="border-none"
              >
                <AccordionTrigger
                  className={buttonVariants({
                    variant: "ghost",
                    className: cx(
                      "w-full justify-between px-2 text-gray-400 hover:text-white",
                      category.docs.some(
                        (doc) => doc.slug === props.pathname.replace(/\/$/, ""),
                      ) && "text-white",
                    ),
                  })}
                >
                  <div className="flex items-center space-x-3">
                    <FolderIcon strokeWidth={iconStroke} size={16} />
                    <span>{convertCategory(category.category)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex w-full flex-col">
                  {category.docs.map((doc) => (
                    <a
                      key={doc.slug}
                      href={doc.slug}
                      className={cx(
                        docItemClasses,
                        props.pathname.replace(/\/$/, "") === doc.slug &&
                          "border-gray-400 text-white",
                      )}
                    >
                      {doc.data.sidebarTitle}
                    </a>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 p-2 text-gray-400">
            <FileSearch2Icon strokeWidth={1.5} size={25} />
            <p>No hay resultados</p>
          </div>
        )}
      </nav>
    </div>
  );
};

export default SidebarContent;
