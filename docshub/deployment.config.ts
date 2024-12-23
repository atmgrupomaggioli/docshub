// Deployment integrations:
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

export const vercelDeploy = {
  adapter: vercel(),
  output: "server" as const,
  site: "https://docshub.vercel.app",
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
};

export const dockerProdDeploy = {
  output: "server" as const,
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
};

export const dockerInteractiveDeploy = {
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    server: {
      host: "0.0.0.0",
      hmr: { clientPort: 4321 },
      port: 4321,
      watch: { usePolling: true },
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
};

export function getDeploymentConfig() {
  const deployEnv = process.env.DEPLOY_ENV || "vercel";
  console.log(`⚡ Execution mode: ${deployEnv}`);
  switch (deployEnv) {
    case "docker-interactive":
      return dockerInteractiveDeploy;
    case "docker-prod":
      return dockerProdDeploy;
    case "vercel":
      return vercelDeploy;
    default:
      return vercelDeploy;
  }
}
