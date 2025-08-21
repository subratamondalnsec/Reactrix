interface TableFeaturesInfoProps {
  isDarkMode: boolean
}

export const TableFeaturesInfo = ({ isDarkMode }: TableFeaturesInfoProps) => {
  return (
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span>Sortable columns</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Multi-row selection</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Custom cell rendering</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Responsive design</span>
      </div>
    </div>
  )
}
