import { GMode, startGame } from '@/utils/guess';

export async function manualExecution() {
  const args = process.argv;

  // The user is trying to use the CLI manually, attaching the action to be performed.
  if (args.length === 3) {
    if (args[2] === GMode) {
      await startGame();
    } else {
      return args[2];
    }
  }

  // The user is trying to use more arguments than the CLI supports.
  if (args.length > 3) {
    return 'not-allowed';
  }

  return '';
}
