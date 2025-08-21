import type { BaseInputFieldProps, InputFieldSize } from "./types"
import { sizeClasses } from "./types"
import { ClearIcon } from "./icons"

interface ClearButtonProps extends BaseInputFieldProps {
  onClear: () => void
  size: InputFieldSize
}

export const ClearButton = ({ onClear, size, isDarkMode }: ClearButtonProps) => {
  const sizeConfig = sizeClasses[size]
  
  return (
    <button
      type="button"
      onClick={onClear}
      aria-label="Clear input"
      className={`
        ${sizeConfig.icon} p-0.5 rounded-md
        ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}
        ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-slate-100'}
        transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50
      `}
    >
      <ClearIcon className="w-full h-full" />
    </button>
  )
}
