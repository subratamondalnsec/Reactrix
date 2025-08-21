import { ResetIcon } from "./icons"

interface ResetButtonProps {
  isResetting: boolean
  onReset: () => void
  isDarkMode: boolean
}

export const ResetButton = ({ isResetting, onReset, isDarkMode }: ResetButtonProps) => {
  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={onReset}
        disabled={isResetting}
        aria-label="Reset all inputs"
        className={`
          px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
          border-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2
          ${isResetting
            ? isDarkMode 
              ? 'bg-green-600 border-green-600 text-white cursor-not-allowed'
              : 'bg-green-500 border-green-500 text-white cursor-not-allowed'
            : isDarkMode 
              ? 'bg-red-600 hover:bg-red-700 border-red-600 text-white focus:ring-red-500' 
              : 'bg-red-500 hover:bg-red-600 border-red-500 text-white focus:ring-red-500'
          }
          ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
          ${!isResetting ? 'active:scale-95 transform' : ''}
        `}
      >
        {isResetting ? (
          <>
            <svg 
              className="w-4 h-4 mr-2 inline-block animate-spin" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Complete ✓
          </>
        ) : (
          <>
            <ResetIcon />
            Reset All Inputs
          </>
        )}
      </button>
    </div>
  )
}
