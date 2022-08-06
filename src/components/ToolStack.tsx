import type React from 'react'
import {
  Eclipse,
  Figma,
  Firebase,
  Git,
  Heroku,
  IntelliJ,
  Logisim,
  MARS,
  MbedStudio,
  MSOffice,
  Netlify,
  Postman,
  PyCharm,
  Racket,
  Railway,
  RStudio,
  Stripe,
  Vercel,
  VSCode
} from './icons'

const toolStack: {
  name: string
  image: React.FC<{ className: string }>
  url: string
}[] = [
  {
    name: 'Microsoft Office',
    image: MSOffice,
    url: 'https://www.microsoft.com/microsoft-365'
  },
  { name: 'Figma', image: Figma, url: 'https://www.figma.com/' },
  { name: 'Git', image: Git, url: 'https://git-scm.com/' },
  {
    name: 'Visual Studio Code',
    image: VSCode,
    url: 'https://code.visualstudio.com/'
  },
  {
    name: 'Mbed Studio',
    image: MbedStudio,
    url: 'https://os.mbed.com/studio/'
  },
  {
    name: 'IntelliJ IDEA',
    image: IntelliJ,
    url: 'https://www.jetbrains.com/idea/'
  },
  {
    name: 'PyCharm',
    image: PyCharm,
    url: 'https://www.jetbrains.com/pycharm/'
  },
  {
    name: 'Eclipse',
    image: Eclipse,
    url: 'https://www.eclipse.org/downloads/'
  },
  { name: 'Vercel', image: Vercel, url: 'https://vercel.com/' },
  { name: 'Heroku', image: Heroku, url: 'https://www.heroku.com/' },
  { name: 'Netlify', image: Netlify, url: 'https://www.netlify.com/' },
  { name: 'Railway', image: Railway, url: 'https://railway.app/' },
  { name: 'Firebase', image: Firebase, url: 'https://firebase.google.com/' },
  { name: 'Stripe', image: Stripe, url: 'https://stripe.com/' },
  { name: 'Postman', image: Postman, url: 'https://www.postman.com/' },
  {
    name: 'MARS',
    image: MARS,
    url: 'http://courses.missouristate.edu/kenvollmar/mars/'
  },
  { name: 'Logisim', image: Logisim, url: 'http://www.cburch.com/logisim/' },
  { name: 'DrRacket', image: Racket, url: 'https://racket-lang.org/' },
  {
    name: 'RStudio',
    image: RStudio,
    url: 'https://www.rstudio.com/products/rstudio/'
  }
]

const ToolStack: React.FC = () => {
  return (
    <>
      <div className="group pointer-events-none -my-1 -mx-1 inline-flex flex-wrap">
        {toolStack.map((tool) => (
          <div key={tool.name} className="pointer-events-auto p-1 opacity-100">
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="tech-transition pressable pointer-events-auto flex items-center gap-1 rounded-lg border border-neutral-300 px-2 py-1.5 hover:bg-neutral-300 hover:!opacity-100 group-hover:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-700"
            >
              <tool.image
                aria-hidden="true"
                className="color-transition h-6 w-6 text-neutral-800 dark:text-neutral-300"
              />
              <p>{tool.name}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

export default ToolStack
