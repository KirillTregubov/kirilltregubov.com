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
  R,
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
  { name: 'R', image: R },
  { name: 'Assembly', image: Assembly }
]

const TechStack: React.FC = () => {
  return (
    <>
      <div className="group pointer-events-none -my-1 -mx-1 inline-flex flex-wrap">
        {techStack.map((tech) => (
          <div key={tech.name} className="pointer-events-auto p-1 opacity-100">
            <button className="tech-transition pressable pointer-events-auto flex items-center gap-1 rounded-lg border border-neutral-300 px-2 py-1.5 hover:bg-neutral-300 hover:!opacity-100 group-hover:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-700">
              <tech.image
                aria-hidden="true"
                className="color-transition h-6 w-6 text-neutral-800 dark:text-neutral-300"
              />
              <p className="">{tech.name}</p>
            </button>
          </div>
        ))}
      </div>
      <h4 className="mt-2 select-none text-right text-sm font-medium text-neutral-500 dark:text-neutral-400/80 wide:mt-0">
        Select a technology to see relevant projects and blog posts.
      </h4>
    </>
  )
}

export default TechStack
