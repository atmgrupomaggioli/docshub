import * as clack from '@clack/prompts';
import { docsHubGradient, introMessage, docEndMessage, cancelMessage, workspaceMessage, genericMessage } from '@/utils/resources';
import { generateWorkspace, generateMDX } from '@/utils/generate';
import { getDocumentDetails } from './prompts';

import { generateAnsi } from '@/utils/ansi';
import { validateWorkspace } from '@/utils/validation';
import { displayAbout, displayHelp } from '@/utils/information';
import { manualExecution } from './manual';
import { executeCommand } from '@/utils/exec';
import { RunInteractive, RunStandard } from '@/globals';

export async function main() {
  console.log(generateAnsi());

  clack.intro(docsHubGradient(introMessage));

  clack.note(`If you need to escape, just use Ctrl+C and you'll be free!`);

  let executePresset = manualExecution();
  
  if (executePresset === '') {
    const executeType = await clack.select({
      message: 'What do you want to do?',
      options: [
        { value: 'init', label: 'Initialize workspace' },
        { value: 'create', label: 'Create new document' },
        { value: 'interactive', label: 'Run DocsHub in interactive mode' },
        { value: 'standard', label: 'Run DocsHub in standard mode' },
        { value: 'help', label: 'Need help?' },
        { value: 'about', label: 'About' },
      ],
    });
  
    if (clack.isCancel(executeType)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    executePresset = executeType;
  }

  const workspace = validateWorkspace();

  switch (executePresset) {
    case 'init':
      if (workspace.success === false) {
        await generateWorkspace();
        clack.outro(docsHubGradient(workspaceMessage));
      } else {
        clack.log.warning('Hey! Your workspace is already initialized. Please clear the current directory to reinitialize the workspace.');
        clack.note(workspace.missing.join('\n'));
        clack.cancel('Clear the current directory to reinitialize and set up the workspace.');
        process.exit(0);
      }
      break;

    case 'create':
      if (workspace.success) {
        const docDetails = await getDocumentDetails();
        await generateMDX('docs', docDetails.fileName, docDetails);
        clack.outro(docsHubGradient(docEndMessage));
      } else {
        clack.cancel('Hey! You need to initialize the workspace before creating a new document.');
        process.exit(0);
      }
      break;

    case 'interactive':
      if (workspace.success) {
        try {
          await executeCommand(RunInteractive);
        } catch (error) {
          clack.cancel(String(error));
          process.exit(1);
        }
      } else {
        clack.cancel('Hey! You need to initialize the workspace before run DocsHub.');
        process.exit(0);
      }
      clack.outro(docsHubGradient(genericMessage))
      break;

      case 'standard':
        if (workspace.success) {
          try {
            await executeCommand(RunStandard);
          } catch (error) { 
            clack.cancel(String(error));
            process.exit(1);
          }
        } else {
          clack.cancel('Hey! You need to initialize the workspace before run DocsHub.');
          process.exit(0);
        }
        clack.outro(docsHubGradient(genericMessage))
        break;

    case 'help':
      displayHelp();
      clack.outro(docsHubGradient(genericMessage))
      break;

    case 'about':
      displayAbout();
      clack.outro(docsHubGradient(genericMessage))
      break;

    default:
      clack.cancel(`Invalid command: ${executePresset}. Use "npx docshub help" to see the available commands.`);
      process.exit(0);
  }
}
