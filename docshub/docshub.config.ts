const defaultDocshubConfig: DocshubConfig = {
  documentationTitle: import.meta.env.DOCUMENTATION_TITLE || "Example documentation site 2",
  version: import.meta.env.VERSION || "0.0.1",
  author: import.meta.env.AUTHOR || "Author's name",
  license: import.meta.env.LICENSE || "Proprietary",
  repository: {
    type: import.meta.env.REPOSITORY_TYPE || "github",
    url: import.meta.env.REPOSITORY_URL || "https://github.com/atmgrupomaggioli/docshub"
  }
};

export default defaultDocshubConfig;