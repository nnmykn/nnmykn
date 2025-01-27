import Page from '@/client/components/page.tsx'
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
    description: 'ニノミヤカンの経歴について。 | 経歴 | 二宮 貫(Kan Ninomiya)',
    title: '経歴 | 二宮 貫(Kan Ninomiya)',
}

const careerData = [
    {
      period: "2005年10月~2012年3月",
      title: "赤ちゃん&幼稚園児",
      details: ["幼稚園の頃からパソコンで遊んでいました"],
    },
    {
      period: "2012年4月~2018年3月",
      title: "広島市立尾長小学校",
      details: ["生徒会の執行委員をしていました", "幼稚園から小学5年生まで府中中央剣道クラブで剣道をしていました"],
    },
    {
      period: "2018年4月~2021年3月",
      title: "広島市立二葉中学校",
      details: [
        "中学1年生でAcerの自分のノートパソコンを手に入れました",
        "ブロッチェーンやAIをPythonで触っていました",
        "中学2年生でハイエンドデスクトップを手に入れました",
        "小学5年生から中学2年まではテニスをしていました",
      ],
    },
    {
      period: "2021年4月~2024年3月",
      title: "N高等学校",
      details: [
        "やりたいことは決まってたのでN高に入学しました",
        "1年生の頃から事業考えて、開発してを繰り返していました",
        "1年生の頃はマックでバイトしながら様々なIT分野に手を出していました",
        "N高情報サイトを入学を考えてる方、保護者向けにウェブメディアを運営していました",
        "N高情報Bookを生徒向けにGitbookベースで運営していました",
        "Minecraftのサーバー開発コミュニティの発足を行いました(現在は運営を引き継いで貰っています。)",
        "Javaエンジニアやマネジメントを行ってくれるメンバーを約100名集めました",
        'このコミュニティでは日本版のHypixelを開発しています(<Link href="https://github.com/Pixelsia" target="_blank">GitHub</Link>)',
      ],
    },
  ]

interface CareerItemProps {
    period: string
    title: string
    details: string[]
  }
  
  export function CareerItem({ period, title, details }: CareerItemProps) {
    return (
      <div className="border-l-4 border-gray-200 pl-4 py-2">
        <h3 className="font-bold text-lg mb-2">
          {period}: {title}
        </h3>
        <ul className="space-y-2 text-sm">
          {details.map((detail, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: detail }} />
          ))}
        </ul>
      </div>
    )
  }
  

export default function StoryPage() {
  return (
      <Page>
          <div className={'m-4 text-xl'}>
              <h2 className={'font-angle text-5xl'}>ケイレキ。</h2>
          </div>
          <div className="space-y-8">
          {careerData.map((item, index) => (
            <CareerItem key={index} {...item} />
          ))}
        </div>
      </Page>
  )
}
