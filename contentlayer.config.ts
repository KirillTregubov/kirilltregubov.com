import {
  defineDocumentType,
  makeSource,
  ComputedFields,
  defineNestedType
} from 'contentlayer/source-files'

const computedFields: ComputedFields = {
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
    publishedTime: { type: 'string', required: true },
    modifiedTime: { type: 'string' },
    description: { type: 'string', required: true },
    image: { type: 'nested', of: Image },
    topics: {
      type: 'list',
      of: { type: 'string' },
      required: true
    }
  },
  computedFields
}))

// const Topic = defineDocumentType(() => ({
//   name: 'Topic',
// }))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost]
})
