import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { WorkspaceItems } from '@/globals';

export function validateFileName(value: string, route: string): string | undefined {
  if (value.length === 0) return '⚠️ The file name is required.';
  if (/[^a-zA-Z0-9-]/.test(value)) return '⚠️ Only letters, numbers, and hyphens are allowed.';
  
  const absoluteFilePath = resolve(route, `${value}.mdx`);
  if (existsSync(absoluteFilePath)) {
    return '⚠️ This file name already exists.';
  }
}

export function validateTextLengthRequired(value: string, maxLength: number, fieldName: string): string | undefined {
  if (value.length === 0) return `⚠️ The ${fieldName} is required.`;
  if (value.length > maxLength) return `⚠️ The maximum number of characters is ${maxLength}.`;
}

export function validateTextLength(value: string, maxLength: number): string | undefined {
  if (value.length > maxLength) return `⚠️ The maximum number of characters is ${maxLength}.`;
}

export function validatePublishDate(value: string): string | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return '⚠️ The date format must be YYYY-MM-DD.';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '⚠️ Invalid date format.';
}

export function validateOnlyOneWord(value: string): string | undefined {
  if (value && /\s/.test(value)) return '⚠️ Only one word is allowed.';
}

export function validateURL(value: string): string | undefined {
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
  if (value.length >= 1 && !urlPattern.test(value)) {
    return '⚠️ Please enter a valid URL.';
  }
}

export function validateWorkspace(): { 
  present: string[], 
  missing: string[], 
  status: 'complete' | 'partial' | 'empty' 
} {
  const presentItems: string[] = [];
  const missingItems: string[] = [];
  
  for (let index = 0; index < WorkspaceItems.length; index++) {
    const itemPath = join(process.cwd(), WorkspaceItems[index].path);
    if (existsSync(itemPath)) {
      presentItems.push(` · The ${WorkspaceItems[index].item} ${WorkspaceItems[index].path} already exists.`);
    } else {
      missingItems.push(`· The ${WorkspaceItems[index].item} ${WorkspaceItems[index].path} doesn't exist.`);
    }
  }
  
  let status: 'complete' | 'partial' | 'empty';
  if (presentItems.length === WorkspaceItems.length) {
    status = 'complete';
  } else if (presentItems.length === 0) {
    status = 'empty';
  } else {
    status = 'partial';
  }

  return { present: presentItems, missing: missingItems, status };
}

