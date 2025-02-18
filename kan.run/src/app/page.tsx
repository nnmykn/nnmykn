'use client'

import LinkCard from '@/client/components/link-card.tsx'
import Page from '@/client/components/page.tsx'
import ProjectCard from '@/client/components/project-card.tsx'
import { useLazyLoad } from '@/client/hooks/use-lazy-load'
import { useEffect, useRef, useState } from 'react'
import useSwr from 'swr'

interface ImageInfo {
  name: string
  aspectRatio: number
  date: string
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data: ImageInfo[]) =>
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    )

function calculateRowLayout(
  images: ImageInfo[],
  containerWidth: number,
  targetRowHeight: number,
  spacing: number,
  minImagesPerRow = 3,
  maxImagesPerRow = 5,
): { rowHeight: number; items: ImageInfo[] }[] {
  const rows: { rowHeight: number; items: ImageInfo[] }[] = []
  let currentRow: ImageInfo[] = []
  let currentRowWidth = 0

  const processRow = (row: ImageInfo[], isLastRow = false) => {
    if (row.length === 0) {
      return
    }

    const rowAspectRatioSum = row.reduce((sum, img) => sum + img.aspectRatio, 0)
    let rowHeight = targetRowHeight

    if (!isLastRow) {
      rowHeight =
        (containerWidth - (row.length - 1) * spacing) / rowAspectRatioSum
    }

    rows.push({ rowHeight, items: [...row] })
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const imageWidth = targetRowHeight * image.aspectRatio

    if (
      currentRow.length >= maxImagesPerRow ||
      (currentRow.length >= minImagesPerRow &&
        currentRowWidth + imageWidth > containerWidth)
    ) {
      processRow(currentRow)
      currentRow = []
      currentRowWidth = 0
    }

    currentRow.push(image)
    currentRowWidth += imageWidth + spacing

    if (i === images.length - 1) {
      processRow(currentRow, true)
    }
  }

  return rows
}

function LazyImage({
  src,
  alt,
  width,
  height,
}: { src: string; alt: string; width: number; height: number }) {
  const [ref, isIntersecting] = useLazyLoad()

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-lg"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  )
}

export default function Home() {
  const { data: images, error } = useSwr<ImageInfo[]>(
    '/memories/info.json',
    fetcher,
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<
    { rowHeight: number; items: ImageInfo[] }[]
  >([])

  useEffect(() => {
    if (!(images && containerRef.current)) {
      return
    }

    const updateLayout = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0
      const targetRowHeight = 200
      const spacing = 16

      const newLayout = calculateRowLayout(
        images,
        containerWidth,
        targetRowHeight,
        spacing,
      )
      setLayout(newLayout)
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [images])

  return (
    <Page>
      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>ナニ？</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <p>
          幼少期からPCを触り始め、小学校低学年よりプログラミングを開始、中学生で初めてWebサービスのリリースを経験。
        </p>
        <p>
          新規サービス開発を得意としており、マーケティングから実装に至るまで幅広い分野の知見があります。
        </p>
        <p>
          AIを活用したサービス開発に早期から着手し、2022年10月にLINEで使用可能なAIチャットボット「Lina(現在の友達数は1万人以上)」を開発し、事業譲渡を行ったのち株式会社FP16を共同創業。(2024年1月23日時点)
        </p>
        <h3 className={'text-right font-angle text-4xl'}>ニノミヤ カン</h3>
      </div>

      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>シゴト。</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <p>【株式会社FP16 代表取締役社長兼COO】2024.01~</p>
        <p>【株式会社ツクリエ エンジニア】2023.07~</p>
        <p>【株式会社stak PR・エンジニア】2022.10~2023.06</p>
        <p>【supersonar(PICRA)】2023.06~2024.01</p>
      </div>

      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>カイハツシャトシテ。</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <p>
          ウェブシステム、フルスクラッチ B2B
          ECサイト、AIサービスなど、多岐にわたるシステム開発プロジェクトを主導。
        </p>
        <p>
          これらの経験を通じて、BtoC,
          BtoBどちらの顧客ニーズにも合わせたソリューションを提供する能力を磨いてきました。
        </p>
        <p>
          フロントエンド開発・バックエンド開発の両方を行っており、フロントエンドではTypeScript(Next.js)、バックエンドではTypeScript(NestJS,
          Hono)やPython(FastAPI)を用いて開発を行ってきました。
        </p>
        <p>
          これらの技術を用いて、モダンでパフォーマンスの優れており、メンテナンスが容易なシステムを構築してきました。
        </p>
        <p>
          新規事業開発(MVP開発)を多く行ってきており、1から開発を行うのが得意です。
        </p>
      </div>

      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>ギジュツ。</h2>
      </div>
      <LinkCard
        title={'技術詳細'}
        description={'扱うことの出来る技術について。'}
        url={'/tech'}
        urlForPreview={'https://www.kan.run/tech/'}
      />
      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>ケイレキ。</h2>
      </div>
      <LinkCard
        title={'経歴詳細'}
        description={'ニノミヤカンの経歴について。'}
        url={'/story'}
        urlForPreview={'https://www.kan.run/story/'}
      />

      <div className={'m-4 mb-8 text-xl'}>
        <h2 className={'font-angle text-5xl'}>カンレン。</h2>
      </div>
      <div className={'grid grid-cols-2 gap-x-2 gap-y-8 m-4'}>
        <ProjectCard
          title={'株式会社FP16'}
          url={'https://fp16.co.jp/'}
          urlForPreview={'https://fp16.co.jp/'}
          badgeText={'代表取締役社長'}
          tags={['B2B事業', 'B2C事業', 'IT']}
        />
        <ProjectCard
          title={'株式会社FP16(Wantedly)'}
          url={'https://www.wantedly.com/companies/fp16'}
          urlForPreview={'https://www.wantedly.com/companies/fp16'}
          badgeText={'求人はこちら！'}
          tags={['B2B事業', 'B2C事業', 'IT']}
        />
        <ProjectCard
          title={'株式会社FP16(indeed)'}
          url={'https://jp.indeed.com/viewjob?jk=b83374903faa76df&from=shareddesktop'}
          urlForPreview={'https://jp.indeed.com/viewjob?jk=b83374903faa76df&from=shareddesktop'}
          badgeText={'求人はこちら！'}
          tags={['B2B事業', 'B2C事業', 'IT']}
        />
        <ProjectCard
          title={'ペイペコ'}
          url={'https://paypeko.com/'}
          urlForPreview={'https://paypeko.com/'}
          badgeText={'自社サービス'}
          tags={['FP16', 'toC', '性', '投げ銭']}
        />
        <ProjectCard
          title={'永代供養きよらか'}
          url={'https://kiyo-raka.jp/'}
          urlForPreview={'https://kiyo-raka.jp/'}
          badgeText={'自社サービス'}
          tags={['FP16', '永代供養', '終活', 'エンディング産業']}
        />
        <ProjectCard
          title={'PEOPLE!'}
          url={'https://ppl.fan/'}
          urlForPreview={'https://ppl.fan/'}
          badgeText={'自社サービス'}
          tags={['FP16', 'toC', 'Z世代']}
        />
        {/*<ProjectCard*/}
        {/*  title={'エロイスト'}*/}
        {/*  url={'https://ero.ist/'}*/}
        {/*  urlForPreview={'https://ero.ist/'}*/}
        {/*  badgeText={'運営中'}*/}
        {/*  tags={['成人向け', 'toC']}*/}
        {/*/>*/}
        {/* <ProjectCard
          title={'NyanNyanClub株式会社'}
          url={'https://nyan-nyan-club.com/'}
          urlForPreview={'https://nyan-nyan-club.com/'}
          badgeText={'代表取締役社長'}
          tags={['BtoC事業', '国外', 'IT']}
        />
        <ProjectCard
          title={'Chinon from Japan'}
          url={'https://x.com/chinonsan'}
          urlForPreview={'https://x.com/chinonsan'}
          badgeText={'NyanNyanClub'}
          tags={['toC', '国外']}
        /> */}
        <ProjectCard
          title={'FP16 スキルシート'}
          url={
            'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing'
          }
          urlForPreview={
            'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing'
          }
          badgeText={'スキルシートです！'}
          tags={['IT']}
        />
        <ProjectCard
          title={'林修の今知りたいでしょ！ 技術提供'}
          url={'https://prtimes.jp/main/html/rd/p/000000001.000143111.html'}
          urlForPreview={
            'https://prtimes.jp/main/html/rd/p/000000001.000143111.html'
          }
          badgeText={'TV出演'}
          tags={['IT', 'AI']}
        />
        <ProjectCard
          title={'N高 個人情報流出'}
          url={'https://www.youtube.com/watch?v=FW0apofJoRc'}
          urlForPreview={'https://www.youtube.com/watch?v=FW0apofJoRc'}
          badgeText={'TV出演'}
          tags={['IT', '悲しい']}
        />
        <ProjectCard
          title={'株式会社FP16 技術支援空きスケジュール表(PCのみ)'}
          url={'https://fp16.co.jp/schedule'}
          urlForPreview={'https://fp16.co.jp/schedule'}
          badgeText={'フロントエンド開発してます！'}
          tags={['IT']}
        />
        <ProjectCard
          title={'X(Twitter)'}
          url={'https://x.com/Ninomiyarun'}
          urlForPreview={'https://x.com/Ninomiyarun'}
          badgeText={'SNS'}
        />
        <ProjectCard
          title={'GitHub'}
          url={'https://github.com/nnmykn'}
          urlForPreview={'https://github.com/nnmykn'}
          badgeText={'Develop'}
          tags={['IT']}
        />
        <ProjectCard
          title={'Zenn'}
          url={'https://zenn.dev/nixo'}
          urlForPreview={'https://zenn.dev/nixo'}
          badgeText={'技術記事'}
          tags={['IT']}
        />
      </div>
      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>シャシン。</h2>
      </div>
      <div ref={containerRef} className="p-4">
        {error && <div>Failed to load memories</div>}
        {!images && <div>Loading...</div>}
        {layout.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-4 mb-4"
            style={{
              height: row.rowHeight,
            }}
          >
            {row.items.map((image, imageIndex) => (
              <div
                key={`${rowIndex}-${imageIndex}`}
                className="relative overflow-hidden rounded-lg"
                style={{
                  width: `${row.rowHeight * image.aspectRatio}px`,
                }}
              >
                <LazyImage
                  key={`${rowIndex}-${imageIndex}`}
                  src={`/memories/${image.name}`}
                  alt={`Memory - ${imageIndex + 1}`}
                  width={row.rowHeight * image.aspectRatio}
                  height={row.rowHeight}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Page>
  )
}
