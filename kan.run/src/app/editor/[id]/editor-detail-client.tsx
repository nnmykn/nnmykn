'use client';

import { Button } from '@/client/components/ui/button';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { hackmdApi } from '@/lib/api';
import useSWR from 'swr';
import MarkdownEditor from '@/client/components/markdown-editor';
import { Skeleton } from '@/client/components/ui/skeleton';

interface EditorDetailClientProps {
  id: string;
}

export function EditorDetailClient({ id }: EditorDetailClientProps) {
  const router = useRouter();
  
  // エディタの状態
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // SWRでノートデータを取得
  const { data: note, error, isValidating, mutate } = useSWR(
    `note-${id}`,
    () => hackmdApi.getNote(id),
    {
      onSuccess: (data) => {
        // 初回データ取得時に内容を設定
        if (!content && data.content) {
          setContent(data.content);
        }
        if (!title && data.title) {
          setTitle(data.title);
        }
      },
      onError: () => {
        toast.error('ノートの取得に失敗しました');
        router.push('/editor');
      },
    }
  );

  // ノートの更新
  const updateNote = useCallback(async () => {
    setIsSaving(true);
    try {
      await hackmdApi.updateNote(id, { title, content });
      toast.success('ノートを保存しました');
      // SWRのキャッシュを更新
      mutate();
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('ノートの更新に失敗しました');
    } finally {
      setIsSaving(false);
    }
  }, [content, id, title, mutate]);

  // 読み込み中の場合
  const isLoading = !note && isValidating;
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 bg-white border-b z-10 p-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/editor')}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
        <div className="flex-1 p-6">
          <Skeleton className="h-10 w-full max-w-md mb-6" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-4 w-full max-w-4xl mb-2" />
          <Skeleton className="h-4 w-full max-w-3xl mb-2" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 固定されたヘッダー */}
      <div className="sticky top-0 bg-white border-b z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/editor')}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
              className="text-lg font-medium p-1 focus:outline-none border-b border-transparent focus:border-blue-500 mr-4 w-48 sm:w-auto"
              disabled={isSaving}
            />
          </div>
          <Button 
            onClick={updateNote}
            disabled={isSaving}
            size="sm"
            className="whitespace-nowrap gap-1"
          >
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">保存</span>
          </Button>
        </div>
      </div>

      {/* エディタエリア */}
      <div className="flex-1 px-4 py-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <MarkdownEditor
            content={content}
            onChange={setContent}
            placeholder="Markdownを入力してください..."
          />
        </div>
      </div>

      {/* モバイル用の保存ボタン */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button 
          onClick={updateNote}
          disabled={isSaving}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <Check className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
} 