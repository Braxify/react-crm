import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  UITable,
} from '@/shared/components/layout/table'

import type { Virtualizer } from '@tanstack/react-virtual'

export type TableColumn<T> = {
  key: keyof T | string
  header: string
  className?: string
  render?: (value: unknown, row: T) => React.ReactNode
}

type TableProps<T> = {
  caption?: string
  columns: TableColumn<T>[]
  data: T[]
  rowKey?: (row: T, index: number) => string | number
  virtualizer?: Virtualizer<HTMLDivElement, any>
  onRowClick?: (row: T, rowIndex: number) => void
}

export function Table<T>({
  caption,
  columns,
  data,
  rowKey,
  virtualizer,
  onRowClick,
}: TableProps<T>) {
  const items = virtualizer!.getVirtualItems() || []
  const rows = virtualizer ? items : data.map((_, i) => ({ index: i }))

  return (
    <div
      style={{
        height: virtualizer!.getTotalSize(),
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${items?.[0]?.start ?? 0}px)`,
        }}
      >
        <UITable>
          {caption && <TableCaption>{caption}</TableCaption>}

          <TableHeader>
            <TableRow>
              {columns.map((col, i) => (
                <TableHead key={i} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {(rows || []).map((rowInfo) => {
              const rowIndex = 'index' in rowInfo ? rowInfo.index : rowInfo
              const row = data[rowIndex]

              return (
                <TableRow
                  key={rowKey ? rowKey(row, rowIndex) : rowIndex}
                  onClick={() => onRowClick?.(row, rowIndex)}
                  style={onRowClick ? { cursor: 'pointer' } : undefined}
                >
                  {columns.map((col, colIndex) => {
                    const value =
                      typeof col.key === 'string' && col.key in row ? (row as any)[col.key] : null

                    return (
                      <TableCell key={colIndex} className={col.className}>
                        {col.render ? col.render(value, row) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </UITable>
      </div>
    </div>
  )
}
