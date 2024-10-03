/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

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

interface DocshubConfig {
    documentationTitle: string;
    version: string;
    author?: string;
    license?: LicenseType;
    repository?: DocshubRepository
}

interface DocshubRepository {
    type: RepositoryType;
    url: string;
  }

interface ImportMetaEnv {
    readonly DOCUMENTATION_TITLE: string;
    readonly VERSION: string;
    readonly AUTHOR: string;
    readonly LICENSE: LicenseType;
    readonly REPOSITORY_TYPE: RepositoryType;
    readonly REPOSITORY_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}