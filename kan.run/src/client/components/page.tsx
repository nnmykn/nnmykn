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
          <div className='flex items-center justify-center my-32'>
          <img src='/ai-ninomiya-icon.png' className='w-[40%] h-auto' alt={'ai-ninomiya-icon'} />
          <h1 className={'font-angle text-7xl text-center hidden'}>
            ニノミヤ カン。
            </h1>
          </div>
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
