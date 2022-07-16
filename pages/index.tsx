import Layout from 'layouts/layout'
import AboutMe from 'components/AboutMe'
import TechStack from 'components/TechStack'

const Home: React.FC = () => {
  return (
    <Layout>
      <AboutMe />
      <div>
        <h2 className="mt-6 text-xl font-semibold">Tech Stack</h2>
        <p className="mt-1 mb-2">
          Technologies and programming languages that I enjoy using and have
          worked with in the past.
        </p>
        <TechStack />
      </div>
      <div>
        <h2 className="mt-6 text-xl font-semibold">Familiar Tools</h2>
        <p className="mt-1 mb-2">
          Tools and services that I enjoy using and have worked with in the
          past.
        </p>
      </div>
      {/* Tools I am familiar with: Visual Studio Code, Mbed studio, Vercel and Netlify for hosting, Figma, Microsoft Office, Postman (API), MARS, Logisim, Eclipse, IntelliJ IDEA, PyCharm, DrRacket, RStudio */}
    </Layout>
  )
}

export default Home
