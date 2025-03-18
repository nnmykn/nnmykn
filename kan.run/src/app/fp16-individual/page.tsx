import Page from "@/client/components/page.tsx";

export default function Fp16IndividualPage() {
  return (
    <Page>
      <div className="m-4 text-xl">
        <h2 className="font-angle text-5xl">エフピージュウロク。</h2>
      </div>
      <div className="m-4 text-sm space-y-4">
        <p>FP16は広島で一番イケてると言っても過言ではない会社です。</p>
        <p>役員は3人で、宮前、寺澤、私です。</p>
        <p>
          全員仕事が好きで、夜中まで働いちゃいますが、入る人は気にせず帰ってください。
        </p>
        <p>最近は準委任でのフロントエンド開発支援を行っています。</p>
      </div>
      <div className="m-4">
        <h2 className="text-lg">FP16* Office。</h2>
      </div>
      <iframe
        src="https://lumalabs.ai/embed/e5bf4020-6161-4655-aadc-80c8830f3a76?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false"
        className={"w-full h-96"}
        frameBorder="0"
        title="luma embed"
      />
      <div className="m-4">
        <h2 className="text-lg">FP16* Break room。</h2>
      </div>
      <iframe
        src="https://lumalabs.ai/embed/4a907500-5c39-42cd-a011-a09a0da7d27b?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false"
        className={"w-full h-96"}
        frameBorder="0"
        title="luma embed"
      />
    </Page>
  );
}
