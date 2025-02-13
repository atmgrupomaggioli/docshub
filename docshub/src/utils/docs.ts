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
