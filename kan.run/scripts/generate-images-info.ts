const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')

const directoryPath = path.join(
    process.cwd(),
    'public',
    'memories',
)
const outputPath = path.join(process.cwd(), 'public', 'memories', 'info.json')

try {
    const files = fs.readdirSync(directoryPath)
    const imagePromises = files
        .filter((file: string) => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map(async (file: string) => {
            const filePath = path.join(directoryPath, file)
            const metadata = await sharp(filePath).metadata()
            const stats = fs.statSync(filePath)
            return {
                name: file,
                aspectRatio: (metadata.width || 1) / (metadata.height || 1),
                date: stats.mtime.toISOString() // Add this line to get the last modified date
            }
        })

    Promise.all(imagePromises)
        .then((images) => {
            fs.writeFileSync(outputPath, JSON.stringify(images))
        })
        .catch((_error) => {})
} catch (_error) {}
