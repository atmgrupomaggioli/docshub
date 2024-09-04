import { defineCollection } from "astro:content";
import { z } from "zod";

const defaultSiteConfig = {
  title: "Docshub",
  description: "MangoLibs Docs",
};

const docsProperties = z.object({
  title: z.string().default(defaultSiteConfig.title),
  sidebarTitle: z.string().min(1).max(25, {
    message: "El máximo para el título del menú son 25 caracteres",
  }),
  description: z.string().default(defaultSiteConfig.description),
  category: z.string().toLowerCase().min(1).max(17, {
    message: "El máximo para la categoría son 25 caracteres",
  }),
  publishDate: z.string().default(new Date().toISOString().split("T")[0]),
});

const docs = defineCollection({
  schema: docsProperties,
});

export type iDocsProperties = z.infer<typeof docsProperties>;
export const collections = { docs };
