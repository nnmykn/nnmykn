import ICAL from 'ical.js'
import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 3600 // 1時間ごとにキャッシュを再検証

// Google Calendar の ICS URL
const CALENDAR_URL =
    'https://calendar.google.com/calendar/ical/ninomiyakan20051011%40gmail.com/public/basic.ics'

interface CalendarEvent {
  summary: string
  start: Date
  end: Date
  tags: string[]
}

// メモリキャッシュ
let cachedEvents: CalendarEvent[] | null = null
let lastFetched: number = 0
const CACHE_TTL = 30 * 60 * 1000 // 30分のキャッシュ有効期間

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

    // キャッシュされたデータを取得または更新
    const events = await getCalendarEvents()

    // クエリに一致するイベントをフィルタリング
    const matchingEvents = filterEvents(events, query.toLowerCase())

    // レスポンスヘッダーを設定
    const headers = new Headers()
    headers.set('Cache-Control', 'public, max-age=600') // 10分間のクライアントキャッシュ

    return NextResponse.json({ events: matchingEvents }, { headers })
  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json(
        { error: 'カレンダーデータの取得中にエラーが発生しました' },
        { status: 500 },
    )
  }
}

// キャッシュを考慮してカレンダーイベントを取得
async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const now = Date.now()
  
  // キャッシュが有効な場合はキャッシュからデータを返す
  if (cachedEvents && now - lastFetched < CACHE_TTL) {
    return cachedEvents
  }
  
  try {
    // データを取得して更新
    const events = await fetchCalendarData()
    cachedEvents = events
    lastFetched = now
    return events
  } catch (error) {
    // エラー発生時、古いキャッシュがあればそれを使用
    if (cachedEvents) {
      console.warn('Failed to update calendar data, using cached data')
      return cachedEvents
    }
    throw error
  }
}

// iCalデータを取得する関数
async function fetchCalendarData(): Promise<CalendarEvent[]> {
  // タイムアウト付きでフェッチ
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒タイムアウト
  
  try {
    const response = await fetch(CALENDAR_URL, { 
      signal: controller.signal,
      headers: {
        'Accept-Encoding': 'gzip'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar data: ${response.status}`)
    }
    
    const data = await response.text()
    clearTimeout(timeoutId)
    
    // データが空の場合はエラー
    if (!data || data.trim() === '') {
      throw new Error('Empty calendar data received')
    }
    
    const jcalData = ICAL.parse(data)
    const comp = new ICAL.Component(jcalData)
    const vevents = comp.getAllSubcomponents('vevent')

    const events = vevents.map((vevent: ICAL.Component) => {
      const event = new ICAL.Event(vevent)
      const summary = event.summary
      const tags =
          summary
              .match(/\[(.*?)\]/)?.[1]
              ?.split(',')
              .map((tag: string) => tag.trim()) || []
      return {
        summary: summary,
        start: event.startDate.toJSDate(),
        end: event.endDate.toJSDate(),
        tags: tags,
      }
    })

    return events
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('Error fetching calendar data:', error)
    throw error
  }
}

// クエリに一致するイベントをフィルタリングする関数
function filterEvents(eventsData: CalendarEvent[], searchQuery: string) {
  return eventsData.filter((event) => {
    // イベントのタイトルが検索クエリを含むか確認
    if (event.summary.toLowerCase().includes(searchQuery)) {
      return true
    }

    // タグが検索クエリを含むか確認
    if (
        event.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery))
    ) {
      return true
    }

    return false
  })
}

export async function POST(request: NextRequest) {
  const newEvent = await request.json()

  // 新しいイベントのバリデーション
  if (!newEvent.summary || !newEvent.start || !newEvent.end) {
    return NextResponse.json({ error: 'Invalid event data' }, { status: 400 })
  }

  // キャッシュが無い場合は取得
  if (!cachedEvents) {
    cachedEvents = await fetchCalendarData()
    lastFetched = Date.now()
  }

  // 新しいイベントを追加
  cachedEvents.push({
    ...newEvent,
    start: new Date(newEvent.start),
    end: new Date(newEvent.end),
    tags: newEvent.tags || [],
  })

  // イベントを日付でソート
  cachedEvents.sort((a, b) => a.start.getTime() - b.start.getTime())

  return NextResponse.json(cachedEvents)
}
