import { defineConfig } from "astro/config";

// Integraciones:
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// Configuración de Markdown:
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { HEADING_LINK_ANCHOR } from "./src/components/ui/prose-headings";

import node from '@astrojs/node';

const vercelDeploy = {
  adapter: vercel(),
  output: "server" as const,
  site: "https://docshub.vercel.app",
}

const dockerDeploy = {
  output: "server" as const,
  adapter: node({
    mode: 'standalone',
  }),
}

// https://astro.build/config
export default defineConfig({
  ...dockerDeploy, 
  // ...vercelDeploy,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      shikiConfig: {
        theme: "one-dark-pro",
        wrap: true,
      },
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: [HEADING_LINK_ANCHOR],
            },
          },
        ],
      ],
      remarkPlugins: [remarkGfm],
    }),
  ],
});
