import { useMemo, useState } from "react"
import type { DataTableProps, SortState } from "./types"
import { sizeClasses } from "./types"
import { cmp } from "./utils"
import { LoadingState } from "./LoadingState"
import { EmptyState } from "./EmptyState"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyText = "No data available",
  className,
  rowKey,
  onRowClick,
  size = "md",
  bordered = false,
  striped = false,
  isDarkMode = false,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>({ direction: "asc" })
  const [selected, setSelected] = useState<Set<string | number>>(new Set())

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(record)
    }
    if (rowKey && record[rowKey] != null) {
      return record[rowKey] as string | number
    }
    return index
  }

  const sorted = useMemo(() => {
    if (!sort.column) return data
    const col = sort.column.dataIndex
    const dir = sort.direction === "asc" ? 1 : -1
    return [...data].sort((r1, r2) => dir * cmp(r1[col], r2[col]))
  }, [data, sort])

  function toggleSort(col: typeof columns[0]) {
    if (!col.sortable) return
    setSort(prev => {
      if (prev.column?.key === col.key) {
        return { column: col, direction: prev.direction === "asc" ? "desc" : "asc" }
      }
      return { column: col, direction: "asc" }
    })
  }

  function toggleRow(key: string | number, record: T) {
    if (!selectable) return
    
    if (selectable === "single") {
      const newSelected = selected.has(key) ? new Set<string | number>() : new Set<string | number>([key])
      setSelected(newSelected)
      const selectedRecords = newSelected.size > 0 ? [record] : []
      onRowSelect?.(selectedRecords, selectedRecords[0])
    } else {
      const next = new Set(selected)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      setSelected(next)
      const selectedRecords = sorted.filter((_, idx) => next.has(getRowKey(sorted[idx], idx)))
      onRowSelect?.(selectedRecords)
    }
  }

  const allChecked = selectable && selectable !== "single" && sorted.length > 0 && 
    sorted.every((record, idx) => selected.has(getRowKey(record, idx)))
  const someChecked = selected.size > 0 && !allChecked

  function toggleAll() {
    if (!selectable || selectable === "single") return
    
    if (allChecked) {
      setSelected(new Set())
      onRowSelect?.([])
    } else {
      const allKeys = new Set(sorted.map((record, idx) => getRowKey(record, idx)))
      setSelected(allKeys)
      onRowSelect?.(sorted)
    }
  }

  const sizeConfig = sizeClasses[size]

  return (
    <div className={`w-full ${bordered ? `border ${isDarkMode ? 'border-gray-700' : 'border-gray-200/60'} shadow-sm` : "shadow-sm"} rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900/70' : 'bg-white/70'} backdrop-blur-sm ${className ?? ""}`}>
      {loading && <LoadingState isDarkMode={isDarkMode} />}

      {!loading && sorted.length === 0 && (
        <EmptyState isDarkMode={isDarkMode} emptyText={emptyText} />
      )}

      {!loading && sorted.length > 0 && (
        <div className="overflow-x-auto">
          <table className={`w-full ${sizeConfig.table} ${bordered ? "" : "border-collapse"}`}>
            <TableHeader
              columns={columns}
              selectable={selectable}
              sort={sort}
              onSort={toggleSort}
              allChecked={!!allChecked}
              someChecked={!!someChecked}
              onToggleAll={toggleAll}
              size={size}
              isDarkMode={isDarkMode}
              bordered={bordered}
            />
            <tbody className={`${isDarkMode ? 'bg-gray-900' : 'bg-white/70'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200/60'}`}>
              {sorted.map((row, idx) => {
                const key = getRowKey(row, idx)
                const isSelected = selected.has(key)
                
                return (
                  <TableRow
                    key={key}
                    row={row}
                    index={idx}
                    columns={columns}
                    selectable={selectable}
                    isSelected={isSelected}
                    isStriped={striped && idx % 2 === 1}
                    rowKey={key}
                    onToggleRow={toggleRow}
                    onRowClick={onRowClick}
                    size={size}
                    isDarkMode={isDarkMode}
                    bordered={bordered}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default DataTable
export type { DataTableProps, Column } from "./types"
