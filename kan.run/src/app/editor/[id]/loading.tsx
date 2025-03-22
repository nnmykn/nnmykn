import { Skeleton } from '@/client/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 bg-white border-b z-10 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center mr-2">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <Skeleton className="h-8 w-48" />
        </div>
      </div>
      <div className="flex-1 p-6">
        <Skeleton className="h-10 w-full max-w-md mb-6" />
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-4 w-full max-w-4xl mb-2" />
        <Skeleton className="h-4 w-full max-w-3xl mb-2" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
    </div>
  )
}
