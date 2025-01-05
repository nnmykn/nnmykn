const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')

const ngList = ['secret.jpg', 'private.png', 'confidential.jpeg']

const directoryPath = path.join(process.cwd(), 'public', 'memories')
const outputPath = path.join(process.cwd(), 'public', 'memories', 'info.json')

sharp.cache(false)
sharp.concurrency(1)

try {
  const files = fs.readdirSync(directoryPath)
  const imagePromises = files
    .filter(
      (file: string) =>
        /\.(jpg|jpeg|png|gif)$/i.test(file) && !ngList.includes(file),
    )
    .map(async (file: string) => {
      try {
        const filePath = path.join(directoryPath, file)
        const metadata = await sharp(filePath, {
          limitInputPixels: 0,
        }).metadata()
        const stats = fs.statSync(filePath)
        return {
          name: file,
          aspectRatio: (metadata.width || 1) / (metadata.height || 1),
          date: stats.mtime.toISOString(),
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error)
        return null
      }
    })

  Promise.all(imagePromises)
    .then((images) => {
      fs.writeFileSync(outputPath, JSON.stringify(images))
    })
    .catch((_error) => {
      console.error(_error)
    })
} catch (_error) {
  console.error(_error)
}
