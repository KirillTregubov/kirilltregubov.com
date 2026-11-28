# Development server

- Try to start the server using `bun dev` command. If it fails because port is in use, then use the existing instance.

# Verification

- Do not use `bun run build` to verify the changes.
- Use `bun check`
- Use the dev server to verify the changes visually.

# Styling

- Use Tailwind CSS utilities for new and updated UI styles. Add custom CSS only when a style cannot be expressed clearly with Tailwind, such as complex state-dependent layout rules or keyframes.
- When changing an existing component, migrate the styles you touch to Tailwind where practical and keep any necessary custom CSS small and focused.
- Write classes out in full (`'hover:bg-[#202020]'`, not `` `hover:${bg}` ``). Tailwind only generates classes it can see as complete strings.

## Solid colours in fading content

- Don't use translucent colours (`bg-white/4`, `border-neutral-700/60`, `text-amber-300/80`) for the static background, border or text of anything inside an animated (`enter` / `enter-N`) block. Create a solid equivalent by computing the proper `solidColors` in `src/styles/classes.ts`.
- Why: in some browsers (Chrome on Linux), translucent cards and chips visibly flicker while their section fades in. The fade animates the section's opacity, so the browser renders it on its own layer, and the translucent colours get blended again when that layer is created and dropped. `will-change-transform` on the same element makes it worse by adding another layer. A solid colour looks the same once settled but has nothing to re-blend.
- Compute a solid value as `alpha x colour + (1 - alpha) x surface` per sRGB channel, using Tailwind's colours in sRGB. It's only valid on that surface.
- Hover, active and focus states, rings, shadows, and anything over images or gradients can stay translucent.

# Dev pages

- Dev-only pages live under `src/pages/dev/<name>/[...slug].astro` and return paths from `getStaticPaths` only when `import.meta.env.DEV`.
- `/dev` lists every page under `src/pages/dev` automatically. Give a new page a title and description in `src/lib/devPages.ts`.
