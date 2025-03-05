import { NextRequest, NextResponse } from 'next/server';
import * as nodeIcal from 'node-ical';

// Google Calendar の ICS URL
const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/ninomiyakan20051011%40gmail.com/public/basic.ics';

export async function GET(request: NextRequest) {
  try {
    // URLパラメータから検索クエリを取得
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: '検索クエリが指定されていません' },
        { status: 400 }
      );
    }

    // iCalデータを取得
    const icalData = await fetchCalendarData();
    
    // クエリに一致するイベントをフィルタリング
    const matchingEvents = filterEvents(icalData, query.toLowerCase());

    return NextResponse.json({ events: matchingEvents });
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { error: 'カレンダーデータの取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

// iCalデータを取得する関数
async function fetchCalendarData() {
  try {
    const response = await fetch(CALENDAR_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.status}`);
    }
    const icsData = await response.text();
    return nodeIcal.parseICS(icsData);
  } catch (error) {
    console.error('Error fetching iCal data:', error);
    throw error;
  }
}

// 検索クエリに一致するイベントをフィルタリングする関数
function filterEvents(icalData: any, searchQuery: string) {
  const events = [];

  for (const key in icalData) {
    const event = icalData[key];
    
    // イベントタイプ以外のエントリーをスキップ
    if (event.type !== 'VEVENT') {
      continue;
    }

    // Personalを含むイベントをスキップ（大文字・小文字を区別）
    const eventSummary = event.summary || '';
    const eventDescription = event.description || '';
    
    if (
      eventSummary.includes('Personal') || 
      eventDescription.includes('Personal')
    ) {
      continue;
    }

    // イベントの各フィールドをチェック（大文字・小文字を区別せず）
    const summary = eventSummary.toLowerCase();
    const description = eventDescription.toLowerCase();
    const location = (event.location || '').toLowerCase();

    // 検索クエリがイベントのいずれかのフィールドに含まれているかチェック
    if (
      summary.includes(searchQuery) ||
      description.includes(searchQuery) ||
      location.includes(searchQuery)
    ) {
      // クライアント側に返すイベントデータを整形
      events.push({
        summary: event.summary || '無題のイベント',
        description: event.description || '',
        start: event.start,
        end: event.end,
        location: event.location || '',
      });
    }
  }

  // 開始日時でソート
  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
} 