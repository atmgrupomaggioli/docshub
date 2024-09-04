type LicenseType =
  | "MIT"
  | "GPL-3.0"
  | "Apache-2.0"
  | "BSD-3-Clause"
  | "MPL-2.0"
  | "LGPL-3.0"
  | "AGPL-3.0"
  | "Unlicense"
  | "CC0-1.0"
  | "Proprietary";

type RepositoryType =
  | "github"
  | "gitlab"
  | "bitbucket";

interface DocshubRepository {
  type: RepositoryType;
  url: string;
}

interface DocshubConfig {
  documentationTitle: string;
  version: string;
  author?: string;
  license?: LicenseType;
  repository?: DocshubRepository
}

const defaultDocshubConfig: DocshubConfig = {
  documentationTitle: "Example documentation site",
  version: "0.0.1",
  author: "Author's name",
  license: "Proprietary",
  repository: {
    type: "github",
    url: "https://github.com/atmgrupomaggioli/docshub"
  }
};

export default defaultDocshubConfig;
