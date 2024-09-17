import { toast } from 'sonner'

async function copyToClipboard(body: string) {
  try {
    await navigator.clipboard.writeText(body)
  } catch (_err) {}
}

export default async function handleUrlClick(
  body: string,
  title: string,
  description: string,
) {
  try {
    await copyToClipboard(body)
    toast.success(title, { description: description })
  } catch (_err) {}
}
