import type { BaseDataTableProps } from "./types"
import { LoadingSpinner } from "./icons"

export const LoadingState = ({ isDarkMode }: Pick<BaseDataTableProps, 'isDarkMode'>) => {
  return (
    <div className={`flex items-center justify-center p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white/80'}`}>
      <LoadingSpinner />
      <span className={`ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</span>
    </div>
  )
}
