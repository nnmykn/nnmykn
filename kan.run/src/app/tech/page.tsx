import LinkCard from '@/client/components/link-card.tsx'
import Page from '@/client/components/page.tsx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'ニノミヤカンが扱うことの出来る技術について。 | 技術 | 二宮 貫(Kan Ninomiya)',
  title: '技術 | 二宮 貫(Kan Ninomiya)',
}

interface TechCategory {
  title: string
  items: string[]
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: '概要',
    items: [
      'フロントエンド開発 / バックエンド開発 / LLMサービス開発 / AIモデル開発',
    ],
  },
  {
    title: '開発言語',
    items: ['TypeScript', 'Python'],
  },
  {
    title: 'フレームワーク・ライブラリ',
    items: [
      'NestJS',
      'Hono',
      'Express',
      'Next.js',
      'Remix',
      'Svelte',
      'React Native / Expo',
      'Vue / Nuxt',
      'LINE API SDK',
      'Stripe SDK',
      'TailwindCSS',
      'MicroCMS',
    ],
  },
  {
    title: 'API',
    items: ['OpenAPI', 'GraphQL'],
  },
  {
    title: 'データベース',
    items: ['PostgreSQL', 'MariaDB / MySQL', 'SQLite', 'DynamoDB'],
  },
  {
    title: 'クラウドプラットフォーム',
    items: [
      'Cloudflare',
      'fly.io',
      'AWS',
      'GCP',
      'Supabase',
      'Vercel',
      'Vultr',
    ],
  },
  {
    title: 'DevOps・インフラ',
    items: ['Docker', 'Orbstack', 'ArgoCD', 'Kubernetes'],
  },
  {
    title: 'IaC',
    items: ['AWS CloudFormation', 'AWS CDK', 'Terraform', 'CDK for Terraform'],
  },
  {
    title: 'バージョン管理・CI/CD',
    items: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'GitLab',
      'GitLab CI/CD',
      'Bitbucket',
      'AWS CodeBuild',
    ],
  },
  {
    title: 'タスク管理・ドキュメント',
    items: ['Notion', 'Backlog', 'Linear', 'Asana', 'Github Projects'],
  },
  {
    title: 'AI',
    items: [
      'Google Colab',
      'Ollama',
      'LangChain',
      'Playwright',
      'Cheerio',
      'Whisper',
      'TensorFlow',
      'YOLO',
      'OpenAI',
    ],
  },
]

export default function TechPage() {
  return (
    <Page>
      <div className="m-4 text-xl">
        <h2 className="font-angle text-5xl">ギジュツ。</h2>
      </div>
      <div className="space-y-4">
        {TECH_CATEGORIES.map((category, index) => (
          <div key={index} className="m-4 text-sm space-y-2">
            <h3 className="font-bold">{category.title}</h3>
            {category.items.map((item, itemIndex) => (
              <p key={itemIndex}>{item}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="m-4 text-lg">
        <h2 className="font-angle text-5xl">スキルシート。</h2>
      </div>
      <LinkCard
        title={'スキルシート'}
        description={'二宮のスキルシートです。'}
        url={'https://www.kan.run/skill-sheet.pdf'}
        urlForPreview={'https://www.kan.run/skill-sheet.pdf'}
      />
      <LinkCard
        title={'スキルシート'}
        description={'株式会社FP16のスキルシートです。'}
        url={
          'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing'
        }
        urlForPreview={
          'https://docs.google.com/spreadsheets/d/1anze5CXwffV6P9LbRGrD0reOjjyORSZm5PlPcfO5I3Y/edit?usp=sharing'
        }
      />
    </Page>
  )
}
