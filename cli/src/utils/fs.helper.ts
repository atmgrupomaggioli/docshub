import { mkdirSync, writeFileSync, existsSync } from 'fs';

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