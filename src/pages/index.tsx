import { useState } from 'react'
import type { InferGetStaticPropsType } from 'next'
import { pick } from 'contentlayer/client'
import { allProjects } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import Layout from 'layouts/layout'
import AboutMe from 'components/AboutMe'
import TechStack from 'components/TechStack'
import ToolStack from 'components/ToolStack'
import ProjectPreview from 'components/ProjectPreview'

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects
}) => {
  return (
    <Layout>
      <p>Home Blog Resources</p>
      <AboutMe />
      <div>
        <h2 className="mt-12 text-xl font-semibold leading-none">Tech Stack</h2>
        <p className="mt-1.5 mb-3">
          Technologies and programming languages that I enjoy using and have
          worked with in the past.
        </p>
        <TechStack />
      </div>
      <div>
        <h2 className="mt-12 text-xl font-semibold leading-none">
          Tools &amp; Services
        </h2>
        <p className="mt-1.5 mb-3">
          Tools and services that I enjoy using on a regular basis and have
          experience with.
        </p>
        <ToolStack />
      </div>
      <div>
        <h2 className="mt-12 text-xl font-semibold leading-none">Projects</h2>
        <p className="mt-1.5 mb-3">
          Projects that I created and have contributed to.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-8 gap-x-10 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectPreview key={project.name} {...project} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home

export const getStaticProps = async () => {
  const projects = allProjects
    .map((project) =>
      pick(project, [
        'name',
        'description',
        'dateAdded',
        'image',
        'technologies',
        'source',
        'demo'
      ])
    )
    .sort((a, b) => compareDesc(new Date(a.dateAdded), new Date(b.dateAdded)))
  // .map((project) => {
  //   if (project.technologies[0] === null) {
  //     let newProject = project
  //     newProject.technologies = []
  //     return newProject
  //   } else {
  //     return project
  //   }
  // })

  return { props: { projects } }
}
