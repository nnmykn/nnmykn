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
        <ProjectCard
          title={'エロイスト'}
          url={'https://ero.ist/'}
          urlForPreview={'https://ero.ist/'}
          badgeText={'運営中'}
          tags={['成人向け', 'toC']}
        />
      </div>
    </div>
  )
}
