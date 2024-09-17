import ProjectCard from '@/client/components/project-card.tsx'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div class={'space-y-4'}>
        <Link href={'https://kan.run/'}>
          <h1 class={'font-angle text-7xl text-center my-32'}>ニノミヤ カン</h1>
        </Link>
      </div>

      <div class={'m-4 text-xl'}>
        <h2 class={'font-angle text-5xl'}>ナニ？</h2>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <p>
          幼少期からPCを触り始め、小学校低学年よりプログラミングを開始、中学生で初めてWebサービスのリリースを経験。
        </p>
        <p>
          新規サービス開発を得意としており、マーケティングから実装に至るまで幅広い分野の知見があります。
        </p>
        <p>
          AIを活用したサービス開発に早期から着手し、2022年10月にLINEで使用可能なAIチャットボット「Lina（現在の友達数は1万人以上）」を開発し、事業譲渡を行ったのち株式会社FP16を共同創業。
        </p>
        <h3 class={'text-right font-angle text-4xl'}>ニノミヤ カン</h3>
      </div>

      <div class={'m-4 text-xl'}>
        <h2 class={'font-angle text-5xl'}>シゴト</h2>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <p>【株式会社FP16 代表取締役社長兼COO】2024.01~</p>
        <p>【株式会社ツクリエ エンジニア】2023.07~</p>
        <p>【株式会社stak PR・エンジニア】2022.10~2023.06</p>
        <p>【supersonar(PICRA)】2023.06~2024.01</p>
      </div>

      <div class={'m-4 text-xl'}>
        <h2 class={'font-angle text-5xl'}>カイハツガイヨウ</h2>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
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
        <h3 class={'text-right font-angle text-4xl'}>ニノミヤ カン</h3>
      </div>

      <div class={'m-4 text-xl'}>
        <h2 class={'font-angle text-5xl'}>ギジュツ</h2>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>概要</h3>
        <p>フロントエンド開発 / バックエンド開発 / AIサービス開発</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>開発言語</h3>
        <p>TypeScript</p>
        <p>Python</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>フレームワーク・ライブラリ</h3>
        <p>NestJS</p>
        <p>Hono</p>
        <p>Express</p>
        <p>Next.js</p>
        <p>Remix</p>
        <p>React Native / Expo</p>
        <p>Vue / Nuxt</p>
        <p>LINE API SDK</p>
        <p>Stripe SDK</p>
        <p>TailwindCSS</p>
        <p>MicroCMS</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>API</h3>
        <p>OpenAPI</p>
        <p>GraphQL</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>データベース</h3>
        <p>PostgreSQL</p>
        <p>MariaDB / MySQL</p>
        <p>SQLite</p>
        <p>DynamoDB</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>クラウドプラットフォーム</h3>
        <p>AWS</p>
        <p>GCP</p>
        <p>Supabase</p>
        <p>Cloudflare</p>
        <p>Vercel</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>DevOps・インフラ</h3>
        <p>Docker</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>IaC</h3>
        <p>AWS CloudFormation</p>
        <p>AWS CDK</p>
        <p>Terraform</p>
        <p>CDK for Terraform</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>バージョン管理・CI/CD</h3>
        <p>Git</p>
        <p>GitHub</p>
        <p>GitHub Actions</p>
        <p>GitLab</p>
        <p>GitLab CI/CD</p>
        <p>Bitbucket</p>
        <p>AWS CodeBuild</p>
      </div>
      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>タスク管理・ドキュメント</h3>
        <p>Notion</p>
        <p>Backlog</p>
        <p>Linear</p>
        <p>Asana</p>
      </div>

      <div class={'m-4 text-sm space-y-2'}>
        <h3 class={'font-bold'}>AI</h3>
        <p>Google Colab</p>
        <p>Ollama</p>
        <p>LangChain</p>
        <p>Playwright</p>
        <p>Cheerio</p>
        <p>Whisper</p>
        <p>TensorFlow</p>
        <p>YOLO</p>
      </div>

      <div class={'m-4 mb-8 text-xl'}>
        <h2 class={'font-angle text-5xl'}>カンレン</h2>
      </div>
      <div class={'grid grid-cols-2 gap-x-2 gap-y-8 m-4 mb-24'}>
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
    </div>
  )
}
