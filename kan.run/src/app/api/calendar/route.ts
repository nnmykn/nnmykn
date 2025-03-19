import ICAL from 'ical.js'
import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Google Calendar の ICS URL
const CALENDAR_URL =
  'https://calendar.google.com/calendar/ical/ninomiyakan20051011%40gmail.com/public/basic.ics'

interface CalendarEvent {
  summary: string
  description?: string
  start: Date
  end: Date
  tags: string[]
  location?: string
}

// キャッシュの型定義
interface CacheData {
  events: CalendarEvent[]
  timestamp: number
}

// キャッシュの有効期限（1時間）
const CACHE_TTL = 60 * 60 * 1000

// キャッシュデータ
let cachedData: CacheData | null = null

// 検索用のインデックス
type SearchIndex = {
  [keyword: string]: Set<number>
}

// 検索用インデックス
let searchIndex: SearchIndex | null = null

export async function GET(request: NextRequest) {
  try {
    // URLパラメータから検索クエリを取得
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (!query) {
      return NextResponse.json(
        { error: '検索クエリが指定されていません' },
        { status: 400 },
      )
    }

    // キャッシュからデータを取得するか、必要に応じて更新
    const events = await getCalendarEvents()

    // クエリに一致するイベントをフィルタリング（より効率的に）
    const matchingEvents = filterEventsWithIndex(events, query.toLowerCase())

    return NextResponse.json({ events: matchingEvents })
  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json(
      { error: 'カレンダーデータの取得中にエラーが発生しました' },
      { status: 500 },
    )
  }
}

// キャッシュからイベントを取得する関数
async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const now = Date.now()
  
  // キャッシュが有効な場合はキャッシュを返す
  if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
    return cachedData.events
  }
  
  // キャッシュがない、または期限切れの場合は新しいデータを取得
  const events = await fetchCalendarData()
  
  // キャッシュを更新
  cachedData = {
    events,
    timestamp: now
  }
  
  // 検索インデックスを構築
  buildSearchIndex(events)
  
  return events
}

// 検索インデックスを構築する関数
function buildSearchIndex(events: CalendarEvent[]): void {
  const index: SearchIndex = {}
  
  events.forEach((event, idx) => {
    // イベントの各テキストフィールドから単語を抽出してインデックス化
    const textsToIndex = [
      event.summary,
      event.description || '',
      event.location || '',
      ...event.tags
    ]
    
    textsToIndex.forEach(text => {
      if (!text) return
      
      const words = text.toLowerCase().split(/\s+/)
      words.forEach(word => {
        if (word.length < 2) return // 短すぎる単語は無視
        
        if (!index[word]) {
          index[word] = new Set()
        }
        index[word].add(idx)
      })
    })
  })
  
  searchIndex = index
}

// インデックスを使用したフィルタリング
function filterEventsWithIndex(events: CalendarEvent[], searchQuery: string): CalendarEvent[] {
  if (!searchQuery) return events
  if (events.length === 0) return []
  
  // インデックスがない場合は通常のフィルタリング
  if (!searchIndex) {
    return filterEvents(events, searchQuery)
  }
  
  // 検索クエリを単語に分割
  const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(w => w.length >= 2)
  
  // クエリが空の場合は全イベントを返す
  if (queryWords.length === 0) return events
  
  // 各単語に一致するイベントのインデックスを取得
  const matchingSets: Set<number>[] = []
  
  queryWords.forEach(word => {
    // 部分一致を処理する
    const matchingIndices = new Set<number>()
    
    // インデックス内の単語でこのクエリ単語を含むものを検索
    Object.keys(searchIndex!).forEach(indexWord => {
      if (indexWord.includes(word)) {
        // この単語を含むすべてのイベントインデックスを追加
        searchIndex![indexWord].forEach(idx => matchingIndices.add(idx))
      }
    })
    
    if (matchingIndices.size > 0) {
      matchingSets.push(matchingIndices)
    }
  })
  
  // マッチするインデックスがない場合は空の配列を返す
  if (matchingSets.length === 0) return []
  
  // すべての単語に一致するイベントのみを返す（AND検索）
  let resultIndices = matchingSets[0]
  
  // 複数の単語がある場合は、すべての単語を含むイベントのみをフィルタリング
  for (let i = 1; i < matchingSets.length; i++) {
    resultIndices = new Set(
      [...resultIndices].filter(idx => matchingSets[i].has(idx))
    )
  }
  
  // 結果のイベントを返す
  return [...resultIndices].map(idx => events[idx])
}

// iCalデータを取得する関数
async function fetchCalendarData(): Promise<CalendarEvent[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2500) // 2.5秒タイムアウト
    
    const response = await fetch(CALENDAR_URL, {
      next: { revalidate: 3600 }, // 1時間ごとに再検証
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`カレンダーの取得に失敗しました: ${response.status}`)
    }
    
    const data = await response.text()
    const jcalData = ICAL.parse(data)
    const comp = new ICAL.Component(jcalData)
    const vevents = comp.getAllSubcomponents('vevent')

    // メモリ効率を考慮して、一度に処理する
    const events: CalendarEvent[] = []
    
    // 現在時刻から1年前までのイベントを除外
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const oneYearAgoTime = oneYearAgo.getTime()
    
    // イベントの最大数を制限（パフォーマンス向上のため）
    const MAX_EVENTS = 1000
    let eventCount = 0
    
    for (const vevent of vevents) {
      if (eventCount >= MAX_EVENTS) break
      
      try {
        const icalEvent = new ICAL.Event(vevent)
        const endDate = icalEvent.endDate.toJSDate()
        
        // 過去のイベントを除外して処理を軽くする
        if (endDate.getTime() < oneYearAgoTime) {
          continue
        }
        
        const summary = icalEvent.summary || ''
        const description = icalEvent.description || undefined
        const location = icalEvent.location || undefined
        
        const tags =
          summary
            .match(/\[(.*?)\]/)?.[1]
            ?.split(',')
            .map((tag: string) => tag.trim()) || []
        
        events.push({
          summary,
          description,
          start: icalEvent.startDate.toJSDate(),
          end: endDate,
          location,
          tags,
        })
        
        eventCount++
      } catch (error) {
        // 個別のイベント処理エラーを無視して続行
        console.error('イベント処理エラー:', error)
        continue
      }
    }
    
    // 日付でソート
    events.sort((a, b) => a.start.getTime() - b.start.getTime())
    
    return events
  } catch (error) {
    console.error('カレンダーデータの取得中にエラーが発生しました:', error)
    
    // エラーが発生した場合で、キャッシュがあればキャッシュを返す
    if (cachedData) {
      return cachedData.events
    }
    
    // キャッシュもない場合は空の配列を返す
    return []
  }
}

// クエリに一致するイベントをフィルタリングする関数（フォールバック用）
function filterEvents(eventsData: CalendarEvent[], searchQuery: string) {
  if (!searchQuery) return eventsData

  const lowerQuery = searchQuery.toLowerCase()
  
  return eventsData.filter((event) => {
    // イベントのタイトルが検索クエリを含むか確認
    if (event.summary.toLowerCase().includes(lowerQuery)) {
      return true
    }

    // 説明が検索クエリを含むか確認
    if (event.description?.toLowerCase().includes(lowerQuery)) {
      return true
    }
    
    // 場所が検索クエリを含むか確認
    if (event.location?.toLowerCase().includes(lowerQuery)) {
      return true
    }

    // タグが検索クエリを含むか確認
    if (
      event.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
    ) {
      return true
    }

    return false
  })
}

export async function POST(request: NextRequest) {
  try {
    const newEvent = await request.json()

    // 新しいイベントのバリデーション
    if (!newEvent.summary || !newEvent.start || !newEvent.end) {
      return NextResponse.json({ error: 'Invalid event data' }, { status: 400 })
    }

    // まず現在のイベントを取得
    const events = await getCalendarEvents()

    // 新しいイベントを追加
    const updatedEvents = [
      ...events,
      {
        ...newEvent,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
        tags: newEvent.tags || [],
      }
    ]

    // イベントを日付でソート
    updatedEvents.sort((a, b) => a.start.getTime() - b.start.getTime())

    // キャッシュを更新
    cachedData = {
      events: updatedEvents,
      timestamp: Date.now()
    }
    
    // 検索インデックスを再構築
    buildSearchIndex(updatedEvents)

    return NextResponse.json(updatedEvents)
  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json(
      { error: 'イベントの追加中にエラーが発生しました' },
      { status: 500 },
    )
  }
}
