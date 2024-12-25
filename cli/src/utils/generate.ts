import * as clack from '@clack/prompts';

import { resolve } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { DocumentParams } from '@/types/types';
import { createFile, createFolder } from './fs.helper';
import { dockerComposeUrl, envReferenceUrl, envUrl, gettingStartedUrl } from '@/globals';

export async function generateMDX(route: string, fileName: string, content: DocumentParams) {
  const filePath = resolve(route, `${fileName}.mdx`);
  const directoryPath = resolve(route);

  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }

  let mdxContent = `---
title: "${content.documentTitle}"
description: "${content.description}"
sidebarTitle: "${content.sidebarTitle}"
publishDate: "${content.publishDate}"
`;

  if (content.category) {
    mdxContent += `category: "${content.category}"\n`;
  }

  if (content.authorName || content.authorUrl) {
    mdxContent += `author:\n`;
    if (content.authorName) {
      mdxContent += `  name: "${content.authorName}"\n`;
    }
    if (content.authorUrl) {
      mdxContent += `  url: "${content.authorUrl}"\n`;
    }
  }

  mdxContent += `---

## Hello World

🎉 Here’s your shiny new documentation entry. Go ahead, make it legendary!
`;

  writeFileSync(filePath, mdxContent.trim());

  clack.log.success(`✏️ You can now start editing your new document at:\n ${filePath}`);
}

export async function generateWorkspace() {
  const workspaceSpinner = clack.spinner();
  workspaceSpinner.start('Creating workspace structure...');

  const docsPath = resolve('docs');
  const imagesPath = resolve('images');
  const dockerComposePath = resolve('docker-compose.yml');
  const gettingStartedPath = resolve('docs/getting-started.mdx');
  const envPath = resolve('.env');

  workspaceSpinner.message(createFolder(docsPath));
  workspaceSpinner.message(createFolder(imagesPath));

  await fetchAndCreateFile(dockerComposeUrl, dockerComposePath, 'Failed to fetch docker-compose.yml');
  await fetchAndCreateFile(gettingStartedUrl, gettingStartedPath, 'Failed to fetch getting-started.mdx');
  await fetchAndCreateFile(envUrl, envPath, 'Failed to fetch .env');
  workspaceSpinner.message('Fetching file completed successfully');

  workspaceSpinner.stop('Workspace structure created successfully!');

  clack.note(`Some tips that will come in handy:
  · To learn how to modify the .env file and which fields are supported: 
    ${envReferenceUrl}
  · To get started DocsHub with 🐳 docker: 
    npx docshub interactive`);
}

const fetchAndCreateFile = async (url: string, path: string, errorMsg: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${errorMsg}: ${response.statusText}`);
    }
    const content = await response.text();
    return createFile(path, content.trim());
  } catch (error) {
    clack.cancel(errorMsg);
    process.exit(1);
  }
};
