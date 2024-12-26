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

  let executePresset = await manualExecution();
  
  if (executePresset === '') {
    const executeType = await clack.select({
      message: 'What do you want to do?',
      options: [
        { value: 'init', label: 'Initialize workspace' },
        { value: 'create', label: 'Create new document' },
        { value: 'interactive', label: 'Run interactive mode' },
        { value: 'standard', label: 'Run standard mode' },
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
      if (workspace.status === 'empty') {
        await generateWorkspace();
        clack.outro(docsHubGradient(workspaceMessage));
      } else {
        clack.log.warning('Hey! Your workspace is already initialized.');
        clack.note('This is your existing workspace structure:\n' + workspace.present.join('\n'));
        clack.cancel('Clean the current directory of previous files and folders to reinitialize and set up the workspace.');
        process.exit(0);
      }
      break;

    case 'create':
      if (workspace.status === 'complete') {
        const docDetails = await getDocumentDetails();
        await generateMDX('docs', docDetails.fileName, docDetails);
        clack.outro(docsHubGradient(docEndMessage));
      } else {
        clack.log.warning(workspace.status === 'empty' ? 'Hey! You need to initialize the workspace.' : 'Hey! Your workspace is incomplete.');
        clack.note('These are the missing elements in your workspace:\n' + workspace.missing.join('\n'));
        clack.cancel(workspace.status === 'empty' ? 'Initialize workspace before creating a new document.' : 'Complete the workspace structure before creating a new document.');
        process.exit(0);
      }
      break;

    case 'interactive':
      if (workspace.status === 'complete') {
        try {
          await executeCommand(RunInteractive);
        } catch (error) {
          clack.cancel(String(error));
          process.exit(1);
        }
      } else {
        clack.log.warning('Hey! Your need a complete workspace to run DocsHub.');
        clack.note('These are the missing elements in your workspace:\n' + workspace.missing.join('\n'));
        clack.cancel('Initialize the workspace before.');
        process.exit(0);
      }
      clack.outro(docsHubGradient(genericMessage))
      break;

      case 'standard':
        if (workspace.status === 'complete') {
          try {
            await executeCommand(RunStandard);
          } catch (error) { 
            clack.cancel(String(error));
            process.exit(1);
          }
        } else {
          clack.log.warning('Hey! Your need a complete workspace to run DocsHub.');
          clack.note('These are the missing elements in your workspace:\n' + workspace.missing.join('\n'));
          clack.cancel('Initialize the workspace before.');
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

    case 'not-allowed':
      notAllowedCommand();
      break;

    default:
      notAllowedCommand();
      break;
  }
}

function notAllowedCommand() {
  clack.cancel(`Invalid command: ${process.argv.slice(2).join(' ')}. Use "npx docshub help" to see the available commands.`);
  process.exit(0);
}
