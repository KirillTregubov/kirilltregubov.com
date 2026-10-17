### My Personal Website

This is the repository for my personal website, available at [kirilltregubov.com](https://kirilltregubov.com).

Built with [Astro](https://astro.build/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) and [Three.js](https://threejs.org/).

## Setup

Please install [Bun](https://bun.sh/) and clone this repository.

## Local tools

With `bun dev` running, open [local tools](http://localhost:4321/dev/tools).
The [X player preview](http://localhost:4321/dev/tools/player) renders the actual
embed in a 566 × 566 CSS pixel iframe with scrolling disabled, matching the
measured X player. Edit `src/components/PlayerPlayground.tsx` to update the demo.
Routes under `src/pages/dev/tools/[...tool].astro` generate no production paths.

## 🧞 Commands

All commands are run from the root of the project, inside a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `bun install`          | Install dependencies                               |
| `bun dev`              | Start the local dev server at `localhost:4321`     |
| `bun run build`        | Check and incrementally build the production site  |
| `bun run build:clean`  | Check and rebuild the production site from scratch |
| `bun preview`          | Preview the production build locally               |
| `bun run check`        | Check Astro and TypeScript files                   |
| `bun run format`       | Format all files with Prettier                     |
| `bun run format:check` | Check formatting without modifying files           |
| `bun run upgrade`      | Upgrade Astro and its integrations                 |
