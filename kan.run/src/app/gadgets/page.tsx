import Page from "@/client/components/page.tsx"
import type { Metadata } from "next"

export const metadata: Metadata = {
    description: "持っているガジェットのメモ | ガジェット | 二宮 貫(Kan Ninomiya)",
    title: "ガジェット | 二宮 貫(Kan Ninomiya)",
}

const gadgetsData = {
    pcs: [
        { name: "computer-1", description: "個人利用" },
        { name: "FP16 PC", description: "FP16社用" },
        { name: "mac mini", description: "NyanNyanClub社用" },
        { name: "MacBookPro(14インチ)", description: "ツクリエ機材、全般のクライアント利用、16インチに変更予定" },
        { name: "sv01", description: "テストで動かしたりするサーバー、実家にて稼働" },
        { name: "ThinkPad", description: "りほさん勉強用" },
    ],
    mobiles: ["iPhone15", "Galaxy Z Flip3", "Pixel 9 Pro XL", "iPad mini"],
    storages: ["SEAGATE 8TB HDD(×3台)", "Crucial 1TB SSD", "野良スティックSSD(×2台)"],
    cameras: [
        { name: "Canon PowerShot V10", maker: "Canon", model: "PowerShot V10", usage: "動画撮影" },
        { name: "Kodak FZ55", maker: "Kodak", model: "FZ55", usage: "写真撮影" },
        { name: "PaperShoot", maker: "PaperShoot", model: "20MP", usage: "思い出エモ撮影" },
        { name: "SONY α7Ⅳ（ツクリエ社用カメラ）", maker: "SONY", model: "α7Ⅳ", usage: "本格的な写真撮影" },
    ],
}

function GadgetSection({ title, items, renderItem }) {
    return (
        <div className="border-l-4 border-gray-200 px-4 py-2 mb-8">
            <h2 className="font-bold text-2xl mb-4">{title}</h2>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>{renderItem(item)}</li>
                ))}
            </ul>
        </div>
    )
}

export default function GadgetsPage() {
    return (
        <Page>
            <div className="m-4 text-xl">
                <h1 className="font-angle text-5xl mb-8">ガジェット</h1>
                <p className="mb-8">持っているガジェットのメモ</p>
            </div>
            <div className="space-y-8">
                <GadgetSection
                    title="PCs"
                    items={gadgetsData.pcs}
                    renderItem={(item) => (
                        <>
                            <span className="font-semibold">{item.name}</span>: {item.description}
                        </>
                    )}
                />
                <GadgetSection title="Mobiles" items={gadgetsData.mobiles} renderItem={(item) => item} />
                <GadgetSection title="Storages" items={gadgetsData.storages} renderItem={(item) => item} />
                <GadgetSection
                    title="Cameras"
                    items={gadgetsData.cameras}
                    renderItem={(item) => (
                        <>
                            <span className="font-semibold">{item.name}</span> ({item.maker} {item.model}): {item.usage}
                        </>
                    )}
                />
            </div>
        </Page>
    )
}

