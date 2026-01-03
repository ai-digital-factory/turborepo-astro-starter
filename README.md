# Turbo Repo Astro Starter

A modern monorepo starter template built with Turborepo and Astro. This project provides a scalable foundation for building multiple applications with shared tooling and optimized build pipelines.

## Features

- 🚀 **Turborepo** - High-performance monorepo build system with intelligent caching
- ⚡ **Astro** - Modern web framework for building fast, content-focused websites
- ⚛️ **React** - UI components with React (via `@astrojs/react` integration)
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework for styling (latest version)
- 🎭 **Shadcn UI** - Beautiful, accessible component library built on Radix UI and Tailwind CSS
- 📦 **pnpm Workspace** - Efficient package management with workspace support
- 🔧 **TypeScript** - Full type safety across the monorepo
- 🎨 **Prettier** - Consistent code formatting
- 🏗️ **Optimized Builds** - Parallel task execution and smart caching
- 📏 **Shared ESLint Config** - Centralized linting rules for Astro, React, and TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 22
- **pnpm** 9.0.0 (or compatible version)

## Getting Started

### Installation

Install all dependencies for the monorepo:

```bash
pnpm install
```

### Development

Start the development server for all apps:

```bash
pnpm dev
```

This will start the Astro development server. The blog app will typically be available at `http://localhost:4321` (or the port specified by Astro).

### Building

Build all apps in the monorepo:

```bash
pnpm build
```

The build output will be generated in each app's respective directory.

## Available Scripts

The following scripts are available at the root level:

| Script             | Description                            |
| ------------------ | -------------------------------------- |
| `pnpm dev`         | Start development servers for all apps |
| `pnpm build`       | Build all apps in the monorepo         |
| `pnpm lint`        | Lint all packages and apps             |
| `pnpm format`      | Format code using Prettier             |
| `pnpm check-types` | Type check all packages and apps       |

## Project Structure

```
turbo-repo-astro-starter/
├── apps/
│   └── blog/          # Astro blog application
│       ├── src/       # Source files
│       ├── public/    # Static assets
│       ├── eslint.config.mjs # Local ESLint config (extends shared)
│       └── package.json
├── packages/
│   ├── eslint-config/ # Shared ESLint configuration
│   │   ├── astro.js   # Astro + React + TS flat config
│   │   └── package.json
│   └── ui/            # Shared UI component library (shadcn UI)
│       ├── src/
│       │   ├── components/ui/  # shadcn UI components
│       │   ├── lib/            # Utility functions
│       │   └── styles/         # Global styles
│       └── package.json
├── package.json       # Root package.json with workspace scripts
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml # pnpm workspace configuration
```

### Apps

- **blog** - An Astro-powered blog application located in `apps/blog/`

### Packages

- **@repo/eslint-config** - Shared ESLint configuration package located in `packages/eslint-config/`. Centralizes linting rules and dependencies for Astro, React, and TypeScript.
- **@repo/ui** - Shared UI component library built with shadcn UI, located in `packages/ui/`. This package contains reusable React components that can be used across all apps in the monorepo.

## Tech Stack

- **[Turborepo](https://turbo.build/)** - Monorepo build system and task runner
- **[Astro](https://astro.build/)** - Web framework for building fast, content-focused websites
- **[React](https://react.dev/)** - UI library for building user interfaces
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework (latest version)
- **[Shadcn UI](https://ui.shadcn.com/)** - Re-usable components built with Radix UI and Tailwind CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript at scale
- **[Prettier](https://prettier.io/)** - Opinionated code formatter
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## Using shadcn UI Components

The project includes a shared UI package (`@repo/ui`) with shadcn UI components. To use components in your app:

1. Import components from `@repo/ui`:

   ```tsx
   import { Card } from "@repo/ui";
   ```

2. Import global styles in your app:

   ```tsx
   import "@repo/ui/globals.css";
   ```

3. To add more shadcn UI components, use the shadcn CLI in the `packages/ui` directory:
   ```bash
   cd packages/ui
   npx shadcn@latest add [component-name]
   ```

## Roadmap / TODO

- [x] Add shadcn components and use them in components
- [x] Create a reusable ui library
- [ ] Use common typescript dependency
- [x] add pre commit hook to check if format is correct via husky
- [x] create reusable eslint package
- [ ] add cursor rule to run pmpm lint and pnpm format too after making changes

## ESLint Configuration

The monorepo uses a shared ESLint configuration to ensure code quality and consistency across all apps and packages.

### Usage in Apps

To use the shared configuration in a new Astro app:

1. Add the shared package to your `devDependencies`:

   ```bash
   pnpm add -D @repo/eslint-config --filter [app-name]
   ```

2. Create an `eslint.config.mjs` file in your app's root and extend the shared config:

   ```javascript
   import astroConfig from "@repo/eslint-config/astro.js";

   export default [...astroConfig];
   ```

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Astro Documentation](https://docs.astro.build/)
- [Astro React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Astro Tailwind Integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
- [shadcn UI Documentation](https://ui.shadcn.com/)
- [pnpm Documentation](https://pnpm.io/motivation)
