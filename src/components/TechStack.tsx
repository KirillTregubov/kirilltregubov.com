import type React from 'react'

import {
  Assembly,
  C,
  CPlusPlus,
  Docker,
  Electron,
  Expo,
  Flask,
  GraphQL,
  Haskell,
  Java,
  JavaScript,
  Jest,
  ManifestV3,
  MongoDB,
  NextJS,
  NodeJS,
  Nuxt,
  PostgreSQL,
  Python,
  R,
  Racket,
  ReactJS,
  Sass,
  TailwindCSS,
  TypeScript,
  VueJS
} from './icons'

const techStack: {
  name: string
  image: React.FC<{ className: string }>
}[] = [
  { name: 'JavaScript', image: JavaScript },
  { name: 'TypeScript', image: TypeScript },
  { name: 'Node.js', image: NodeJS },
  { name: 'React', image: ReactJS },
  { name: 'Next.js', image: NextJS },
  { name: 'React Native', image: ReactJS },
  { name: 'Expo', image: Expo },
  { name: 'Electron', image: Electron },
  { name: 'Vue.js', image: VueJS },
  { name: 'NuxtJS', image: Nuxt },
  { name: 'Jest', image: Jest },
  { name: 'Tailwind CSS', image: TailwindCSS },
  { name: 'Sass', image: Sass },
  { name: 'PostgreSQL', image: PostgreSQL },
  { name: 'MongoDB', image: MongoDB },
  { name: 'GraphQL', image: GraphQL },
  { name: 'Python', image: Python },
  { name: 'Flask', image: Flask },
  { name: 'C', image: C },
  { name: 'C++', image: CPlusPlus },
  { name: 'Java', image: Java },
  { name: 'Docker', image: Docker },
  { name: 'Manifest V3', image: ManifestV3 },
  { name: 'Racket', image: Racket },
  { name: 'Haskell', image: Haskell },
  { name: 'R', image: R },
  { name: 'Assembly', image: Assembly }
]

const TechStack: React.FC = () => {
  return (
    <>
      <div className="group pointer-events-none -my-1 -mx-1 inline-flex flex-wrap">
        {techStack.map((tool) => (
          <div key={tool.name} className="pointer-events-auto p-1 opacity-100">
            {/* <a
              // href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="tech-transition pressable pointer-events-auto flex items-center gap-1.5 rounded-lg border border-neutral-300 px-2.5 py-2 hover:bg-neutral-200 hover:!opacity-100 group-hover:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-700"
            > */}
            <div className="tech-transition flex items-center gap-1.5 rounded-lg border border-neutral-300 px-2.5 py-2 dark:border-neutral-700">
              <tool.image
                aria-hidden="true"
                className="color-transition h-6 w-6 text-neutral-800 dark:text-neutral-300"
              />
              <p>{tool.name}</p>
            </div>
            {/* </a> */}
          </div>
        ))}
      </div>
      {/* <h4 className="mt-2 select-none text-right text-sm font-medium text-neutral-500 dark:text-neutral-400/80 wide:mt-0">
         Select a technology to see relevant projects and blog posts.
       </h4> */}
    </>
  )
}

export default TechStack
