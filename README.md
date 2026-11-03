### My Personal Website

This is the repository for my personal website, available at [kirilltregubov.com](https://kirilltregubov.com).

Built with [Astro](https://astro.build/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) and [Three.js](https://threejs.org/).

## Setup

Please install [Bun](https://bun.sh/) and clone this repository.

## Local tools

With `bun dev` running, open [local tools](http://localhost:4321/dev/tools).
The [X player preview](http://localhost:4321/dev/tools/player) renders the actual
embed with selectable sizes from 320 to 640 CSS pixels and scrolling disabled.
The player adapts its layout to the iframe while keeping text and controls readable.
Browse the [player gallery](http://localhost:4321/dev/tools/players) to select a player.

Each player lives in `src/players/<id>/`: `player.ts` contains its gallery metadata
and `Player.astro` renders it. New folders with these files are automatically
discovered by the gallery and served at `/embed/<id>`.
The saved deployed test is `src/players/playground/`; the profile player is
`src/players/hello/`, shared via `/hello`. Share pages supply the X card metadata
and are created separately from the embed routes.
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
