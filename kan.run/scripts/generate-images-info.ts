const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')

const directoryPath = path.join(
  process.cwd(),
  'public',
  'memories',
  'india-2025',
)
const outputPath = path.join(process.cwd(), 'public', 'memories', 'info.json')

try {
  const files = fs.readdirSync(directoryPath)
  const imagePromises = files
    .filter((file: string) => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(async (file: string) => {
      const filePath = path.join(directoryPath, file)
      const metadata = await sharp(filePath).metadata()
      return {
        name: file,
        aspectRatio: (metadata.width || 1) / (metadata.height || 1),
      }
    })

  Promise.all(imagePromises)
    .then((images) => {
      fs.writeFileSync(outputPath, JSON.stringify(images))
    })
    .catch((_error) => {})
} catch (_error) {}
