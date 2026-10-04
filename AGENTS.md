# Development server

- Try to start the server using `bun dev` command. If it fails because port is in use, then use the existing instance.

# Verification

- Do not use`bun run build` to verify the changes.
- Use `bun check`
- Use the dev server to verify the changes visually.

# Styling

- Use Tailwind CSS utilities for new and updated UI styles. Add custom CSS only when a style cannot be expressed clearly with Tailwind, such as complex state-dependent layout rules or keyframes.
- When changing an existing component, migrate the styles you touch to Tailwind where practical and keep any necessary custom CSS small and focused.
