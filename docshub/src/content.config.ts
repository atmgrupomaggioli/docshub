import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

import { icons } from "lucide-react"

const availableIcons = Object.keys(icons) as [string, ...string[]];

const defaultSiteConfig = {
  title: "DocsHub",
  description: "Markdown Documentation with Vitamins",
};

const docsProperties = z.object({
  title: z.string().default(defaultSiteConfig.title),
  sidebarTitle: z.string().min(1).max(25, {
    message: "El máximo para el título del menú son 25 caracteres",
  }),
  description: z.string().default(defaultSiteConfig.description),
  category: z
    .string()
    .toLowerCase()
    .min(1)
    .max(17, {
      message: "El máximo para la categoría son 25 caracteres",
    })
    .optional(),
  publishDate: z.string().default(new Date().toISOString().split("T")[0]),
  author: z
    .object({
      name: z.string().min(1).max(25, {
        message: "El máximo para el nombre de autor son 25 caracteres",
      }),
      url: z.string().url().optional(),
    })
    .optional(),
  order: z
    .number()
    .positive({
      message: "⚠️ Order must be a positive number.",
    })
    .optional(),
  icon: z.enum(availableIcons, {message: "Invalid icon name. Please use a correct Component Name from the available Lucide icons https://lucide.dev/icons"}).optional(),
});

const docs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/docs" }),
  schema: docsProperties,
});

export type iDocsProperties = z.infer<typeof docsProperties>;
export const collections = { docs };
