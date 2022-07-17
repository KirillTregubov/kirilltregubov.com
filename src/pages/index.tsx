import Layout from 'layouts/layout'
import AboutMe from 'components/AboutMe'
import TechStack from 'components/TechStack'
import ToolStack from 'components/ToolStack'
import Projects from 'components/Projects'

const Home: React.FC = () => {
  return (
    <Layout>
      <AboutMe />
      <div className="sticky">
        <h2 className="mt-8 text-xl font-semibold leading-none">Tech Stack</h2>
        <p className="mt-1.5 mb-3">
          Technologies and programming languages that I enjoy using and have
          worked with in the past.
        </p>
        <TechStack />
      </div>
      <div>
        <h2 className="mt-8 text-xl font-semibold leading-none">
          Tools &amp; Services
        </h2>
        <p className="mt-1.5 mb-3">
          Tools and services that I enjoy using and have experience with.
        </p>
        <ToolStack />
      </div>
      <div>
        <h2 className="mt-8 text-xl font-semibold leading-none">Projects</h2>
        <p className="mt-1.5 mb-3">
          Projects I have created and have contributed to.
        </p>
        <Projects />
      </div>
    </Layout>
  )
}

export default Home
