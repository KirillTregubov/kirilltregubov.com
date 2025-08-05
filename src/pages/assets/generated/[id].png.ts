import type { APIContext } from 'astro'
import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'
import fs from 'node:fs'
import { getCollection } from 'astro:content'
import type { ReactNode } from 'react'

const backgrounds = await getCollection('overbuddy')

// const inter = fs.readFileSync('public/fonts/Inter-Regular.ttf')
const interBold = fs.readFileSync('public/fonts/Inter-Bold.ttf')
// const sourceHanSans = fs.readFileSync('public/fonts/SourceHanSansCN-Bold.otf')

const width = 1200
const height = 630

export async function GET({ props }: APIContext) {
  // const { title, description } = props
  const image = fs.readFileSync(`public${props.image.replace(/\?.*$/, '')}`, {
    encoding: 'base64'
  })

  const markup = html` <div
    style="color: white; background-color: #171717; width: ${width}px; height: ${height}px; display: flex; flex-direction: column; box-sizing: border-box;"
  >
    <img
      src="data:image/jpeg;base64,${image}"
      width="${width}"
      height="${height}"
      style="position: absolute; top: 0; left: 0; object-fit: cover;"
    />
    <div
      id="logo"
      style="background-color: rgba(9, 9, 11, 0.6); box-sizing: border-box; border-radius: 32px; margin: 24px; padding: 8px 10px; display: flex; gap: 8px; align-items: center; position: absolute; bottom: 0; right: 0;"
    >
      <img
        src="https://raw.githubusercontent.com/KirillTregubov/OverBuddy/refs/heads/main/src-tauri/icons/Square44x44Logo.png"
        width="44"
        height="44"
      />
      <div style="font-size: 22px; font-weight: 700; padding-right: 4px;">
        OverBuddy
      </div>
    </div>
  </div>` as ReactNode
  // <div style="background-color: rgba(9, 9, 11, 0.5); z-index: 1; width: 100%; height: 100%; display: flex; justify-content: center; padding: 0px 64px; flex-direction: column;">
  //   <div style="font-size: 48px; font-weight: 700; padding-bottom: 16px;">${title}</div>
  //   <div style="font-size: 32px;">${description}</div>
  // </div>

  const svg = await satori(markup, {
    width,
    height,
    fonts: [
      // {
      //   name: 'Inter',
      //   data: inter,
      //   weight: 400
      // }
      {
        name: 'Inter',
        data: interBold,
        weight: 700
      }
      // {
      //   name: 'Source Han Sans',
      //   data: sourceHanSans,
      //   weight: 700
      // }
    ]
  })

  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer as Buffer<ArrayBuffer>, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}

export async function getStaticPaths() {
  if (!backgrounds) return []

  return backgrounds.map((background) => ({
    params: {
      id: background.id
    },
    props: {
      ...background.data
    }
  }))
}
