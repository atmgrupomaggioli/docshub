import { defineConfig } from "astro/config";

// Integrations:
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// Markdown Config:
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { HEADING_LINK_ANCHOR } from "./src/components/ui/prose-headings";

const vercelDeploy = {
  adapter: vercel(),
  output: "server",
  site: "https://docshub.vercel.app",
}

const dockerDeploy = {
  vite: {
    server:{
      host: "0.0.0.0",
      hmr: { clientPort: 4321 },
      port: 4321, 
      watch: { usePolling: true }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
}

// https://astro.build/config
export default defineConfig({
  ...dockerDeploy,
  // adapter: vercel(),
  // output: "server",
  // site: "https://docshub.vercel.app",
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
