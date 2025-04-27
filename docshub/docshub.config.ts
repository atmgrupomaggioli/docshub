import type { DocshubConfig } from "@/env";

const defaultDocshubConfig: DocshubConfig = {
  documentationTitle:
    import.meta.env.DOCUMENTATION_TITLE || "DocsHub Documentation",
  version: import.meta.env.VERSION || "2.0.0",
  docsUrl: import.meta.env.DOCS_URL || "https://docshub.vercel.app",
  author: import.meta.env.AUTHOR || "DocsHub",
  faviconUrl: {
    png: import.meta.env.FAVICON_URL_PNG || "/assets/docshub_transparent.png",
    svg: import.meta.env.FAVICON_URL_SVG,
  },
  license: import.meta.env.LICENSE || "Proprietary",
  logoUrl: import.meta.env.LOGO_URL || "/assets/docshub_transparent.png",
  repository: {
    type: import.meta.env.REPOSITORY_TYPE || "GitHub",
    url:
      import.meta.env.REPOSITORY_URL ||
      "https://github.com/atmgrupomaggioli/docshub",
  },
  deployType: import.meta.env.DEPLOY_ENV || "vercel",
  url: import.meta.env.URL || "http://localhost:4321",
};

export default defaultDocshubConfig;
