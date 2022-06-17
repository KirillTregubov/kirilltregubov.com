import {
  defineDocumentType,
  makeSource,
  ComputedFields
} from 'contentlayer/source-files'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/([^\/]*\/){1}/, '')
  }
}

const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    published_time: { type: 'string', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: true }
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
