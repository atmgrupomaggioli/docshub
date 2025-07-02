import defaultDocshubConfig from "docshub.config";

export const ogUrl = (title: string): string => {
  return `${defaultDocshubConfig().docsUrl}/og/${title}`;
};
