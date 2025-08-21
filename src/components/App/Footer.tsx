interface FooterProps {
  isDarkMode: boolean
}

export const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <div className={`text-center mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
        Built with React, TypeScript, TailwindCSS, and Storybook
      </p>
    </div>
  )
}
