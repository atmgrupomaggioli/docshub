import { defineConfig } from "astro/config";

// Docshub Configuration:
import docshubConfig from "./docshub.config";

// Deployment integrations:
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

// UI integrations:
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// MDX Plugins:
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

import { mermaid } from "./src/components/mdx/plugins/mermaid";
import { targetBlank } from "./src/components/mdx/plugins/targetBlank";
import { remarkReadingTime } from "./src/components/mdx/plugins/remarkReadingTime.mjs";
import { HEADING_LINK_ANCHOR } from "./src/components/ui/prose-headings";

const vercelDeploy = {
  adapter: vercel(),
  output: "server" as const,
  site: "https://docshub.vercel.app",
};

const dockerProdDeploy = {
  output: "server" as const,
  adapter: node({
    mode: "standalone",
  }),
};

const dockerInteractiveDeploy = {
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    server:{
      host: "0.0.0.0",
      hmr: { clientPort: 4321 },
      port: 4321, 
      watch: { usePolling: true }
    }
  }
};

// https://astro.build/config
export default defineConfig({
  //...dockerInteractiveDeploy,
  //...dockerProdDeploy,
  ...vercelDeploy,
  redirects: {
    "/documentation-docker": "/docshub-docker",
    "/documentation-docshub": "/docshub-source",
    "/documentation-cli": "/docshub-cli",
  },
  devToolbar: {
    enabled: false
  },
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
        [targetBlank, { domain: docshubConfig.docsUrl }],
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
      remarkPlugins: [remarkGfm, remarkReadingTime, mermaid],
    }),
  ],
});
