import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/lib/api';

export async function GET() {
  try {
    const data = await serverApi.getNotes();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'ノート一覧の取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await serverApi.createNote(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'ノートの作成中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 