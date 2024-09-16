import { Badge } from '@/client/components/ui/badge.tsx'
import Link from 'next/link'

type Props = {
  title: string
  url: string
  urlForPreview: string
  badgeText?: string
  tags?: string[]
}

export default function ProjectCard({
  title,
  url,
  urlForPreview,
  badgeText,
  tags,
}: Props) {
  return (
    <div class={'relative'}>
      {badgeText && (
        <Badge
          variant="secondary"
          class="absolute -top-2 -right-2 z-10 bg-[#3139FB] hover:bg-[#3139FB] text-xs text-white transform rotate-12"
        >
          {badgeText}
        </Badge>
      )}
      <Link href={url} target={'_blank'}>
        <div
          class={
            'relative rounded-2xl border-2 border-black overflow-hidden h-72 flex flex-col justify-end'
          }
          style={{
            backgroundImage: `url(https://render.ero.ist/?url=${urlForPreview})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <div class="absolute inset-0 bg-gray-900 bg-opacity-50" />
          <div class="relative p-3 z-10">
            <h2 class={'font-black text-base text-white mb-2'}>{title}</h2>
            {tags && tags.length > 0 && (
              <div class="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={`${tag}`} variant="secondary" class="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
