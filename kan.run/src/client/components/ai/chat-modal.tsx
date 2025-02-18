import WebLLMChat from '@/client/components/ai/web-llm-chat.tsx'
import type React from 'react'

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 sm:bottom-4 sm:right-4 sm:inset-auto w-full sm:w-96 h-full sm:h-[600px] bg-white sm:rounded-lg shadow-xl z-50 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-6 sm:p-4 bg-gray-100 border-b">
        <h2 className="text-xl sm:text-lg font-semibold text-gray-800">
          AIニノミヤくん
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <WebLLMChat />
      </div>
    </div>
  )
}

export default ChatModal
