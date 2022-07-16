import type React from 'react'
import {
  Assembly,
  C,
  CPlusPlus,
  Expo,
  Git,
  GraphQL,
  Haskell,
  Java,
  NextJS,
  NodeJS,
  Nuxt,
  PostgreSQL,
  Python,
  Racket,
  ReactJS,
  TypeScript,
  VueJS
} from './media/Icons'

const techStack: {
  name: string
  image: React.FC<{ className: string }>
}[] = [
  { name: 'Git', image: Git },
  { name: 'Node.js', image: NodeJS },
  { name: 'TypeScript', image: TypeScript },
  { name: 'React', image: ReactJS },
  { name: 'Next.js', image: NextJS },
  { name: 'Expo', image: Expo },
  { name: 'Vue.js', image: VueJS },
  { name: 'Nuxt', image: Nuxt },
  { name: 'PostgreSQL', image: PostgreSQL },
  { name: 'GraphQL', image: GraphQL },
  { name: 'Python', image: Python },
  { name: 'C', image: C },
  { name: 'C++', image: CPlusPlus },
  { name: 'Java', image: Java },
  { name: 'Racket', image: Racket },
  { name: 'Haskell', image: Haskell },
  { name: 'Assembly', image: Assembly }
]

const TechStack: React.FC = () => {
  return (
    <>
      <div className="group pointer-events-none flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <button
            key={tech.name}
            className="pressable pointer-events-auto flex items-center gap-1 rounded-lg border border-neutral-200 px-2 py-1.5 transition-[border-color,opacity] hover:bg-neutral-200 hover:!opacity-100 group-hover:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-700"
          >
            <tech.image
              aria-hidden="true"
              className="h-6 w-6 text-neutral-800 transition-colors duration-75 dark:text-neutral-50"
            />
            <p className="transition-[background-color]">{tech.name}</p>
          </button>
        ))}
      </div>
    </>
  )
}

export default TechStack
