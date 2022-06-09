import type { NextPage } from 'next'
// import Image from 'next/image'

import Layout from 'layouts/layout'
import AboutMe from 'components/AboutMe'

const Home: NextPage = () => {
  return (
    <Layout>
      <div>Index page</div>
      <AboutMe />
    </Layout>
  )
}

export default Home
