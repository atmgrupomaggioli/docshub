import { z } from "zod";

const LicenseTypeEnum = z.enum([
  "MIT",
  "GPL-3.0",
  "Apache-2.0",
  "BSD-3-Clause",
  "MPL-2.0",
  "LGPL-3.0",
  "AGPL-3.0",
  "Unlicense",
  "CC0-1.0",
  "Proprietary",
]);

const RepositoryTypeEnum = z.enum(["GitHub", "GitLab", "BitBucket"]);

const RepositoryType = z
.object({
  type: RepositoryTypeEnum.optional().default("GitHub"),
  url: z.string().url(),
})
.optional()
.default({
  type: "GitHub",
  url: "https://github.com/atmgrupomaggioli/docshub",
});

const DeployTypeEnum = z.enum(["vercel", "docker-interactive", "docker-prod"]);

const FaviconType = z.object({
  png: z.string().default("/assets/docshub_transparent.png"),
  svg: z.string().optional(),
});

export const DocshubConfigSchema = z.object({
  documentationTitle: z.string().default("DocsHub Documentation"),
  version: z.string().default("2.0.0"),
  docsUrl: z.string().url().default("https://docshub.vercel.app"),
  faviconUrl: FaviconType,
  author: z.string().optional(),
  logoUrl: z.string().optional().default("/assets/docshub_transparent.png"),
  license: LicenseTypeEnum.optional().default("Proprietary"),
  repository: RepositoryType,
  deployType: DeployTypeEnum.optional().default("vercel"),
  url: z.string().url().optional(),
});