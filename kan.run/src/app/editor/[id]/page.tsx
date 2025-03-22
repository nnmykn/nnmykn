import { Suspense } from 'react'
import { EditorDetailClient } from './editor-detail-client.tsx'
import Loading from './loading'

export const runtime = 'edge'

export default async function EditorDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  return (
    <Suspense fallback={<Loading />}>
      <EditorDetailClient id={id} />
    </Suspense>
  )
}
