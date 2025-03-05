'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/client/components/ui/input';
import { Button } from '@/client/components/ui/button';
import { useSearchParams } from 'next/navigation';
import Page from '@/client/components/page';

interface CalendarEvent {
  summary: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
}

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const defaultKeyword = searchParams.get('keyword') || '';
  
  const [searchQuery, setSearchQuery] = useState(defaultKeyword);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 検索処理を共通化（useCallbackで再レンダリング最適化）
  const searchEvents = useCallback(async (query: string) => {
    if (!query.trim()) {
      setEvents([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/calendar?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('イベントの取得に失敗しました');
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('イベントの取得中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 検索ボタンクリック用
  const handleSearch = () => {
    searchEvents(searchQuery);
  };

  // ページロード時にデフォルトキーワードがある場合は検索を実行
  useEffect(() => {
    if (defaultKeyword) {
      searchEvents(defaultKeyword);
    }
  }, [defaultKeyword, searchEvents]);

  // イベントの日付をフォーマットする関数
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Page>
    <div className="container mx-auto py-8 px-4">
    <div className="m-4 text-xl">
        <h2 className="font-angle text-5xl">カレンダー。</h2>
      </div>
      <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            検索キーワード
          </label>
          <div className="flex gap-2">
            <Input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="検索したいイベント名、説明などを入力してください"
              className="flex-1"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? '検索中...' : '検索'}
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          入力されたキーワードを含むすべてのイベントが表示されます（大文字・小文字は区別されません）
        </p>
        <div className="mt-2 text-xs text-gray-500">
          <span className="font-medium">ヒント:</span> URLパラメータ <code>?keyword=検索語</code> で検索キーワードを指定することもできます
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span className="font-medium">ヒント:</span> 各イベントの最小時間は15分です
        </div>
      </div>

      {events.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">検索結果: {events.length}件</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <h3 className="text-lg font-medium">{event.summary}</h3>
                {event.description && (
                  <p className="mt-2 text-gray-600">{event.description}</p>
                )}
                <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">開始:</span> {formatDate(event.start)}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">終了:</span> {formatDate(event.end)}
                  </div>
                </div>
                {event.location && (
                  <div className="mt-1 text-sm text-gray-500">
                    <span className="font-medium">場所:</span> {event.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : searchQuery && !isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">検索結果はありません</p>
        </div>
      ) : null}
    </div></Page>
  );
} 