export interface PlayerDefinition {
  id: string
  title: string
  description: string
  sharePath: string
  author: string
  handle: string
}

const definitions = import.meta.glob<PlayerDefinition>(
  '../players/*/player.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const players = Object.values(definitions).sort((a, b) =>
  a.id.localeCompare(b.id),
)
