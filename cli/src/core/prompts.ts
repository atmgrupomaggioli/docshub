import * as clack from '@clack/prompts';
import { validateFileName, validateTextLength, validatePublishDate, validateOnlyOneWord, validateURL, validateTextLengthRequired } from '@/utils/validation';
import { cancelMessage } from '@/utils/resources';
import type { DocumentParams } from '@/types/types';

export async function getDocumentDetails(): Promise<DocumentParams> {
  clack.log.message('Now fill in all the parameters to create a new document.');

  const documentParams = await clack.group(
    {
      fileName: () => clack.text({
        message: '📄 File name:',
        placeholder: 'example-name',
        validate: (value) => validateFileName(value, 'docs'),
      }),
      documentTitle: () => clack.text({
        message: '🤔 Document title:',
        placeholder: 'Sentry Integration in Angular',
        validate: (value) => validateTextLengthRequired(value, 100, 'document title'),
      }),
      description: () => clack.text({
        message: '✍️ Description:',
        validate: (value) => validateTextLengthRequired(value, 255, 'description'),
      }),
      sidebarTitle: () => clack.text({
        message: '✨ Sidebar title:',
        placeholder: 'Angular',
        validate: (value) => validateTextLengthRequired(value, 25, 'sidebar title'),
      }),
      publishDate: () => clack.text({
        message: '📅 Publish date:',
        placeholder: 'YYYY-MM-DD',
        initialValue: new Date().toISOString().split('T')[0],
        validate: validatePublishDate,
      }),
      category: () => clack.text({
        message: '📦 Category (optional):',
        placeholder: 'Example',
        validate: validateOnlyOneWord,
      }),
      authorName: () => clack.text({ 
        message: 'What is your name? (Optional)',
        placeholder: 'Doc McWriter',
        validate: (value) => validateTextLength(value, 255),
      }),
      authorUrl: () => clack.text({ 
        message: 'What is your website? (Optional)',
        placeholder: 'https://your-website.com',
        validate: validateURL
      }),
    },
    {
      onCancel: () => {
        clack.cancel(cancelMessage);
        process.exit(0);
      },
    },
  );

  clack.note(`🎉 These are all the parameters for your new document:
  Document: ${documentParams.fileName ? 'docs/' + documentParams.fileName + '.mdx' : '-'}
  Title: ${documentParams.documentTitle ?? '-'}
  Description: ${documentParams.description ?? '-'}
  Publish date: ${documentParams.publishDate ?? '-'}
  Category: ${documentParams.category ?? '-'}
  Author name: ${documentParams.authorName ?? '-'}
  Author url: ${documentParams.authorUrl ?? '-'}`);

  const shouldContinue = await clack.confirm({
    message: 'Do you want to create the document?',
    initialValue: true,
  });

  if (clack.isCancel(shouldContinue) || !shouldContinue) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  return documentParams
}