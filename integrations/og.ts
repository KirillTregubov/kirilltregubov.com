import type { AstroIntegration } from 'astro'
import fs from 'node:fs'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import type { ReactNode } from 'react'
import { fileURLToPath } from 'node:url'
// import type { OverbuddyBackgrounds } from 'src/content.config'

const render = (title: string) =>
  ({
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#161618',
        padding: '55px 70px',
        color: '#70E1C8',
        fontFamily: 'Inter',
        fontSize: 72
      },
      children: [
        {
          type: 'svg',
          props: {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '48',
            height: '48',
            viewBox: '0 0 48 48',
            fill: 'none',
            children: {
              type: 'path',
              props: {
                d: 'M7.03846 40.9615C4.91538 38.8385 6.32308 34.3846 5.23846 31.7769C4.15385 29.1692 0 26.8846 0 24C0 21.1154 4.10769 18.9231 5.23846 16.2231C6.36923 13.5231 4.91538 9.16154 7.03846 7.03846C9.16154 4.91538 13.6154 6.32308 16.2231 5.23846C18.8308 4.15385 21.1154 0 24 0C26.8846 0 29.0769 4.10769 31.7769 5.23846C34.4769 6.36923 38.8385 4.91538 40.9615 7.03846C43.0846 9.16154 41.6769 13.6154 42.7615 16.2231C43.8462 18.8308 48 21.1154 48 24C48 26.8846 43.8923 29.0769 42.7615 31.7769C41.6308 34.4769 43.0846 38.8385 40.9615 40.9615C38.8385 43.0846 34.3846 41.6769 31.7769 42.7615C29.1692 43.8462 26.8846 48 24 48C21.1154 48 18.9231 43.8923 16.2231 42.7615C13.5231 41.6308 9.16154 43.0846 7.03846 40.9615Z',
                fill: '#FFA800',
                fillOpacity: '0.75'
              }
            }
          }
        },
        {
          type: 'div',
          props: {
            style: { marginTop: 96 },
            children: title
          }
        }
      ]
    }
  }) as ReactNode

const og = (): AstroIntegration => ({
  name: 'satori-og',
  hooks: {
    // TODO: try to implement in dev mode
    'astro:build:done': async ({ dir, pages }) => {
      try {
        const overbuddyBackgrounds = JSON.parse(
          fs.readFileSync(`src/content/overbuddy/backgrounds.json`, 'utf8')
        ) as { id: string; title: string }[]
        const inter = fs.readFileSync('public/fonts/Inter-Regular.ttf')

        for (const { pathname } of pages) {
          if (!pathname.startsWith('overbuddy/') || pathname === 'overbuddy/')
            continue
          console.log(pathname)

          const backgroundId = pathname.replace(/\/+$/, '').split('/').pop()
          const background = overbuddyBackgrounds.find(
            ({ id }) => id === backgroundId
          )
          if (!background) continue
          const { title } = background

          const svg = await satori(render(title), {
            width: 1200,
            height: 630,
            fonts: [
              {
                name: 'Inter',
                data: inter,
                weight: 400,
                style: 'normal'
              }
            ]
          })

          const resvg = new Resvg(svg, {
            fitTo: {
              mode: 'width',
              value: 1200
            }
          })

          console.log(fileURLToPath(new URL(`${pathname}og.png`, dir)))

          fs.writeFileSync(
            fileURLToPath(new URL(`${pathname}og.png`, dir)),
            resvg.render().asPng()
          )
        }

        console.log(`\x1b[32mog:\x1b[0m Generated OpenGraph images\n`)
      } catch (e) {
        console.error(e)
        console.log(`\x1b[31mog:\x1b[0m OpenGraph image generation failed\n`)
      }
    }
  }
})

export default og
