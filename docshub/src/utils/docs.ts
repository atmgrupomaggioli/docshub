import type { CollectionEntry } from "astro:content";

interface AllDocsProperties {
  ignoreDocuments: string[];
  docs: CollectionEntry<"docs">[];
}

export const allDocs = (data: AllDocsProperties): CollectionEntry<"docs">[] => {
  return [
    ...data.docs
      .filter((doc) => !data.ignoreDocuments.includes(doc.id))
      .map((doc) => ({
        ...doc,
        slug: doc.id.startsWith("/") ? doc.id : `/${doc.id}`,
      }))
      .sort((a, b) => (a.data.order ?? Infinity) - (b.data.order ?? Infinity)),
  ];
};

interface SortDocsOptions {
  getDocs: CollectionEntry<"docs">[];
  options?: {
    ignoreDocs?: string[];
    categories?: string[] | null;
  };
}

interface CategoryGroup {
  category: string | null;
  docs: CollectionEntry<"docs">[];
}

export const sortDocs = ({
  getDocs,
  options,
}: SortDocsOptions): CategoryGroup[] => {
  // Ignore Documents
  const filteredDocs = getDocs.filter(
    (doc) => !options?.ignoreDocs?.includes(doc.id),
  );

  // Sort by order property
  const sortedByOrder = [...filteredDocs].sort((a, b) => {
    const orderA = a.data.order ?? Infinity;
    const orderB = b.data.order ?? Infinity;

    if (orderA === orderB) {
      return a.data.publishDate
        ? new Date(a.data.publishDate).getTime() -
            new Date(b.data.publishDate).getTime()
        : 0;
    }
    return orderA - orderB;
  });

  // Sort by date
  const sortedByDate = [...filteredDocs].sort((a, b) =>
    a.data.publishDate && b.data.publishDate
      ? new Date(a.data.publishDate).getTime() -
        new Date(b.data.publishDate).getTime()
      : 0,
  );

  // Order + Date
  const combinedArray = [
    ...new Set([
      ...sortedByOrder,
      ...sortedByDate.filter(
        (doc) => !sortedByOrder.some((orderedDoc) => orderedDoc.id === doc.id),
      ),
    ]),
  ];

  const categories = options?.categories ?? [
    ...new Set(
      combinedArray
        .map((doc) => doc.data.category)
        .filter((category): category is string => category !== undefined),
    ),
  ];

  const docsByCategory = [
    {
      category: null,
      docs: combinedArray.filter((doc) => !doc.data.category),
    },
    ...categories
      .filter(Boolean)
      .map((category) => ({
        category,
        docs: combinedArray.filter((doc) => doc.data.category === category),
      }))
      .filter((group) => group.docs.length > 0),
  ];

  return docsByCategory;
};
