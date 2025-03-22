import { Suspense } from 'react';
import { EditorDetailClient } from './editor-detail-client';
import Loading from './loading';

export const runtime = 'edge'

// ページコンポーネントのprops型定義
interface EditorDetailPageProps {
  params: { id: string };
}

export default async function EditorDetailPage(props: EditorDetailPageProps) {
  const { id } = props.params;

  return (
    <Suspense fallback={<Loading />}>
      <EditorDetailClient id={id} />
    </Suspense>
  );
}
