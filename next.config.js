const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx']
}

module.exports = withMDX(nextConfig)

// const { withContentlayer } = require('next-contentlayer')
// /** @type {import('next').NextConfig} */
// module.exports = {}
// withContentlayer({
//   reactStrictMode: true,
//   swcMinify: true,
//   async redirects() {
//     return [
//       {
//         source: '/blog',
//         destination: '/',
//         permanent: false,
//       },
//       {
//         source: '/blog/:slug*',
//         destination: '/',
//         permanent: false,
//       },
//     ]
//   },
// })
