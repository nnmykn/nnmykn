'use client'

import { motion } from 'framer-motion'
import { type ReactElement, useState } from 'react'

type Props = {
  trigger: ReactElement
}

export function SpotifyDrawer({ trigger }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={'cursor-pointer'} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { x: 'var(--x-open)', y: 'var(--y-open)' },
          closed: { x: 'var(--x-closed)', y: 'var(--y-closed)' },
        }}
        className="fixed right-0 bottom-0 z-10 [--x-closed:-1rem] [--x-open:-1rem] [--y-closed:400px] [--y-open:-1rem] md:[--x-closed:110%] md:[--x-open:-1rem] md:[--y-closed:-1rem] md:[--y-open:-1rem]"
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/7AMc1adYOcWvWIF2com4AR?utm_source=generator&theme=0"
          width="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="h-[352px] w-[calc(100vw_-_2rem)] md:h-[500px] md:w-[352px]"
        />
      </motion.div>
    </>
  )
}
