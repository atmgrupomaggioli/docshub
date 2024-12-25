import * as clack from '@clack/prompts';
import pkgJson from "../../package.json";

export async function displayHelp() {
    clack.note(`DocsHub CLI is a simple and powerful 
command-line tool designed to help you manage 
your documents and workspaces directly from the terminal:

If you run "npx docshub"...
        [Initialize workspace] - Initialize the workspace structure.
        [Create new document] - Create a new document in the docs folder.
        [Need help?] - Display help instructions.
        [About] - Display information about DocsHub CLI.
If you run "npx docshub <command>"...
        [init] - Initialize DocsHub workspace.
        [create] - Create a new document in the docs folder.
        [interactive] - Run DocsHub in interactive mode (Editor mode).
        [standard] - Run DocsHub in standard mode (Production mode).
        [help] - Display help instructions.
        [about] - Display information about DocsHub CLI.
`);
}

export async function displayAbout() {
        clack.note(`DocsHub CLI is the perfect complement 
    to your documentation project using DocsHub.
    
    Name: ${pkgJson.name}
    Version: ${pkgJson.version}
    License: ${pkgJson.license}
    GitHub: ${pkgJson.repository.url}
`);
}