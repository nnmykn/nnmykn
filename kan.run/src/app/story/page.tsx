import Page from '@/client/components/page.tsx'
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
    description: 'ニノミヤカンの経歴について。 | 経歴 | 二宮 貫(Kan Ninomiya)',
    title: '経歴 | 二宮 貫(Kan Ninomiya)',
}

const careerData = [
    {
      "period": "2005年10月~2012年3月",
      "title": "赤ちゃん&幼稚園児",
      "details": ["幼稚園の頃からパソコンで遊んでいました"]
    },
    {
      "period": "2012年4月~2018年3月",
      "title": "広島市立尾長小学校",
      "details": [
        "生徒会の執行委員をしていました",
        "幼稚園から小学5年生まで府中中央剣道クラブで剣道をしていました"
      ]
    },
    {
      "period": "2018年4月~2021年3月",
      "title": "広島市立二葉中学校",
      "details": [
        "中学1年生でAcerの自分のノートパソコンを手に入れました",
        "ブロッチェーンやAIをPythonで触っていました",
        "中学2年生でハイエンドデスクトップを手に入れました",
        "小学5年生から中学2年まではテニスをしていました"
      ]
    },
    {
      "period": "2021年4月~2024年3月",
      "title": "N高等学校",
      "details": [
        "やりたいことは決まってたのでN高に入学しました",
        "1年生の頃から事業考えて、開発してを繰り返していました",
        "1年生の頃はマックでバイトしながら様々なIT分野に手を出していました",
        "N高情報サイトを入学を考えてる方、保護者向けにウェブメディアを運営していました",
        "N高情報Bookを生徒向けにGitbookベースで運営していました",
        "Minecraftのサーバー開発コミュニティの発足を行いました(現在は運営を引き継いで貰っています。)",
        "Javaエンジニアやマネジメントを行ってくれるメンバーを約100名集めました",
        "このコミュニティでは日本版のHypixelを開発しています(<Link href=\"https://github.com/Pixelsia\" target=\"_blank\">GitHub</Link>)"
      ]
    },
    {
      "period": "2022年4月~2022年9月",
      "title": "オーストラリア・ブリスベン",
      "details": [
        "YesとNoしか言えない状態、WhatとWhyの違いもわからない状態でオーストラリアに留学しました",
        "昼は6時起きで学校や友達と英語を勉強、夜は午前2時までRouteXとして事業計画を作ったりサービス開発を行っていました",
        "司法処理業務をITで代替し、一人で道路使用許可や飲食店の営業許可を取ることが出来るSmartAcceptを開発"
      ]
    },
    {
      "period": "2022年10月~2023年6月",
      "title": "株式会社stak",
      "details": [
        "SNSマーケティングやeスポーツ大会(参加者100~200人規模)、AIチャットの開発(ユーザー1万人以上)、動画編集を行っていました",
        "自動化ツールの開発なども行っていました"
      ]
    },
    {
      "period": "2022年10月",
      "title": "AIチャットボット「Lina」を開発",
      "details": [
        "アカウント(<Link href=\"https://liff.line.me/1645278921-kWRPP32q/?accountId=610jtrek\" target=\"_blank\">https://liff.line.me/1645278921-kWRPP32q/?accountId=610jtrek</Link>)",
        "LINEでChatGPTを使うことの出来るチャットボットを開発(友達数は10,000人以上)",
        "その後株式会社stakに譲渡しました"
      ]
    },
    {
      "period": "2023年6月~2024年1月",
      "title": "supersonarとして受託開発を開始",
      "details": [
        "<Link href=\"supersonar.jp\" target=\"_blank\">supersonar.jp</Link>",
        "デジタル領域の事業を行っていました"
      ]
    },
    {
      "period": "2023年7月~",
      "title": "株式会社ツクリエに入社",
      "details": ["AIを使ったサービス開発を軸に、フロントエンドとバックエンドの開発を行っています"]
    },
    {
      "period": "2024年1月~",
      "title": "株式会社FP16を設立",
      "details": [
        "2024年1月23日に設立",
        "代表取締役社長兼COO(最高執行責任者)に就任",
        "株式会社ツクリエからの出資によって設立",
        "自社サービス開発や受託開発の事業を行います",
        "AIを使ったシステムの開発等も行っています",
        "<Link href=\"https://fp16.co.jp/\" target=\"_blank\">fp16.co.jp</Link>"
      ]
    },
    {
      "period": "2024年3月",
      "title": "N高等学校を卒業",
      "details": ["N高等学校を卒業"]
    },
    {
      "period": "2024年5月",
      "title": "「林修の今知りたいでしょ！」にAIボイスクローン・AIアバター生成の技術提供",
      "details": [
        "株式会社FP16で開発を進めている最新AI技術を用いて、林修先生そっくりの声と顔を生成",
        "<Link href=\"https://prtimes.jp/main/html/rd/p/000000001.000143111.html\" target=\"_blank\">PRTimes</Link>"
      ]
    },
    {
      "period": "2024年7月",
      "title": "Z世代向け音声SNSアプリ、「PEOPLE!」のウェイティングリストを公開",
      "details": [
        "toCサービス開発やシステム開発を行う株式会社FP16(エフピージュウロク)は、このたびZ世代向け音声SNSアプリ「PEOPLE!」のウェイティングリスト登録ページの公開・テスト運用を開始しました。",
        "<Link href=\"https://prtimes.jp/main/html/rd/p/000000002.000143111.html\" target=\"_blank\">PRTimes</Link>"
      ]
    }
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
