'use client'

import { Button } from '@/client/components/ui/button'
import { Skeleton } from '@/client/components/ui/skeleton'
import { type HackMDNote, hackmdApi } from '@/lib/api'
import { LayoutGridIcon, ListIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

export default function EditorPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  // SWRでノート一覧を取得
  const {
    data: notes,
    error,
    isLoading,
    mutate,
  } = useSWR<HackMDNote[]>('notes', () => hackmdApi.getNotes())

  // エラーがあれば表示
  if (error) {
    toast.error('ノート一覧の取得に失敗しました')
  }

  // 新規ノート作成
  const createNewNote = useCallback(async () => {
    try {
      const newNote = await hackmdApi.createNote({
        title: '新規ノート',
        content: '# 新規ノート\n\nここに内容を入力してください',
      })

      toast.success('新しいノートを作成しました')

      // 新規作成したノートの編集画面に遷移
      router.push(`/editor/${newNote.id}`)
    } catch (error) {
      console.error('Error creating note:', error)
      toast.error('ノートの作成に失敗しました')
    }
  }, [router])

  // ノートの編集画面に遷移
  const goToEditNote = useCallback(
    (noteId: string) => {
      router.push(`/editor/${noteId}`)
    },
    [router],
  )

  // ノートのリスト表示
  const renderNotesList = () => (
    <div className="space-y-2">
      {notes?.map((note) => (
        <div
          key={note.id}
          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
          onClick={() => goToEditNote(note.id)}
        >
          <h3 className="font-medium text-base mb-1 truncate">{note.title}</h3>
          <div className="text-xs text-gray-500">
            <span>
              更新: {new Date(note.lastChangedAt).toLocaleDateString('ja-JP')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  // ノートのグリッド表示
  const renderNotesGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {notes?.map((note) => (
        <div
          key={note.id}
          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100 h-32 flex flex-col justify-between"
          onClick={() => goToEditNote(note.id)}
        >
          <h3 className="font-medium text-lg mb-2 truncate">{note.title}</h3>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>
              作成: {new Date(note.createdAt).toLocaleDateString('ja-JP')}
            </span>
            <span>
              更新: {new Date(note.lastChangedAt).toLocaleDateString('ja-JP')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4 pb-24">
      {/* 固定されたヘッダー */}
      <div className="sticky top-0 bg-white border-b z-10 py-4 mb-6">
        <h1 className="text-xl font-bold">Markdownエディタ</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-4 border-b sticky top-16 bg-white z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">ノート一覧</h2>
            {/* 表示切替ボタン */}
            <div className="flex rounded-md overflow-hidden border">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
                aria-label="グリッド表示"
              >
                <LayoutGridIcon className="h-4 w-4" />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
                aria-label="リスト表示"
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Button
            onClick={createNewNote}
            disabled={isLoading}
            size="sm"
            className="rounded-full h-10 w-10 p-0"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          {(!notes || notes.length === 0) && !isLoading ? (
            <div className="p-10 text-center">
              <p className="text-gray-500 mb-4">ノートがありません</p>
              <Button onClick={createNewNote}>新規ノートを作成</Button>
            </div>
          ) : viewMode === 'grid' ? (
            renderNotesGrid()
          ) : (
            renderNotesList()
          )}

          {isLoading && (
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 新規作成ボタン（モバイル用フローティング） */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button
          onClick={createNewNote}
          disabled={isLoading}
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

// Markdownをシンプルに変換する関数（実際はもっと高度なライブラリを使うべき）
function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return ''

  const html = markdown
    // ヘッダー
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 太字
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // 斜体
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // コード
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    // リンク
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    // 改行
    .replace(/\n/gim, '<br>')

  return html
}
