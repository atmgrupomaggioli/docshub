import { spawn } from 'child_process';
import * as clack from '@clack/prompts';
import { DockerPort, StartingMessages, UpsiteUrl } from "@/globals";

import net from 'net';

export function executeCommand(command: string) {
    return new Promise<void>((resolve, reject) => {
        const spinner = clack.spinner();
        spinner.start('Starting DocsHub...');

        isPortAvailable(DockerPort).then((available) => {
            if (!available) {
                spinner.stop(`⚠️ The port ${DockerPort} is already in use...`);
                reject('Free up the port to execute the command.');
            }
        }).catch((err) => {
            reject(console.error(`Error checking the port: ${err.message}`));
        });        

        const [cmd, ...args] = command.split(' ');
        const process = spawn(cmd, args);

        let updateCount = 0;
        let errorOutput = '';
        const interval = setInterval(() => {
            spinner.message(StartingMessages[updateCount % StartingMessages.length]);
            updateCount++;
        }, 3000);

        process.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        process.on('close', (code) => {
            clearInterval(interval);

            if (code === 0) {
                spinner.stop('🎉 DocsHub has successfully started.');
                clack.note(`💡 You can access the application at ${UpsiteUrl}.`);
                resolve();
            } else {
                spinner.stop('❌ Failed to start DocsHub.');
                const errorMessage = errorOutput.trim()
                ? `Command failed with exit code ${code}. Error: ${errorOutput}`
                : `Command failed with exit code ${code}.`;
                reject(errorMessage);
            }
        });
    });
}

function isPortAvailable(port: number) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.once('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                reject(err);
            }
        });

        server.once('listening', () => {
            server.close(() => resolve(true));
        });

        server.listen(port);
    });
}
