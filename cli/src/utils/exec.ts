import { spawn } from 'child_process';
import * as clack from '@clack/prompts';
import { StartingMessages, UpsiteUrl } from "@/globals";

export function executeCommand(command: string) {
    return new Promise<void>((resolve, reject) => {
        const spinner = clack.spinner();
        spinner.start('Starting DocsHub...');

        const [cmd, ...args] = command.split(' ');
        const process = spawn(cmd, args);

        let updateCount = 0;
        const interval = setInterval(() => {
            spinner.message(StartingMessages[updateCount % StartingMessages.length]);
            updateCount++;
        }, 3000);

        process.on('close', (code) => {
            clearInterval(interval);

            if (code === 0) {
                spinner.stop('🎉 DocsHub has successfully started.');
                clack.note(`💡 You can access the application at ${UpsiteUrl}.`);
                resolve();
            } else {
                spinner.stop('❌ Failed to start DocsHub.');
                reject(`Command failed with exit code ${code}`);
            }
        });
    });
}
