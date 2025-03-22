'use client'

import { useEffect, useState } from 'react'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false, loading: () => <div>読み込み中...</div> }
)

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
  height?: number
  placeholder?: string
}

export default function MarkdownEditor({
  content,
  onChange,
  height = 400,
  placeholder = 'Markdownを入力してください...',
}: MarkdownEditorProps) {
  // ビューポートの高さを計算するための状態
  const [visibleHeight, setVisibleHeight] = useState<number>(height)
  const [mounted, setMounted] = useState<boolean>(false)

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setMounted(true)
  }, [])

  // 親からのheightが指定されていない場合は、ビューポートの高さに基づいて計算
  useEffect(() => {
    if (height === 400 && mounted) {
      // デフォルト値が指定されている場合のみ自動調整
      const updateHeight = () => {
        setVisibleHeight(window.innerHeight - 160) // ヘッダーとその他の要素の高さを考慮
      }

      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
    }
  }, [height, mounted])

  // サーバーサイドレンダリング時は何も表示しない
  if (!mounted) {
    return null
  }

  return (
    <div data-color-mode="light">
      <MDEditor
        value={content}
        onChange={(newContent) => onChange(newContent || '')}
        preview="edit"
        height={visibleHeight}
        highlightEnable={true}
        fullscreen={false}
        enableScroll={true}
        textareaProps={{
          placeholder,
        }}
      />
    </div>
  )
}
