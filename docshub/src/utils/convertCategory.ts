export const convertCategory = (word: string): string => {
  return word
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};
