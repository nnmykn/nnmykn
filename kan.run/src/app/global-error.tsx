'use client'

import { Button } from '@/client/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/client/components/ui/dialog.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table.tsx'
import { format } from 'date-fns'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function GlobalError({
  error,
}: { error: Error & { digest?: string } }) {
  const [open, setOpen] = useState(true)

  const errorDetails = useMemo(() => {
    return [
      {
        label: '発生時刻',
        value: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      },
      {
        label: '対象URL',
        value: location.href,
      },
      {
        label: 'エラー内容',
        value: String(error),
      },
    ]
  }, [error])

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle class={'text-sm font-semibold text-neutral-700'}>
            <p class={'mt-1'}>予期せぬエラーが発生しました。</p>
          </DialogTitle>
        </DialogHeader>
        <Table class={'text-xs'}>
          <TableHeader>
            <TableRow>
              <TableHead class={'w-[100px]'}>項目</TableHead>
              <TableHead>詳細</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errorDetails.map((item) => (
              <TableRow key={item.label}>
                <TableCell class={'font-medium'}>{item.label}</TableCell>
                <TableCell class={'line-clamp-3 break-all'}>
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <Link class={'flex-1'} href={'/'}>
            <Button class={'w-full'} size={'sm'} variant={'outline'}>
              トップに戻る
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
