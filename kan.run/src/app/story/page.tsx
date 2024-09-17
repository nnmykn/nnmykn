import Page from '@/client/components/page.tsx'
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
    description: 'ニノミヤカンの経歴について。 | 経歴 | 二宮 貫(Kan Ninomiya)',
    title: '経歴 | 二宮 貫(Kan Ninomiya)',
}

export default function StoryPage() {
  return (
      <Page>
          <div className={'m-4 text-xl'}>
              <h2 className={'font-angle text-5xl'}>ケイレキ。</h2>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2005年10月~2012年3月:赤ちゃん&幼稚園児</h3>
              <p>幼稚園の頃からパソコンで遊んでいました</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2012年4月~2018年3月:広島市立尾長小学校</h3>
              <p>生徒会の執行委員をしていました</p>
              <p>幼稚園から小学5年生まで府中中央剣道クラブで剣道をしていました</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2018年4月~2021年3月:広島市立二葉中学校</h3>
              <p>中学1年生でAcerの自分のノートパソコンを手に入れました</p>
              <p>ブロッチェーンやAIをPythonで触っていました</p>
              <p>中学2年生でハイエンドデスクトップを手に入れました</p>
              <p>小学5年生から中学2年まではテニスをしていました</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2021年4月~2024年3月:N高等学校</h3>
              <p>やりたいことは決まってたのでN高に入学しました</p>
              <p>1年生の頃から事業考えて、開発してを繰り返していました</p>
              <p>1年生の頃はマックでバイトしながら様々なIT分野に手を出していました</p>
              <p>N高情報サイトを入学を考えてる方、保護者向けにウェブメディアを運営していました</p>
              <p>N高情報Bookを生徒向けにGitbookベースで運営していました</p>
              <p>Minecraftのサーバー開発コミュニティの発足を行いました(現在は運営を引き継いで貰っています。)</p>
              <p>Javaエンジニアやマネジメントを行ってくれるメンバーを約100名集めました</p>
              <p>このコミュニティでは日本版のHypixelを開発しています(<Link href={'https://github.com/Pixelsia'}
                                                                           target={"_blank"}>GitHub</Link>)</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2022年4月~2022年9月:オーストラリア・ブリスベン</h3>
              <p>YesとNoしか言えない状態、WhatとWhyの違いもわからない状態でオーストラリアに留学しました</p>
              <p>昼は6時起きで学校や友達と英語を勉強、夜は午前2時までRouteXとして事業計画を作ったりサービス開発を行っていました</p>
              <p>司法処理業務をITで代替し、一人で道路使用許可や飲食店の営業許可を取ることが出来るSmartAcceptを開発</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2022年10月~2023年6月:株式会社stak</h3>
              <p>SNSマーケティングやeスポーツ大会(参加者100~200人規模)、AIチャットの開発(ユーザー1万人以上)、動画編集を行っていました</p>
              <p>自動化ツールの開発なども行っていました</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2022年10月:AIチャットボット「Lina」を開発</h3>
              <p>アカウント(<Link href={'https://liff.line.me/1645278921-kWRPP32q/?accountId=610jtrek'}
                                  target={"_blank"}>https://liff.line.me/1645278921-kWRPP32q/?accountId=610jtrek</Link>)
              </p>
              <p>LINEでChatGPTを使うことの出来るチャットボットを開発(友達数は10,000人以上)</p>
              <p>その後株式会社stakに譲渡しました</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2023年6月~2024年1月:supersonarとして受託開発を開始</h3>
              <p><Link href={'supersonar.jp'}
                       target={"_blank"}>supersonar.jp</Link>
              </p>
              <p>デジタル領域の事業を行っていました</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2023年7月~:株式会社ツクリエに入社</h3>
              <p>AIを使ったサービス開発を軸に、フロントエンドとバックエンドの開発を行っています</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2024年1月~:株式会社FP16を設立</h3>
              <p>代表取締役社長兼COO(最高執行責任者)に就任</p>
              <p>株式会社ツクリエからの出資によって設立</p>
              <p>自社サービス開発や受託開発の事業を行います</p>
              <p>AIを使ったシステムの開発等も行っています</p>
          </div>
          <div className={'m-4 text-sm space-y-2'}>
              <h3 className={'font-bold'}>2024年3月:N高等学校を卒業</h3>
              <p>N高等学校を卒業</p>
          </div>
      </Page>
  )
}
