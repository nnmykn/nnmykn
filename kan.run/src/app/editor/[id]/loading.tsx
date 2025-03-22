import { ArrowLeft } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 bg-white border-b z-10 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center mr-2">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <h1 className="text-xl font-bold">読み込み中...</h1>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-500">ノートを読み込んでいます...</p>
      </div>
    </div>
  );
} 