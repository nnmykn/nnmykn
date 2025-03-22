import { Suspense } from 'react';
import { EditorDetailClient } from './editor-detail-client';
import Loading from './loading';

export const runtime = 'edge'

export default async function EditorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <EditorDetailClient id={id} />
    </Suspense>
  );
}
