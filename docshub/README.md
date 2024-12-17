## ✨ DocsHub - Core

Welcome to the source code section of [DocsHub](https://github.com/atmgrupomaggioli/docshub). The application is built using:

- [Astro 5 Framework](https://astro.build/).
- [Tailwind CSS](https://tailwindcss.com/).
- [Astro Content Layer + MDX](https://docs.astro.build/en/guides/content-collections/).
- [React Integration](https://docs.astro.build/es/guides/integrations-guide/react/).
- [shadcn/ui with Radix](https://ui.shadcn.com/).
- [Mermaid Diagrams](https://mermaid.js.org/).

## 🧑‍🚀 Getting started

**Prerequisites**:

- [Node.js +20 installed](https://nodejs.org/en/download/)
- [Astro VSCode Extension (optional)](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Tailwind CSS Intellisense (optional)](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

1. [Fork the repository](https://github.com/atmgrupomaggioli/docshub/fork) into your account.

2. Clone the repository:

   ```bash
   $ git clone git@github.com:your_user/docshub.git
   ```

3. Navigate to the project directory:

   ```bash
   $ cd docshub
   ```

4. Install the dependencies:

   ```bash
   $ npm i
   ```

## ⚙️ Commands

### 🔎 Document preview

To edit and preview the document, run the application in development mode.

```bash
$ npm run dev
```

and open [http://localhost:4321](http://localhost:3000) in your browser.

### 🏗️ Verifying & Building

```bash
$ npm run build
```

The command runs both `astro check` and `astro build`. First, it performs a configuration and content check, then it generates an optimized production build of the site.

## 🐳 Docker

We have 2 **Dockerfiles** for building:

- With `Dockerfile.interactive` we can access the **dev version** of the application by running a Docker image without considering the source code.
- With `Dockerfile.prod` we can building the site in production mode using the specified document volumes.

To perform the different builds, we use the following commands:

1. **For production build**:

   ```bash
   docker buildx build --platform linux/amd64,linux/arm64 \
       -t atmgrupomaggioli/docshub:latest \
       -t atmgrupomaggioli/docshub:<current-version> \
       -f Dockerfile.prod . --push
   ```

2. **For interactive build**:
   ```bash
   docker buildx build --platform linux/amd64,linux/arm64 \
       -t atmgrupomaggioli/docshub:interactive \
       -t atmgrupomaggioli/docshub:interactive-<current-version> \
       -f Dockerfile.interactive . --push
   ```

## 📝 License

- [GNU GENERAL PUBLIC LICENSE 3.0](https://github.com/atmgrupomaggioli/docshub/blob/main/LICENSE)
