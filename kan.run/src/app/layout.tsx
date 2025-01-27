import { Toaster } from '@/client/components/ui/sonner'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import localFont from 'next/font/local'
import type React from 'react'

import './global.css'

const font = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

const angle = localFont({
  src: './Angle-VariableVF.ttf',
  variable: '--font-angle',
})

export const metadata: Metadata = {
  description: 'ニノミヤカンについての情報がまとめられているウェブサイトです。',
  title: '二宮 貫 | Kan Ninomiya | ニノミヤ カン | にのみや かん',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={'ja'}>
      <body className={`${font.variable} ${angle.variable}`}>
        <div className="mx-auto w-full max-w-[500px] shadow-xl min-h-screen overflow-x-hidden">
          {children}
        </div>
        <Toaster richColors={true} />
      </body>
    </html>
  )
}
