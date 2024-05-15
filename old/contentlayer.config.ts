import {
  defineDocumentType,
  makeSource,
  ComputedFields,
  defineNestedType
} from 'contentlayer/source-files'
import readingTime from 'reading-time'

import { allTechnologies } from './src/lib/content'

const sharedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => {
      return doc._raw.flattenedPath.replace(/([^\/]*\/){1}/, '')
    }
  }
}

const Image = defineNestedType(() => ({
  name: 'Image',
  fields: {
    path: { type: 'string' },
    alt: { type: 'string' }
  }
}))

const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    status: { type: 'enum', options: ['draft', 'published'], required: true },
    publishedTime: { type: 'string', required: true },
    modifiedTime: { type: 'string' },
    image: { type: 'nested', of: Image, required: true },
    topics: {
      type: 'list',
      of: { type: 'string' },
      required: true
    }
  },
  computedFields: {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    ...sharedFields
  }
}))

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    dateAdded: { type: 'string', required: true },
    image: { type: 'nested', of: Image, required: true },
    technologies: {
      type: 'list',
      of: { type: 'enum', required: true, options: allTechnologies },
      required: true
    },
    source: { type: 'string' },
    demo: { type: 'string' }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, Project]
})
