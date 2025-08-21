import type { BaseDataTableProps } from "./types"
import { EmptyIcon } from "./icons"

interface EmptyStateProps extends Pick<BaseDataTableProps, 'isDarkMode'> {
  emptyText: string
}

export const EmptyState = ({ isDarkMode, emptyText }: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 ${isDarkMode ? 'bg-gray-900' : 'bg-white/80'} text-center`}>
      <EmptyIcon />
      <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg font-medium`}>No Data</p>
      <p className={`mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm`}>{emptyText}</p>
    </div>
  )
}
