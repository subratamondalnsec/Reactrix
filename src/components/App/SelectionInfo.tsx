import type { User } from "./types"

interface SelectionInfoProps {
  selectedUsers: User[]
  onClearSelection: () => void
  isDarkMode: boolean
}

export const SelectionInfo = ({ selectedUsers, onClearSelection, isDarkMode }: SelectionInfoProps) => {
  if (selectedUsers.length === 0) return null

  return (
    <div className={`mb-4 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-100' : 'text-blue-900'}`}>
            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
          </p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            {selectedUsers.map(user => user.name).join(', ')}
          </p>
        </div>
        <button
          onClick={onClearSelection}
          className={`text-sm font-medium ${
            isDarkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          Clear Selection
        </button>
      </div>
    </div>
  )
}
