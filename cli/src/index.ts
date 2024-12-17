#!/usr/bin/env node

import * as clack from '@clack/prompts';
import gradient from 'gradient-string';
import { format } from 'date-fns';
import { resolve } from 'path';
import { existsSync } from 'fs';

// 📦 Utils:
import { docshubColors, docshubStepColors } from './utils/resources';
import { generateMDX, generateWorkspace } from './utils/generate';

// ⚙️ Settings:
const introMessage = '📚 Welcome to Docshub';
const docsHubGradient = gradient(Object.values(docshubColors));
const docsHubStep = gradient(Object.values(docshubStepColors));
const endMessage = '🚀 Document created successfully.';
const cancelMessage = '⛔ Operation canceled.';

const documentRoute = 'docs';

// 💎 CLI:
async function main() {
  clack.intro(docsHubGradient(introMessage));

  const executeType = await clack.select({
    message: 'What do you want to do?',
    options: [
      { value: 'init', label: 'Initialize workspace' },
      { value: 'create-doc', label: 'Create new document' },
    ],  
  }) as string;
  
  if (clack.isCancel(executeType)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  if (executeType === 'init') {
    generateWorkspace();
  } else {
    
    // File name:
    const fileName = (await clack.text({
      message: '📄 File name:',
      placeholder: 'sentry-integration',
      validate(value) {
        if (value.length === 0) return 'The file name is required.';
        if (/[^a-zA-Z0-9-]/.test(value)) return 'Only letters, numbers, and hyphens are allowed. Special characters and spaces are not permitted.';

        const absoluteFilePath = resolve(documentRoute, `${value}.mdx`);
        if (existsSync(absoluteFilePath)) {
          return 'This file name already exists.';
        }
      },
    })) as string;

    if (clack.isCancel(fileName)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    // Document title:
    const documentTitle = (await clack.text({
      message: '🤔 Document title:',
      placeholder: 'Sentry Integration in Angular',
      validate(value) {
        if (value.length === 0) return '⚠️ The document title is required.';
      },
    })) as string;

    if (clack.isCancel(documentTitle)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    // Description:
    const documentDescription = (await clack.text({
      message: '✍️ Description:',
      validate(value) {
        if (value.length === 0) return '⚠️ The description is required.';
      },
    })) as string;

    if (clack.isCancel(documentDescription)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    // Sidebar title:
    const documentSidebarTitle = (await clack.text({
      message: '✨ Sidebar title:',
      placeholder: 'Angular',
      validate(value) {
        if (value.length >= 25) return '⚠️ The maximum number of characters is 25.';
        if (value.length === 0) return '⚠️ The sidebar title is required.';
      },
    })) as string;

    if (clack.isCancel(documentDescription)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    // Category:
    const documentCategory = (await clack.text({
      message: '📦 Category (optional):',
      placeholder: 'Sentry',
      validate(value) {
        if (value.length >= 1 && /\s/.test(value)) return '⚠️ Only one word is allowed.';
      },
    })) as string;

    if (clack.isCancel(documentCategory)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    // Publish date:
    const documentPublishDate = (await clack.text({
      message: '📅 Publish date:',
      placeholder: 'YYYY-MM-DD',
      initialValue: new Date().toISOString().split('T')[0],
      validate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return '⚠️ The date format must be YYYY-MM-DD.';
        }
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return '⚠️ Invalid date format.';
        }
      },
    })) as string;

    if (clack.isCancel(documentPublishDate)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    const documentAuthor = await clack.group(
      {
        name: () => clack.text({ 
          message: 'What is your name? (Optional)',
          placeholder: 'Doc McWriter',
          validate(value) {
              if (value.length >= 25) return '⚠️ The maximum number of characters is 25.';
          }, 
        }),
        url: () => clack.text({ 
          message: 'What is your website? (Optional)',
          placeholder: 'https://your-website.com',
          validate(value) {
            const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
            if (value.length >= 1 && !urlPattern.test(value)) {
              return '⚠️ Please enter a valid URL.';
            }
          }, 
        }),
      },
      {
        onCancel: () => {
          clack.cancel(cancelMessage);
          process.exit(0);
        },
      }
    );

    clack.log.step('🔎 Summary:');

    // Document summary:
    console.table([
      ['Title', documentTitle ? documentTitle : '-'],
      ['Description', documentDescription ? documentDescription : '-'],
      ['Category', documentCategory ? documentCategory : '-'],
      ['Publish date', documentPublishDate ? documentPublishDate : '-'],
      ['Author name', documentAuthor.name ? documentAuthor.name : '-'],
      ['Author url', documentAuthor.url ? documentAuthor.url : '-'],
    ]);

    const shouldContinue = await clack.confirm({
      message: '🛠️ Create document?',
    });

    if (clack.isCancel(shouldContinue)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    if (!shouldContinue) {
      clack.log.warn("You have canceled the document creation. You can try again by repeating the process.");
      process.exit(0);
    }
    
    const convertPublishDate = new Date(documentPublishDate);
    const formattedPublishDate = format(convertPublishDate, 'yyyy-MM-dd');

    await generateMDX(documentRoute, fileName, {
      title: documentTitle,
      description: documentDescription,
      category: documentCategory,
      publishDate: formattedPublishDate,
      sidebarTitle: documentSidebarTitle,
      author: {
        name: documentAuthor.name,
        url: documentAuthor.url
      },
    });

    const absoluteFilePath = resolve(documentRoute, `${fileName}.mdx`);

    clack.log.step(`📂 ${docsHubStep('File location')}: ${absoluteFilePath}`);
    clack.log.step(
      `🖼️ ${docsHubStep('Using images')}: You can use images in your documentation. Store them in /images/${documentCategory ? documentCategory?.toLowerCase() : ''}.`,
    );
    clack.outro(docsHubGradient(endMessage));
  }
  
}

// 🚀 Main:
main();
