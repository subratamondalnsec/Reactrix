import type { Column, BaseDataTableProps } from "./types"
import { sizeClasses } from "./types"

interface TableCellProps<T> extends BaseDataTableProps {
  column: Column<T>
  value: any
  record: T
  index: number
}

export const TableCell = <T,>({ column, value, record, index, size }: TableCellProps<T>) => {
  const sizeConfig = sizeClasses[size]
  const alignClass = column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"
  
  return (
    <td 
      key={column.key} 
      className={`${sizeConfig.cell} text-gray-900 dark:text-gray-100 ${alignClass}`}
    >
      {column.render ? column.render(value, record, index) : String(value ?? "")}
    </td>
  )
}
