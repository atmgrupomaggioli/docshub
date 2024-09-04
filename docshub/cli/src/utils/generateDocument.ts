import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';

// ⚙️ Properties:
import { iDocsProperties } from '../../../src/content/config';

export const generateDocument = async (filePath: string, filename: string, properties: iDocsProperties) => {
  const routesDocsFolder = path.resolve(filePath);
  const markdownFile = path.resolve(routesDocsFolder, `${filename}.mdx`);
  const content = `---
title: "${properties.title}"
sidebarTitle: "${properties.sidebarTitle}"
description: "${properties.description}"
category: "${properties.category}"
publishDate: "${properties.publishDate}"
---

## Hola Mundo 👋

Aquí comienza tu nueva documentación...
`;

  try {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write the content to the file
    await writeFile(markdownFile, content);
  } catch (error) {
    console.error('Error creating file:', error);
  }
};
