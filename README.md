# Turbo Repo Astro Starter

A modern monorepo starter template built with Turborepo and Astro. This project provides a scalable foundation for building multiple applications with shared tooling and optimized build pipelines.

## Features

- 🚀 **Turborepo** - High-performance monorepo build system with intelligent caching
- ⚡ **Astro** - Modern web framework for building fast, content-focused websites
- 📦 **pnpm Workspace** - Efficient package management with workspace support
- 🔧 **TypeScript** - Full type safety across the monorepo
- 🎨 **Prettier** - Consistent code formatting
- 🏗️ **Optimized Builds** - Parallel task execution and smart caching

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
│       └── package.json
├── package.json       # Root package.json with workspace scripts
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml # pnpm workspace configuration
```

### Apps

- **blog** - An Astro-powered blog application located in `apps/blog/`

## Tech Stack

- **[Turborepo](https://turbo.build/)** - Monorepo build system and task runner
- **[Astro](https://astro.build/)** - Web framework for building fast, content-focused websites
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript at scale
- **[Prettier](https://prettier.io/)** - Opinionated code formatter
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Astro Documentation](https://docs.astro.build/)
- [pnpm Documentation](https://pnpm.io/motivation)
