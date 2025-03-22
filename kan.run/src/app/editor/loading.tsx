import { Skeleton } from '@/client/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="sticky top-0 bg-white border-b z-10 py-4 mb-6">
        <Skeleton className="h-8 w-48" />
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-28" />
            <div className="flex rounded-md overflow-hidden border">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 