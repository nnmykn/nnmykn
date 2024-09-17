import Link from 'next/link'

type Props = {
  title: string
  description: string
  url: string
  urlForPreview: string
}

export default function LinkCard({
                                   title,
                                   description,
                                   url,
                                   urlForPreview,
                                 }: Props) {
  return (
      <Link href={url} className="block">
        <div className="border border-gray-300 shadow m-4 rounded-2xl overflow-hidden">
          <div className="flex flex-col">
            <div className="w-full sm:w-32 h-32">
              <img
                  src={`https://render.ero.ist/?url=${urlForPreview}`}
                  className="w-full h-full object-cover object-top"
                  alt={`${title} | ${description}`}
              />
            </div>
            <div className="p-3 flex-1">
              <h3 className="font-bold text-base mb-2 line-clamp-1">{title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </div>
          </div>
        </div>
      </Link>
  )
}