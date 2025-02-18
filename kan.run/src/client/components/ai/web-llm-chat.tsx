'use client'

import { CreateMLCEngine } from '@mlc-ai/web-llm'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function WebLLMChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  )
  const [engine, setEngine] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const selectedModel = 'Llama-3.2-3B-Instruct-q4f16_1-MLC'

  useEffect(() => {
    const initEngine = async () => {
      try {
        const newEngine = await CreateMLCEngine(
          selectedModel,
          {
            initProgressCallback: (progress) => {
              console.log('Loading progress:', progress)
              // @ts-ignore
              setLoadingProgress(Math.round(progress * 100))
            },
          },
          {
            context_window_size: 128000,
          },
        )

        let systemPrompt =
          'あなたは「二宮 貫(にのみや かん)」として返答してください。'

        try {
          const urls = [
            'https://www.kan.run',
            'https://www.kan.run/tech',
            'https://www.kan.run/story',
          ]

          const responses = await Promise.all(
            urls.map((url) =>
              fetch(url)
                .then((res) => res.text())
                .catch((err) => {
                  console.warn(`Failed to fetch ${url}:`, err)
                  return null
                }),
            ),
          )

          const validResponses = responses.filter((r) => r !== null)
          if (validResponses.length > 0) {
            systemPrompt += `\n\n二宮貫の情報は以下のとおりです：\n${validResponses.join('\n\n')}`
          }
        } catch (err) {
          console.warn('Failed to fetch website content:', err)
        }

        setMessages([{ role: 'system', content: systemPrompt }])

        setEngine(newEngine)
        setIsLoading(false)
      } catch (err) {
        console.error('Error initializing engine:', err)
        setError('Failed to initialize the chat engine. Please try again.')
        setIsLoading(false)
      }
    }

    initEngine()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim() || !engine) return

      const userMessage = { role: 'user', content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput('')

      try {
        const reply = await engine.chat.completions.create({
          messages: [...messages, userMessage],
          temperature: 0.7,
        })

        const assistantMessage = {
          role: 'assistant',
          content: reply.choices[0].message.content,
        }
        setMessages((prev) => [...prev, assistantMessage])
      } catch (err) {
        console.error('Error generating response:', err)
        setError('Failed to generate a response. Please try again.')
      }
    },
    [input, engine, messages],
  )

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full p-4 bg-gray-100">
        <div className="text-center mb-4 text-gray-700 font-semibold">
          LLMをローカルに読み込んでいます。LLMの読み込みには時間がかかります。通常数分かかります。
        </div>
        {/*読み込んでいるモデルを表示*/}
        <div className="text-center mb-4 text-gray-700 font-semibold">
          モデル: {selectedModel}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500 bg-red-100 p-4 rounded">
        {error}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages
          .filter((msg) => msg.role !== 'system')
          .map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-[#ED7201] text-white self-end'
                  : 'bg-white text-gray-800 self-start'
              }`}
            >
              {msg.content}
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 focus:outline-none"
            placeholder="メッセージを入力..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  )
}
