// Inspired by code from Build UI (Sam Selikoff) - https://buildui.com/recipes/animated-tabs
import { motion } from 'framer-motion'
import { useState } from 'react'

let tabs = [
  { id: '/', label: 'About Me' },
  { id: '/blog', label: 'Blog' }
]

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id
              ? 'ring-offset-1 ring-offset-neutral-900'
              : 'hover:text-neutral-400 focus-visible:text-neutral-400'
          } group relative !rounded-full px-3 py-1.5 font-medium transition-[color,box-shadow]`}
          style={{
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-white mix-blend-difference transition-colors group-focus-visible:bg-neutral-200"
              style={{ borderRadius: '9999px' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
