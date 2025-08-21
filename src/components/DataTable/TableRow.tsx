import type { Column, BaseDataTableProps, SelectableType } from "./types"
import { sizeClasses } from "./types"
import { TableCell } from "./TableCell"

interface TableRowProps<T> extends BaseDataTableProps {
  row: T
  index: number
  columns: Column<T>[]
  selectable: SelectableType
  isSelected: boolean
  isStriped: boolean
  rowKey: string | number
  onToggleRow: (key: string | number, record: T) => void
  onRowClick?: (record: T, index: number) => void
}

export const TableRow = <T extends Record<string, any>>({
  row,
  index,
  columns,
  selectable,
  isSelected,
  isStriped,
  rowKey,
  onToggleRow,
  onRowClick,
  size,
  isDarkMode,
}: TableRowProps<T>) => {
  const sizeConfig = sizeClasses[size]

  return (
    <tr 
      className={`
        ${isStriped ? (isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50/60') : ""}
        ${onRowClick ? `cursor-pointer ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100/60'}` : (isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100/60')}
        ${isSelected ? (isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50/80') : ""}
        transition-colors
      `}
      onClick={() => onRowClick?.(row, index)}
    >
      {selectable && (
        <td className={sizeConfig.cell}>
          <input
            type={selectable === "single" ? "radio" : "checkbox"}
            name={selectable === "single" ? "table-select" : undefined}
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              onToggleRow(rowKey, row)
            }}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            aria-label={`Select row ${index + 1}`}
          />
        </td>
      )}
      {columns.map(col => {
        const value = row[col.dataIndex]
        return (
          <TableCell
            key={col.key}
            column={col}
            value={value}
            record={row}
            index={index}
            size={size}
            isDarkMode={isDarkMode}
            bordered={false}
          />
        )
      })}
    </tr>
  )
}
