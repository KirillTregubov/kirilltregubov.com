/**
 * Titles and descriptions for the /dev index. Every page under src/pages/dev
 * is listed there automatically; add an entry here to describe it. Keys are
 * URL paths.
 */
export const devPageInfo: Record<
  string,
  { title: string; description: string }
> = {
  '/dev/ui': {
    title: 'UI components',
    description: 'Shared components from src/components/ui.',
  },
  '/dev/tools/player': {
    title: 'X player preview',
    description: 'Edit and preview an embedded player at different sizes.',
  },
  '/dev/tools/players': {
    title: 'Player gallery',
    description: 'Every embedded player, to pick one to edit.',
  },
  '/dev/cineplex': {
    title: 'Cineplex UI',
    description: 'The /cineplex-toronto hero and saved chart and hero drafts.',
  },
}
