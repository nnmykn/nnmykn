import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export function DateTimeFormat(date: Date) {
  const localizedDate = toZonedTime(date, 'Asia/Tokyo')
  return format(localizedDate, 'yyyy.MM.dd HH:mm')
}

export function DateTimeFormatShort(date: Date) {
  try {
    const localizedDate = toZonedTime(date, 'Asia/Tokyo')
    return format(localizedDate, 'yyyy.MM.dd')
  } catch (_e) {
    return '-'
  }
}
