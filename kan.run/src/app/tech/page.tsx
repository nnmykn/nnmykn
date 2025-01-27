import Page from '@/client/components/page.tsx'
import type {Metadata} from "next";

export const metadata: Metadata = {
    description: 'ニノミヤカンが扱うことの出来る技術について。 | 技術 | 二宮 貫(Kan Ninomiya)',
    title: '技術 | 二宮 貫(Kan Ninomiya)',
}

export default function TechPage() {
  return (
    <Page>
      <div className={'m-4 text-xl'}>
        <h2 className={'font-angle text-5xl'}>ギジュツ。</h2>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>概要</h3>
        <p>フロントエンド開発 / バックエンド開発 / LLMサービス開発 / AIモデル開発</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>開発言語</h3>
        <p>TypeScript</p>
        <p>Python</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>フレームワーク・ライブラリ</h3>
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
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>API</h3>
        <p>OpenAPI</p>
        <p>GraphQL</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>データベース</h3>
        <p>PostgreSQL</p>
        <p>MariaDB / MySQL</p>
        <p>SQLite</p>
        <p>DynamoDB</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>クラウドプラットフォーム</h3>
        <p>Cloudflare</p>
        <p>fly.io</p>
        <p>AWS</p>
        <p>GCP</p>
        <p>Supabase</p>
        <p>Vercel</p>
        <p>Vultr</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>DevOps・インフラ</h3>
        <p>Docker</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>IaC</h3>
        <p>AWS CloudFormation</p>
        <p>AWS CDK</p>
        <p>Terraform</p>
        <p>CDK for Terraform</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>バージョン管理・CI/CD</h3>
        <p>Git</p>
        <p>GitHub</p>
        <p>GitHub Actions</p>
        <p>GitLab</p>
        <p>GitLab CI/CD</p>
        <p>Bitbucket</p>
        <p>AWS CodeBuild</p>
      </div>
      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>タスク管理・ドキュメント</h3>
        <p>Notion</p>
        <p>Backlog</p>
        <p>Linear</p>
        <p>Asana</p>
        <p>Github Projects</p>
      </div>

      <div className={'m-4 text-sm space-y-2'}>
        <h3 className={'font-bold'}>AI</h3>
        <p>Google Colab</p>
        <p>Ollama</p>
        <p>LangChain</p>
        <p>Playwright</p>
        <p>Cheerio</p>
        <p>Whisper</p>
        <p>TensorFlow</p>
        <p>YOLO</p>
        <p>OpenAI</p>
      </div>
    </Page>
  )
}
