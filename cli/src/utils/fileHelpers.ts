import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { log } from '@clack/prompts';

export const createFolder = (folderPath: string) => {
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath, { recursive: true });
        log.success(`Created folder: ${folderPath}`);
    } else {
        log.warn(`Folder already exists: ${folderPath}`);
    }
};

export  const createFile = (filePath: string, content: string) => {
    if (!existsSync(filePath)) {
        writeFileSync(filePath, content, 'utf8');
        log.success(`Created file: ${filePath}`);
    } else {
        log.warn(`File already exists: ${filePath}`);
    }
};