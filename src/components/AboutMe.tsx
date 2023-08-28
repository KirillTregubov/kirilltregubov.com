import { differenceInYears } from 'date-fns'

const AboutMe: React.FC = () => {
  const age = differenceInYears(new Date(), new Date(2001, 9, 7))

  return (
    <div className="pt-2 text-lg">
      <p>
        Hey! I'm Kirill Tregubov, a {age} year-old{' '}
        <span className="text-accent-500 dark:text-accent-400">
          full stack developer
        </span>{' '}
        based in Canada. I'm currently building modern web, mobile and desktop
        experiences using React, a JavaScript framework. My preferred tech stack
        includes Expo, Next.js, TailwindCSS, Node.js and PostgreSQL. I also
        graduated the University of Toronto with an{' '}
        <span className="text-accent-500 dark:text-accent-400">
          Honours Bachelor of Science in Computer Science
        </span>
        .
      </p>
      <p className="mt-4">
        I'm available for freelance work and job opportunities. If you have a
        project in mind or a position at your company, feel free to email me at{' '}
        <span className="whitespace-nowrap">
          <a
            href="mailto:contact@kirilltregubov.com"
            className="inline-link primary"
          >
            contact@kirilltregubov.com
          </a>
          .
        </span>
      </p>
    </div>
  )
}

export default AboutMe
