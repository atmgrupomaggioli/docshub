export function manualExecution() {
    const args = process.argv;

    // The user is trying to use the CLI manually, attaching the action to be performed.
    if (args.length === 3) {
        return args[2];
    }

    // The user is trying to use more arguments than the CLI supports.
    if (args.length > 3) {
        return 'not-allowed';
    }

    return '';
}