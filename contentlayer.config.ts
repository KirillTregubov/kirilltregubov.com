import {
  defineDocumentType,
  makeSource,
  ComputedFields,
  defineNestedType
} from 'contentlayer/source-files'
import readingTime from 'reading-time'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => {
      return doc._raw.flattenedPath.replace(/([^\/]*\/){1}/, '')
    }
  },
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) }
}

const Image = defineNestedType(() => ({
  name: 'Image',
  fields: {
    path: { type: 'string', required: true },
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
    publishedTime: { type: 'string', required: true },
    modifiedTime: { type: 'string', default: 'none' },
    image: { type: 'nested', of: Image, required: true },
    topics: {
      type: 'list',
      of: { type: 'string' },
      required: true
    }
  },
  computedFields
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost]
})
