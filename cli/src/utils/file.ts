import { mkdirSync, writeFileSync, existsSync } from 'fs';
import * as clack from '@clack/prompts';

export const createFolder = (folderPath: string): string => {
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath, { recursive: true });
        return `Created folder: ${folderPath}`;
    } else {
        return `Folder already exists: ${folderPath}`;
    }
};

export const createFile = (filePath: string, content: string) => {
    if (!existsSync(filePath)) {
        writeFileSync(filePath, content, 'utf8');
        return `Created file: ${filePath}`;
    } else {
        return `File already exists: ${filePath}`;
    }
};

export const fetchAndCreateFile = async (url: string, path: string, errorMsg: string) => {
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

export const fetchAndGetContent = async (url: string, errorMsg: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${errorMsg}: ${response.statusText}`);
      }
      const content = await response.text();
      return content;
    } catch (error) {
      clack.cancel(errorMsg);
      process.exit(1);
    }
};