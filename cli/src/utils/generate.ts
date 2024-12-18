import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';

import { resolve } from 'path';

// ⚙️ Properties:
import { iDocsProperties } from '../../../docshub/src/content.config';
import { createFile, createFolder } from './fileHelpers';
import { cancel, log } from '@clack/prompts';
import { dockerComposeUrl, gettingStartedUrl } from '@/globals';

export const generateMDX = async (filePath: string, filename: string, properties: iDocsProperties) => {
  const routesDocsFolder = path.resolve(filePath);
  const markdownFile = path.resolve(routesDocsFolder, `${filename}.mdx`);

  let content = `---
title: "${properties.title}"
sidebarTitle: "${properties.sidebarTitle}"
description: "${properties.description}"
publishDate: "${properties.publishDate}"`;

if (properties.category) {
  content += ` 
category: "${properties.category}"`;
}

if (properties.author?.name || properties.author?.url) {
  content += `
author: {`;
  if (properties.author.name) {
    content += `
  name: "${properties.author?.name}",`;
  }
  if (properties.author.url) {
    content += `
  url: "${properties.author?.url}"`;
  }
  content += `
}`;
}

content += `
--- 

## Hello World 👋

Here begins your new documentation...`;

  try {
    const dir = path.dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    await writeFile(markdownFile, content);
  } catch (error) {
    log.error(`Error creating file, have you created the workspace first?: ${error}.`);
    process.exit(1);
  }
};

export const generateWorkspace = async () => {
  const docsPath = resolve('docs');
  const imagesPath = resolve('images');
  const dockerComposePath = resolve('docker-compose.yml');
  const gettingStartedPath = resolve('docs/getting-started.mdx');

  createFolder(docsPath);
  createFolder(imagesPath);

  const responseCompose = await fetch(dockerComposeUrl);

  if (!responseCompose.ok) {
    log.error(`Failed to fetch docker-compose.yml: ${responseCompose.statusText}`);
    cancel('Failed to fetch docker-compose.yml');
    process.exit(1);
  }

  const dockerComposeContent = await responseCompose.text();

  createFile(dockerComposePath, dockerComposeContent.trim());

  const responseStarted = await fetch(gettingStartedUrl);

  if (!responseStarted.ok) {
    log.error(`Failed to fetch getting-started.mdx: ${responseStarted.statusText}`);
    cancel('Failed to fetch getting-started.mdxl');
    process.exit(1);
  }

  const startedContent = await responseStarted.text();

  createFile(gettingStartedPath, startedContent.trim());
}
