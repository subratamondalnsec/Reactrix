import { SunIcon, MoonIcon } from "./icons"

interface ThemeToggleProps {
  isDarkMode: boolean
  onToggle: () => void
}

export const ThemeToggle = ({ isDarkMode, onToggle }: ThemeToggleProps) => {
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={onToggle}
        aria-label="Toggle theme"
        className={`p-3 rounded-lg transition-all duration-200 border-2 ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-black'
        }`}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  )
}
