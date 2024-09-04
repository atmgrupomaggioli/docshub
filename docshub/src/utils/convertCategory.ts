export const convertCategory = (word: string) => {
  const result = word.charAt(0).toUpperCase() + word.slice(1);
  return result;
};
