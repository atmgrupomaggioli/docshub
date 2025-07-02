import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    try {
      const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
      file.data.astro.frontmatter.lastModified = result.toString().trim();
    } catch (err) {
      console.warn(`Could not get git log for ${filepath}: ${err.message}`);
      file.data.astro.frontmatter.lastModified = null;
    }
  };
}
