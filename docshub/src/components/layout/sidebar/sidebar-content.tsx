import type { CollectionEntry } from "astro:content";
import { useState } from "react";
import { cx } from "@/utils/cx";
import {
  BoxIcon,
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
} from "@/components/ui/accordion";

import { convertCategory } from "@/utils/convertCategory";
import { Input } from "@/components/ui/input";
import { SidebarFolder, SidebarItemActive } from "../sidebar-item";

interface SidebarContentProps {
  docs: CollectionEntry<"docs">[];
  pathname: string;
  className?: string;
}

const SidebarContent = (props: SidebarContentProps) => {
  const [inputSearch, setInputSearch] = useState<string>("");

  // 📦 Ignore documents
  // Then, add the slug manually:
  const ignoreDocuments = ["ui"];

  const allDocs = [
    ...props.docs
      .filter((doc) => !ignoreDocuments.includes(doc.slug))
      .map((doc) => ({
        ...doc,
        slug: doc.slug.startsWith("/") ? doc.slug : `/${doc.slug}`,
      })),
  ];

  const filteredDocs = allDocs.filter(
    (doc) =>
      doc.data.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
      (doc.data.description &&
        doc.data.description.toLowerCase().includes(inputSearch.toLowerCase())),
  );

  const categories = Array.from(
    new Set(filteredDocs.map((doc) => doc.data.category)),
  );

  const docsByCategory = categories
    .map((category) => ({
      category,
      docs: filteredDocs.filter((doc) => doc.data.category === category),
    }))
    .filter((group) => group.docs.length > 0);

  // Document Styles:
  const iconStroke = 1.5;

  return (
    <div className={cx("flex flex-col space-y-4", props.className)}>
      <div className="relative w-full text-[12px]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <div className="pointer-events-none">
            <SearchIcon
              strokeWidth={iconStroke}
              size={16}
              className="text-gray-600 dark:text-gray-400"
            />
          </div>
        </div>
        <Input
          type="search"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search..."
          autoComplete="off"
          className={cx(
            "border-gray-300 pl-[36px] dark:border-gray-700",
            "focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600",
          )}
        />
      </div>
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
        <a
          href="/ui"
          className={cx(
            SidebarFolder,
            props.pathname === "/ui" && SidebarItemActive,
          )}
        >
          <div className="flex items-center space-x-3">
            <BoxIcon strokeWidth={iconStroke} size={16} />
            <span>Components</span>
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
                    SidebarFolder,
                    "py-4",
                    props.pathname.replace(/\/$/, "") === doc.slug &&
                      SidebarItemActive,
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
                    <FolderIcon strokeWidth={iconStroke} size={16} />
                    <span className="max-w-32 truncate">
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
                        "border-l border-gray-300 dark:border-gray-700",
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
