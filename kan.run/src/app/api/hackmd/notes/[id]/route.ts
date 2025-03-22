import { serverApi } from '@/lib/api'
import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const data = await serverApi.getNote(id)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching note:', error)
    return NextResponse.json(
      { error: 'ノートの取得中にエラーが発生しました' },
      { status: 500 },
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = await serverApi.updateNote(id, body)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json(
      { error: 'ノートの更新中にエラーが発生しました' },
      { status: 500 },
    )
  }
}
