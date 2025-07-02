import { defineConfig } from "astro/config";

// Docshub Configuration:
// import docshubConfig from "./docshub.config";
import { getDeploymentConfig } from "./deployment.config";

// UI integrations:
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// External MDX Plugins:
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

// Custom MDX Plugins:
import { mermaid } from "./src/components/mdx/plugins/mermaid";
import { targetBlank } from "./src/components/mdx/plugins/targetBlank";
import { remarkReadingTime } from "./src/components/mdx/plugins/remarkReadingTime.mjs";
import { remarkModifiedTime } from "./src/components/mdx/plugins/remarkModifiedTime.mjs";
import { HEADING_LINK_ANCHOR } from "./src/components/ui/prose-headings";
import defaultDocshubConfig from "./docshub.config";

// https://astro.build/config
export default defineConfig({
  ...getDeploymentConfig(),
  redirects: {
    "/documentation-docker": "/docshub-docker",
    "/documentation-docshub": "/docshub-source",
    "/documentation-cli": "/docshub-cli",
  },
  devToolbar: {
    enabled: false,
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
        [targetBlank, { domain: defaultDocshubConfig().docsUrl }],
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
      remarkPlugins: [
        remarkModifiedTime,
        remarkGfm,
        remarkReadingTime,
        mermaid,
      ],
    }),
  ],
});
