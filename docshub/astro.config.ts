import { defineConfig } from "astro/config";

// Deployment integrations:
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

// UI integrations:
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// MDX Configuration:
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { remarkReadingTime } from "./src/components/mdx/plugins/remarkReadingTime.mjs";
import { HEADING_LINK_ANCHOR } from "./src/components/ui/prose-headings";

const vercelDeploy = {
  adapter: vercel(),
  output: "server" as const,
  site: "https://docshub.vercel.app",
};

const dockerDeploy = {
  output: "server" as const,
  adapter: node({
    mode: "standalone",
  }),
};

// https://astro.build/config
export default defineConfig({
  //...dockerDeploy,
  ...vercelDeploy,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      shikiConfig: {
        themes: {
          light: "github-light",
          dark: "github-dark-dimmed",
        },
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
      remarkPlugins: [remarkGfm, remarkReadingTime],
    }),
  ],
});
