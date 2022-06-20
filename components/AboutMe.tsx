import { differenceInYears } from 'date-fns'

const AboutMe: React.FC = () => {
  const age = differenceInYears(new Date(), new Date(2001, 9, 7))

  return (
    <div className="text-lg">
      <p>
        Hey! I'm Kirill Tregubov, a {age} year-old{' '}
        <span className="text-orange-400">full-stack developer</span> based in
        Canada. I'm currently building modern web experiences using Next.js, a
        React-based JavaScript framework. My preferred tech stack includes
        TailwindCSS, Node.js, Prisma, and SQL. I'm also a fourth-year university
        student{' '}
        <span className="text-orange-400">
          pursuing a BSc in Computer Science
        </span>{' '}
        at the University of Toronto.
      </p>
      <p className="mt-4">
        I'm available for freelance work and job opportunities. If you have a
        project in mind or a position at your company, feel free to email me at{' '}
        <a href="mailto:contact@kirilltregubov.com" className="inline-link">
          contact@kirilltregubov.com
        </a>
        .
      </p>
    </div>
  )
}

export default AboutMe
