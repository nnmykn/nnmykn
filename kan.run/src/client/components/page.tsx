'use client'
import ChatButton from '@/client/components/ai/chat-button.tsx'
import ChatModal from '@/client/components/ai/chat-modal.tsx'
import Link from 'next/link'
import { type ReactNode, useState } from 'react'

type Props = {
  children: ReactNode
}

export default function Page({ children }: Props) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }
  return (
    <div>
      <div className={'space-y-4'}>
        <Link href={'/'}>
          <h1 className={'font-angle text-7xl text-center my-32'}>
            ニノミヤ カン。
          </h1>
        </Link>
      </div>
      <div>{children}</div>
      <div className={'space-y-4'}>
        <Link href={'/'}>
          <h3 className={'font-angle text-7xl text-center my-24'}>
            ニノミヤ カン。
          </h3>
        </Link>
      </div>
      <ChatButton onClick={toggleChat} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
