// 📦 Resources to dowload URLs
export const dockerComposeUrl = 'https://raw.githubusercontent.com/atmgrupomaggioli/docshub/refs/heads/next/resources/docker-compose.yml';
export const gettingStartedUrl = 'https://raw.githubusercontent.com/atmgrupomaggioli/docshub/refs/heads/next/docshub/src/docs/getting-started.mdx';
export const guessHintsUrl = 'https://raw.githubusercontent.com/rperezll/dev-guess/refs/heads/main/WordHints';
export const envUrl = 'https://raw.githubusercontent.com/atmgrupomaggioli/docshub/refs/heads/next/resources/env-template';

// 📚 Documentation URLs
export const startGuideUrl = 'https://docshub.vercel.app/docshub-docker';
export const envReferenceUrl = 'https://docshub.vercel.app/env-reference';

// 💅 Workspace structure
export const WorkspaceItems = [
    {
        item: 'folder',
        path: 'docs'
    },
    {
        item: 'folder',
        path: 'images'
    },
    {
        item: 'file',
        path: 'docker-compose.yml'
    },
    {
        item: 'file',
        path: 'docs/getting-started.mdx'
    },
    {
        item: 'file',
        path: '.env'
    }
]

// 🕹️ Run Commands & up site
export const RunInteractive = 'docker compose --profile interactive up -d';
export const RunStandard = 'docker compose --profile standard up -d';
export const UpsiteUrl = 'http://localhost:4321';
export const DockerPort = 4321;

// 😷 Starting App messages
export const StartingMessages = [
    'Starting the project...',
    "Don't close the terminal, we\'re setting everything up...",
    'Almost ready, just a moment...',
    'The project is being set up...'
];