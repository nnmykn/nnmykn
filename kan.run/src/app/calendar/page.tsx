'use client'

import Page from '@/client/components/page'
import { Button } from '@/client/components/ui/button'
import { Input } from '@/client/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface CalendarEvent {
  summary: string
  description?: string
  start: Date
  end: Date
  location?: string
}

// APIレスポンスの型（日付が文字列形式）
interface ApiCalendarEvent {
  summary: string
  description?: string
  start: string | Date
  end: string | Date
  location?: string
}

// 日付を「YYYY-MM-DD」形式に変換する関数
const formatDateKey = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0]
}

// イベントの所要時間（分）を計算
const getDurationInMinutes = (start: Date, end: Date): number => {
  return Math.round((end.getTime() - start.getTime()) / (60 * 1000))
}

// 文字列が日付かどうかを確認
const isDateString = (value: any): boolean => {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

// APIイベントをアプリイベント形式に変換
const convertApiEvent = (event: ApiCalendarEvent): CalendarEvent => {
  return {
    summary: event.summary,
    description: event.description,
    start: isDateString(event.start)
      ? new Date(event.start as string)
      : (event.start as Date),
    end: isDateString(event.end)
      ? new Date(event.end as string)
      : (event.end as Date),
    location: event.location,
  }
}

// 指定した年月の日数を取得
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

// 指定した年月の最初の日の曜日を取得（0: 日曜日, 1: 月曜日, ..., 6: 土曜日）
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}

// URLをぼかす関数を追加
const obfuscateUrls = (text: string | undefined): string => {
  if (!text) return ''

  // URLを検出する正規表現
  const urlRegex = /(https?:\/\/[^\s]+)/g

  // URLの大部分を「*」に置き換える
  return text.replace(urlRegex, (url) => {
    // URLの全体長を取得
    const urlLength = url.length

    // 短いURLの場合はすべて*にする
    if (urlLength <= 10) {
      return '*'.repeat(urlLength)
    }

    // 先頭の7文字（https://など）と末尾の3文字を残し、その間を*でマスク
    const prefix = url.substring(0, 7)
    const suffix = url.substring(urlLength - 3)
    const maskedLength = urlLength - 10

    return prefix + '*'.repeat(maskedLength) + suffix
  })
}

export default function CalendarPage() {
  const searchParams = useSearchParams()
  const defaultKeyword = searchParams.get('keyword') || ''

  const [searchQuery, setSearchQuery] = useState(defaultKeyword)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // カレンダー関連の状態
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // 日本語の曜日
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']

  // 日本語の月名
  const monthNames = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ]

  // 検索処理を共通化（useCallbackで再レンダリング最適化）
  const searchEvents = useCallback(async (query: string) => {
    if (!query.trim()) {
      setEvents([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/calendar?query=${encodeURIComponent(query)}`,
      )
      if (!response.ok) {
        throw new Error('イベントの取得に失敗しました')
      }
      const data = await response.json()
      // APIからのイベントデータを処理して日付をDateオブジェクトに変換
      const convertedEvents = data.events.map(convertApiEvent)
      setEvents(convertedEvents)
    } catch (error) {
      console.error('Error fetching events:', error)
      alert('イベントの取得中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 検索ボタンクリック用
  const handleSearch = () => {
    searchEvents(searchQuery)
  }

  // ページロード時にデフォルトキーワードがある場合は検索を実行
  useEffect(() => {
    if (defaultKeyword) {
      searchEvents(defaultKeyword)
    }
  }, [defaultKeyword, searchEvents])

  // 前月に移動
  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1)
        return 11
      }
      return prevMonth - 1
    })
  }

  // 次月に移動
  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1)
        return 0
      }
      return prevMonth + 1
    })
  }

  // 今日に移動
  const goToToday = () => {
    const now = new Date()
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
    setSelectedDate(now)

    // 今日の日付で表示をフィルタリング
    if (events.length > 0) {
      const todayStr = formatDateKey(now)
      const filteredDayElement = document.getElementById(
        `day-group-${todayStr}`,
      )
      if (filteredDayElement) {
        filteredDayElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // 日付を選択
  const selectDate = (date: Date) => {
    setSelectedDate(date)

    // 選択された日付で表示をフィルタリング
    if (events.length > 0) {
      const dateStr = formatDateKey(date)
      const filteredDayElement = document.getElementById(`day-group-${dateStr}`)
      if (filteredDayElement) {
        filteredDayElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // カレンダーを生成
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // 前月の日を埋める
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center py-2 text-gray-300" />,
      )
    }

    // 月の日を追加
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dateStr = formatDateKey(date)
      const isToday = formatDateKey(new Date()) === dateStr
      const isSelected = selectedDate && formatDateKey(selectedDate) === dateStr

      // この日のイベントを確認
      const hasEvents = events.some(
        (event) => formatDateKey(event.start) === dateStr,
      )

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => selectDate(date)}
          className={`
            text-center py-2 cursor-pointer transition-colors rounded-full
            ${isToday ? 'ring-2 ring-blue-400 font-bold' : ''}
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
            ${hasEvents ? 'font-medium' : ''}
          `}
        >
          {day}
          {hasEvents && (
            <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1" />
          )}
        </div>,
      )
    }

    return days
  }

  // イベントの日付をフォーマットする関数
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // 時間のみをフォーマットする関数
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // 日付ヘッダーをフォーマットする関数
  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  // イベントを日付ごとにグループ化する関数
  const groupEventsByDate = (events: CalendarEvent[]) => {
    const grouped: { [key: string]: CalendarEvent[] } = {}

    events.forEach((event) => {
      // ここでevent.startがDateオブジェクトであることを確認
      const dateKey = formatDateKey(event.start)
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })

    // 日付でソート
    return Object.keys(grouped)
      .sort()
      .map((date) => ({
        date,
        events: grouped[date].sort(
          (a, b) => a.start.getTime() - b.start.getTime(),
        ),
      }))
  }

  // イベントの時間に基づいて色を返す
  const getEventColor = (duration: number) => {
    if (duration <= 30) return 'border-blue-300 bg-blue-50'
    if (duration <= 60) return 'border-indigo-300 bg-indigo-50'
    if (duration <= 120) return 'border-purple-300 bg-purple-50'
    return 'border-pink-300 bg-pink-50'
  }

  // 選択された日付に基づいてイベントをフィルタリング
  const filteredEvents = selectedDate
    ? events.filter(
        (event) => formatDateKey(event.start) === formatDateKey(selectedDate),
      )
    : events

  // グループ化されたイベント（タイムライン表示用）
  const groupedEvents = groupEventsByDate(filteredEvents)

  return (
    <Page>
      <div className="container mx-auto py-8 px-4">
        <div className="m-4 text-xl">
          <h2 className="font-angle text-5xl">カレンダー。</h2>
        </div>

        {/* 検索フォーム */}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="検索したいイベント名、説明などを入力してください"
                className="flex-1"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === 'Enter' && handleSearch()
                }
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? '検索中...' : '検索'}
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            入力されたキーワードを含むすべてのイベントが表示されます（大文字・小文字は区別されません）
          </p>
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-medium">ヒント:</span> URLパラメータ{' '}
            <code>?keyword=検索語</code>{' '}
            で検索キーワードを指定することもできます
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-medium">ヒント:</span>{' '}
            各イベントの最小時間は15分です
          </div>
          {selectedDate && (
            <div className="mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md inline-block text-xs">
              {selectedDate.toLocaleDateString('ja-JP')}のイベントを表示中
              <button
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => setSelectedDate(null)}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* カレンダー表示 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-semibold">
                {currentYear}年 {monthNames[currentMonth]}
              </h3>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <Button onClick={goToToday} variant="outline" className="text-sm">
              今日
            </Button>
          </div>

          {/* 曜日の見出し */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day, index) => (
              <div
                key={day}
                className={`text-center font-medium text-sm py-1 
                  ${index === 0 ? 'text-red-500' : ''} 
                  ${index === 6 ? 'text-blue-500' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 日付グリッド */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>

        {filteredEvents.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              検索結果: {filteredEvents.length}件
              {selectedDate && ` (${selectedDate.toLocaleDateString('ja-JP')})`}
            </h2>

            {/* タイムライン表示 */}
            <div className="timeline-container">
              {groupedEvents.map(({ date, events }) => (
                <div key={date} className="mb-12" id={`day-group-${date}`}>
                  <div className="sticky top-0 bg-white py-3 z-10 border-b-2 border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                      <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2" />
                      {formatDateHeader(date)}
                    </h3>
                  </div>

                  <div className="ml-4 space-y-0 pt-4">
                    {events.map((event, index) => {
                      const duration = getDurationInMinutes(
                        event.start,
                        event.end,
                      )
                      const colorClass = getEventColor(duration)

                      return (
                        <div key={index} className="relative pl-10 pt-2 pb-6">
                          {/* タイムラインのライン */}
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />

                          {/* タイムラインのドット */}
                          <div className="absolute left-[-4px] top-6 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />

                          {/* 時間表示 */}
                          <div className="absolute left-4 top-6 transform -translate-y-1/2 text-xs font-bold text-gray-500 whitespace-nowrap">
                            {formatTime(event.start)}
                          </div>

                          {/* イベントカード */}
                          <div
                            className={`relative ml-8 p-4 bg-white border-l-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${colorClass}`}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="text-base font-semibold text-gray-900">
                                {event.summary}
                              </h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {duration}分
                              </span>
                            </div>

                            {event.description && (
                              <p className="mt-2 text-sm text-gray-600">
                                {obfuscateUrls(event.description)}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <span className="font-medium bg-gray-100 px-2 py-1 rounded-lg">
                                {formatTime(event.start)} -{' '}
                                {formatTime(event.end)}
                              </span>

                              {event.location && (
                                <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                                  <svg
                                    className="w-3 h-3 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchQuery && !isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">検索結果はありません</p>
          </div>
        ) : null}
      </div>
    </Page>
  )
}
