import LinkCard from '@/client/components/link-card.tsx'
import Page from '@/client/components/page.tsx'
import ProjectCard from '@/client/components/project-card.tsx'

export default function Home() {
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
                  AIを活用したサービス開発に早期から着手し、2022年10月にLINEで使用可能なAIチャットボット「Lina(現在の友達数は1万人以上)」を開発し、事業譲渡を行ったのち株式会社FP16を共同創業。
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
              urlForPreview={'https://www.kan.run/tech'}
          />
          <div className={'m-4 text-xl'}>
              <h2 className={'font-angle text-5xl'}>ケイレキ。</h2>
          </div>
          <LinkCard
              title={'経歴詳細'}
              description={'ニノミヤカンの経歴について。'}
              url={'/story'}
              urlForPreview={'https://www.kan.run/story'}
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
                  tags={['B2B事業', 'IT']}
              />
              <ProjectCard
                  title={'AIボイスクローン'}
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
                  title={'スキルシート'}
                  url={
                      'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing'
                  }
                  urlForPreview={
                      'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing'
                  }
                  badgeText={'FP16のスキルシート！'}
                  tags={['IT']}
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
              <ProjectCard
                  title={'X(Twitter)'}
                  url={'https://x.com/Ninomiyarun'}
                  urlForPreview={'https://x.com/Ninomiyarun'}
                  badgeText={'SNS'}
              />
              <ProjectCard
                  title={'Instagram'}
                  url={'https://instagram.com/ninomiya.kan/'}
                  urlForPreview={'https://instagram.com/ninomiya.kan/'}
                  badgeText={'SNS'}
              />
              <ProjectCard
                  title={'PEOPLE!'}
                  url={'https://ppl.fan/'}
                  urlForPreview={'https://ppl.fan/'}
                  badgeText={'開発中！'}
                  tags={['toC', '自社サービス']}
              />
              {/*<ProjectCard*/}
              {/*  title={'エロイスト'}*/}
              {/*  url={'https://ero.ist/'}*/}
              {/*  urlForPreview={'https://ero.ist/'}*/}
              {/*  badgeText={'運営中'}*/}
              {/*  tags={['成人向け', 'toC']}*/}
              {/*/>*/}
          </div>
      </Page>
  )
}
