import * as clack from '@clack/prompts';

import { resolve } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { DocumentParams } from '@/types/types';
import { createFolder, fetchAndCreateFile } from './file';
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

  mdxContent += `icon: "${content.icon}"
order: ${parseInt(content.order)}
`;

  mdxContent += `---

## Hello World

🎉 Here’s your shiny new documentation entry. Go ahead, make it legendary!
`;

  writeFileSync(filePath, mdxContent.trim());

  clack.log.success(`✏️ You can now start editing your new document at:\n ${filePath}`);
}

export async function generateWorkspace() {
  clack.log.step('Creating workspace structure...');

  const docsPath = resolve('docs');
  const imagesPath = resolve('images');
  const dockerComposePath = resolve('docker-compose.yml');
  const gettingStartedPath = resolve('docs/getting-started.mdx');
  const envPath = resolve('.env');

  await createFolder(docsPath);
  clack.log.info('Created /docs folder successfully!');
  await createFolder(imagesPath);
  clack.log.info('Created /images folder successfully!');

  await fetchAndCreateFile(dockerComposeUrl, dockerComposePath, 'Failed to fetch docker-compose.yml');
  clack.log.info('Created docker-compose.yml file successfully!');
  await fetchAndCreateFile(gettingStartedUrl, gettingStartedPath, 'Failed to fetch getting-started.mdx');
  clack.log.info('Created docs/getting-started.mdx file successfully!');
  await fetchAndCreateFile(envUrl, envPath, 'Failed to fetch .env');
  clack.log.info('Created .env file successfully!');

  clack.log.success('Workspace structure created successfully!');

  clack.note(`Some tips that will come in handy:
  · To learn how to modify the .env file:
    ${envReferenceUrl}
  · To get started DocsHub with 🐳 docker: 
    npx docshub interactive`);
}
