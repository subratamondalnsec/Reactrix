import type { Column, SortState, BaseDataTableProps, SelectableType } from "./types"
import { sizeClasses } from "./types"
import { SortIcon } from "./icons"

interface TableHeaderProps<T> extends BaseDataTableProps {
  columns: Column<T>[]
  selectable: SelectableType
  sort: SortState<T>
  onSort: (col: Column<T>) => void
  allChecked: boolean
  someChecked: boolean
  onToggleAll: () => void
}

export const TableHeader = <T,>({
  columns,
  selectable,
  sort,
  onSort,
  allChecked,
  someChecked,
  onToggleAll,
  size,
  isDarkMode,
}: TableHeaderProps<T>) => {
  const sizeConfig = sizeClasses[size]

  return (
    <thead className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100/80'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200/60'}`}>
      <tr>
        {selectable && selectable !== "single" && (
          <th className={`${sizeConfig.header} w-12 text-left`}>
            <input
              type="checkbox"
              checked={allChecked}
              ref={(el) => {
                if (el) el.indeterminate = someChecked
              }}
              onChange={onToggleAll}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              aria-label="Select all rows"
            />
          </th>
        )}
        {selectable === "single" && (
          <th className={`${sizeConfig.header} w-12 text-left`}>
            <span className="sr-only">Select</span>
          </th>
        )}
        {columns.map(col => {
          const isSorted = sort.column?.key === col.key
          const alignClass = col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
          
          return (
            <th 
              key={col.key} 
              className={`${sizeConfig.header} font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} ${alignClass}`}
              style={{ width: col.width }}
            >
              {col.sortable ? (
                <button
                  type="button"
                  onClick={() => onSort(col)}
                  className={`inline-flex items-center ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors ${alignClass === "text-right" ? "flex-row-reverse" : ""}`}
                  aria-label={`Sort by ${col.title}`}
                >
                  <span>{col.title}</span>
                  <SortIcon direction={isSorted ? sort.direction : undefined} active={isSorted} />
                </button>
              ) : (
                col.title
              )}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
