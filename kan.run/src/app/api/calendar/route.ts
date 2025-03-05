import ICAL from 'ical.js'
import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Google Calendar の ICS URL
const CALENDAR_URL =
  'https://calendar.google.com/calendar/ical/ninomiyakan20051011%40gmail.com/public/basic.ics'

interface CalendarEvent {
  summary: string
  start: Date
  end: Date
  tags: string[]
}

let events: CalendarEvent[] = []

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

    // イベントが空の場合、Google Calendarからデータを取得
    if (events.length === 0) {
      await fetchCalendarData()
    }

    // クエリに一致するイベントをフィルタリング
    const matchingEvents = filterEvents(events, query.toLowerCase())

    return NextResponse.json({ events: matchingEvents })
  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json(
      { error: 'カレンダーデータの取得中にエラーが発生しました' },
      { status: 500 },
    )
  }
}

// iCalデータを取得する関数
async function fetchCalendarData() {
  const response = await fetch(CALENDAR_URL)
  const data = await response.text()
  const jcalData = ICAL.parse(data)
  const comp = new ICAL.Component(jcalData)
  const vevents = comp.getAllSubcomponents('vevent')

  events = vevents.map((vevent: ICAL.Component) => {
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

  // 新しいイベントを追加
  events.push({
    ...newEvent,
    start: new Date(newEvent.start),
    end: new Date(newEvent.end),
    tags: newEvent.tags || [],
  })

  // イベントを日付でソート
  events.sort((a, b) => a.start.getTime() - b.start.getTime())

  return NextResponse.json(events)
}
