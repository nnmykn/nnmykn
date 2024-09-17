import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Page({ children }: Props) {
  return (
    <div>
      <div className={'space-y-4'}>
        <Link href={'/'}>
          <h1 className={'font-angle text-7xl text-center my-32'}>
            ニノミヤ カン。
          </h1>
        </Link>
      </div>
      <div>{children}</div>
      <div className={'space-y-4'}>
        <Link href={'/'}>
          <h3 className={'font-angle text-7xl text-center my-24'}>
            ニノミヤ カン。
          </h3>
        </Link>
      </div>
    </div>
  )
}
