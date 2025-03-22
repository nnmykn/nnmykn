'use client';

import { Button } from '@/client/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { hackmdApi } from '@/lib/api';
import useSWR from 'swr';

// クライアントサイドでのみインポートするためにdynamicを使用
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

// ページコンポーネントのprops型定義
interface EditorDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorDetailPage(props: EditorDetailPageProps) {
  'use client';
  
  const { id } = await props.params;
  const router = useRouter();
  
  // エディタの状態
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [visibleHeight, setVisibleHeight] = useState<number>(0);
  
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
  
  // ビューポートの高さを計算するための効果
  useEffect(() => {
    const updateHeight = () => {
      // ビューポートの高さから固定ヘッダーの高さ（およびパディング）を引いて計算
      setVisibleHeight(window.innerHeight - 160);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

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
            <h1 className="text-xl font-bold">読み込み中...</h1>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <p className="text-gray-500">ノートを読み込んでいます...</p>
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
        <div
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          data-color-mode="light"
        >
          <MDEditor
            value={content}
            onChange={(newContent) => setContent(newContent || '')}
            preview="edit"
            height={visibleHeight}
            highlightEnable={true}
            fullscreen={false}
            enableScroll={true}
            textareaProps={{
              placeholder: 'Markdownを入力してください...',
            }}
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

// Markdownをシンプルに変換する関数（実際はもっと高度なライブラリを使うべき）
function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown
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
    .replace(/\n/gim, '<br>');
    
  return html;
}
