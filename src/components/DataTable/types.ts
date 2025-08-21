import type { ReactNode } from "react"

export type DataTableSize = "sm" | "md" | "lg"
export type SelectableType = boolean | "single" | "multiple"

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  width?: string | number
  align?: "left" | "center" | "right"
  render?: (value: any, record: T, index: number) => ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: SelectableType
  onRowSelect?: (selectedRows: T[], selectedRow?: T) => void
  emptyText?: string
  className?: string
  rowKey?: keyof T | ((record: T) => string | number)
  onRowClick?: (record: T, index: number) => void
  size?: DataTableSize
  bordered?: boolean
  striped?: boolean
  isDarkMode?: boolean
}

export interface SortState<T> {
  column?: Column<T>
  direction: "asc" | "desc"
}

export interface BaseDataTableProps {
  size: DataTableSize
  isDarkMode: boolean
  bordered: boolean
}

export const sizeClasses = {
  sm: { table: "text-xs", cell: "p-2", header: "p-2" },
  md: { table: "text-sm", cell: "p-3", header: "p-3" },
  lg: { table: "text-base", cell: "p-4", header: "p-4" },
}
