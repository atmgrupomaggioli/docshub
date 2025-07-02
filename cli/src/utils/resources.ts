import gradient from 'gradient-string';

// 🎨 Colors:
export const docshubColors = {
  200: '#FFDA8F',
  300: '#FFC757',
  400: '#FFB624',
  500: '#E99C00',
};

export const docshubStepColors = {
  start: '#A78BFA',
  end: '#F472B6',
};

export const docsHubGradient = gradient(Object.values(docshubColors));
export const docsHubStep = gradient(Object.values(docshubStepColors));

// ✏️ Text label:
export const introMessage = 'Your all-in-one tool to create amazing documentation.';
export const docEndMessage = '🚀 Document created successfully.';
export const workspaceMessage = '🎉 Workspace initialized successfully!';
export const genericMessage = '🚀 Good luck organizing your documents!';
export const cancelMessage = '⛔ Operation canceled.';
