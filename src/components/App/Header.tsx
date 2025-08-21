interface HeaderProps {
  isDarkMode: boolean
}

export const Header = ({ isDarkMode }: HeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Reactrix Component Library
      </h1>
      <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Modern React components built with TypeScript and TailwindCSS
      </p>
    </div>
  )
}
