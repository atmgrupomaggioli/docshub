const defaultDocshubConfig: DocshubConfig = {
  documentationTitle: import.meta.env.DOCUMENTATION_TITLE || "Docshub Demo",
  version: import.meta.env.VERSION || "2.0.0",
  docsUrl: import.meta.env.DOCS_URL || "https://docshub.vercel.app",
  author: import.meta.env.AUTHOR || "Author's name",
  license: import.meta.env.LICENSE || "Proprietary",
  logoUrl:
    import.meta.env.LOGO_URL ||
    "https://github.com/atmgrupomaggioli/docshub/blob/main/docshub/public/logo/docshub_transparent.png?raw=true",
  repository: {
    type: import.meta.env.REPOSITORY_TYPE || "GitHub",
    url:
      import.meta.env.REPOSITORY_URL ||
      "https://github.com/atmgrupomaggioli/docshub",
  },
};

export default defaultDocshubConfig;
