'use client'

import LinkCard from '@/client/components/link-card.tsx'
import Page from '@/client/components/page.tsx'
import ProjectCard from '@/client/components/project-card.tsx'
import { SpotifyDrawer } from '@/client/components/spotify-drawer.tsx'
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

interface ProjectCardData {
  title: string
  url: string
  urlForPreview: string
  badgeText: string
  tags?: string[]
}

const PROJECT_CARDS: ProjectCardData[] = [
  {
    title: '株式会社FP16',
    url: 'https://fp16.co.jp/',
    urlForPreview: 'https://fp16.co.jp/',
    badgeText: '代表取締役社長',
    tags: ['B2B事業', 'B2C事業', 'IT'],
  },
  {
    title: '株式会社FP16 求人ページ',
    url: 'https://fp16.co.jp/recruit',
    urlForPreview: 'https://fp16.co.jp/recruit',
    badgeText: 'ちょい経験エンジニア求む！',
    tags: ['B2B事業', 'B2C事業', 'IT'],
  },
  {
    title: '株式会社FP16(Wantedly)',
    url: 'https://www.wantedly.com/companies/fp16',
    urlForPreview: 'https://www.wantedly.com/companies/fp16',
    badgeText: 'Wantedlyはこちら！',
    tags: ['B2B事業', 'B2C事業', 'IT'],
  },
  {
    title: 'Reactひろしま',
    url: 'https://react-hiroshima.connpass.com/',
    urlForPreview: 'https://react-hiroshima.connpass.com/',
    badgeText: '勉強会やってます！',
    tags: ['株式会社FP16', 'IT'],
  },
  {
    title: 'ペイペコ',
    url: 'https://app.paypeko.com/',
    urlForPreview: 'https://app.paypeko.com/',
    badgeText: '自社サービス',
    tags: ['FP16', 'toC', '性', '投げ銭'],
  },
  {
    title: '永代供養きよらか',
    url: 'https://kiyo-raka.jp/',
    urlForPreview: 'https://kiyo-raka.jp/',
    badgeText: '自社サービス',
    tags: ['FP16', '永代供養', '終活', 'エンディング産業'],
  },
  {
    title: 'PEOPLE!',
    url: 'https://ppl.fan/',
    urlForPreview: 'https://ppl.fan/',
    badgeText: '自社サービス',
    tags: ['FP16', 'toC', 'Z世代'],
  },
  // {
  //   title: 'エロイスト',
  //   url: 'https://ero.ist/',
  //   urlForPreview: 'https://ero.ist/',
  //   badgeText: '運営中',
  //   tags: ['成人向け', 'toC'],
  // },
  // {
  //   title: 'NyanNyanClub株式会社',
  //   url: 'https://nyan-nyan-club.com/',
  //   urlForPreview: 'https://nyan-nyan-club.com/',
  //   badgeText: '代表取締役社長',
  //   tags: ['BtoC事業', '国外', 'IT'],
  // },
  // {
  //   title: 'Chinon from Japan',
  //   url: 'https://x.com/chinonsan',
  //   urlForPreview: 'https://x.com/chinonsan',
  //   badgeText: 'NyanNyanClub',
  //   tags: ['toC', '国外'],
  // },
  {
    title: 'FP16 スキルシート',
    url: 'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing',
    urlForPreview:
      'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing',
    badgeText: 'スキルシートです！',
    tags: ['IT'],
  },
  {
    title: '林修の今知りたいでしょ！ 技術提供',
    url: 'https://prtimes.jp/main/html/rd/p/000000001.000143111.html',
    urlForPreview: 'https://prtimes.jp/main/html/rd/p/000000001.000143111.html',
    badgeText: 'TV出演',
    tags: ['IT', 'AI'],
  },
  {
    title: 'N高 個人情報流出',
    url: 'https://www.youtube.com/watch?v=FW0apofJoRc',
    urlForPreview: 'https://www.youtube.com/watch?v=FW0apofJoRc',
    badgeText: 'TV出演',
    tags: ['IT', '悲しい'],
  },
  {
    title: '株式会社FP16 技術支援空きスケジュール表(PCのみ)',
    url: 'https://fp16.co.jp/schedule',
    urlForPreview: 'https://fp16.co.jp/schedule',
    badgeText: 'フロントエンド開発してます！',
    tags: ['IT'],
  },
  {
    title: 'X(Twitter)',
    url: 'https://x.com/Ninomiyarun',
    urlForPreview: 'https://x.com/Ninomiyarun',
    badgeText: 'SNS',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/nnmykn',
    urlForPreview: 'https://github.com/nnmykn',
    badgeText: 'Develop',
    tags: ['IT'],
  },
  {
    title: 'Zenn',
    url: 'https://zenn.dev/nixo',
    urlForPreview: 'https://zenn.dev/nixo',
    badgeText: '技術記事',
    tags: ['IT'],
  },
]

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
        <h2 className={'font-angle text-5xl'}>ニュース。</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <p>
          2025年3月にフルスペックのM4 MacBook Pro 16インチが来ました！最強です！
        </p>
        <p>
          2025年2月に「ペイペコ」をリリースしました！(https://app.pay-peko.com/)
        </p>
        <p>
          2025年1月に「永代供養きよらか」をリリースしました！(https://kiyo-raka.jp/)
        </p>
        <p>
          2024年8月に株式会社FP16でフロントエンド開発支援事業を開始しました！(https://fp16.co.jp/schedule)
        </p>
        <p>
          2024年7月にN高から個人情報が流出しました！(https://www.youtube.com/watch?v=FW0apofJoRc)
        </p>
        <p>
          2024年7月にZ世代向け音声SNSアプリ「PEOPLE!」のウェイティングリストを公開しました！(https://ppl.fan/)
        </p>
        <p>
          2024年5月にゴールデンタイム番組である「林修の今知りたいでしょ！」にAI技術を提供して出ました！(https://prtimes.jp/main/html/rd/p/000000001.000143111.html)
        </p>
        <p>2024年4月にロードスターを買いました！(7月納車)</p>
        <p>2024年4月に computer-1 というケースでイケてる PC を作りました！</p>
        <p>2024年4月に遂に自分で焼かない焼き肉を食べました！</p>
        <p>2024年4月に遂に回らない寿司を食べました！</p>
        <p>2024年3月にN高等学校を卒業しました！</p>
      </div>

      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>モクテキ。</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <p>バブルをもう一度日本に起こす。広島をバブルの中心に。</p>
        <p>昭和のような価値観を取り戻す。</p>
        <p>この世の全部を手に入れる。</p>
        <p>イーロンマスクの資産を超える。</p>
      </div>

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
          AIを活用したサービス開発に早期から着手し、2022年10月にLINEで使用可能なAIチャットボット「Lina(現在の友達数は1万人以上)」を開発し、事業譲渡を行ったのち2024年1月23日に株式会社FP16を共同創業。
        </p>
        <p>
          現在は株式会社FP16にてフロントエンド開発支援や新規事業開発を行っています。(2025年1月23日時点)
        </p>
        <p>
          LLMがとても好きで、LLMを毎日愛でています。ローカルでLLMを飼っています。
        </p>
        <p>Cursor・ClineもLOVEです。</p>
        <SpotifyDrawer
          trigger={
            <h3 className={'text-right font-angle text-4xl'}>ニノミヤ カン</h3>
          }
        />
      </div>

      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>シゴト。</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <p>【株式会社FP16 代表取締役社長兼COO】2024.01~</p>
        {/*<p>【株式会社Everforth エンジニア】2025.03~</p>*/}
        <p>【株式会社ツクリエ エンジニア】2023.07~</p>
        <p>【株式会社stak PR・エンジニア】2022.10~2023.06</p>
        <p>【supersonar(PICRA)】2023.06~2024.01</p>
      </div>

      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>カイハツシャトシテ。</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <p>
          Webシステム、フルスクラッチ B2B
          ECサイト、AIサービスなど、多岐にわたるシステム開発プロジェクトを主導。
        </p>
        <p>
          これらの経験を通じて、BtoC,
          BtoBどちらの顧客ニーズにも合わせたソリューションを提供する能力を磨いてきました。
        </p>
        <p>
          フロントエンド開発・バックエンド開発の両方を行っており、フロントエンドではTypeScript(Next.js,
          Expo)、バックエンドではTypeScript(NestJS,
          Hono)やPython(FastAPI)、インフラにはAWSやCloudflare、自作GPUサーバー(Ubuntu)を用いて開発を行ってきました。
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
      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>ドキュメント。</h2>
      </div>
      <LinkCard
        title={'株式会社FP16に興味を持った方へ(個人向け)'}
        description={'株式会社FP16の社風などについて。'}
        url={'/fp16-individual'}
        urlForPreview={'https://www.kan.run/fp16-individual/'}
      />
      <LinkCard
        title={'株式会社FP16に興味を持った方へ(企業向け)'}
        description={'株式会社FP16の技術スタックやプロダクトについて。'}
        url={'/fp16-corporate'}
        urlForPreview={'https://fp16.co.jp/'}
      />

      <div className={'m-4 mb-8 text-xl'}>
        <h2 className={'font-angle text-5xl'}>カンレン。</h2>
      </div>
      <div className={'grid grid-cols-2 gap-x-2 gap-y-8 m-4'}>
        {PROJECT_CARDS.map((card, index) => (
          <ProjectCard
            key={index}
            title={card.title}
            url={card.url}
            urlForPreview={card.urlForPreview}
            badgeText={card.badgeText}
            tags={card.tags}
          />
        ))}
      </div>
      {/*<div className={'m-4 text-xl'}>*/}
      {/*  <h2 className={'font-angle text-5xl'}>シャシン。</h2>*/}
      {/*</div>*/}
      {/*<div ref={containerRef} className="p-4">*/}
      {/*  {error && <div>Failed to load memories</div>}*/}
      {/*  {!images && <div>Loading...</div>}*/}
      {/*  {layout.map((row, rowIndex) => (*/}
      {/*    <div*/}
      {/*      key={rowIndex}*/}
      {/*      className="flex gap-4 mb-4"*/}
      {/*      style={{*/}
      {/*        height: row.rowHeight,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {row.items.map((image, imageIndex) => (*/}
      {/*        <div*/}
      {/*          key={`${rowIndex}-${imageIndex}`}*/}
      {/*          className="relative overflow-hidden rounded-lg"*/}
      {/*          style={{*/}
      {/*            width: `${row.rowHeight * image.aspectRatio}px`,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <LazyImage*/}
      {/*            key={`${rowIndex}-${imageIndex}`}*/}
      {/*            src={`/memories/${image.name}`}*/}
      {/*            alt={`Memory - ${imageIndex + 1}`}*/}
      {/*            width={row.rowHeight * image.aspectRatio}*/}
      {/*            height={row.rowHeight}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </Page>
  )
}
