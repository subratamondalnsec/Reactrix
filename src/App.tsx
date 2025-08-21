import { useState } from 'react'
import type { FormData, SizesDemoData, User } from './components/App'
import { sampleUsers } from './components/App'
import {
  ThemeToggle,
  Header,
  InputFieldDemo,
  DataTableDemo,
  Footer
} from './components/App'
import './App.css'

function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    search: "",
  })
  
  // Separate state for sizes demo
  const [sizesDemoData, setSizesDemoData] = useState<SizesDemoData>({
    sm: "",
    md: "",
    lg: "",
  })
  
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers)
  const [isResetting, setIsResetting] = useState(false)

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  // Reset all input fields function
  const resetAllInputs = () => {
    setIsResetting(true)
    setFormData({
      name: "",
      email: "",
      password: "",
      search: "",
    })
    setSizesDemoData({
      sm: "",
      md: "",
      lg: "",
    })
    // Also reset the filtered users when search is cleared
    setFilteredUsers(sampleUsers)
    
    // Reset the visual feedback after a short delay
    setTimeout(() => {
      setIsResetting(false)
    }, 1000)
  }

  const handleSearch = (searchTerm: string) => {
    setFormData(prev => ({ ...prev, search: searchTerm }))
    
    if (!searchTerm.trim()) {
      setFilteredUsers(sampleUsers)
    } else {
      const filtered = sampleUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        
        <Header isDarkMode={isDarkMode} />

        <InputFieldDemo
          formData={formData}
          onFormDataChange={setFormData}
          sizesDemoData={sizesDemoData}
          onSizesDemoChange={setSizesDemoData}
          isResetting={isResetting}
          onReset={resetAllInputs}
          isDarkMode={isDarkMode}
        />

        <DataTableDemo
          formData={formData}
          filteredUsers={filteredUsers}
          selectedUsers={selectedUsers}
          onSearch={handleSearch}
          onRowSelect={setSelectedUsers}
          onClearSelection={() => setSelectedUsers([])}
          isDarkMode={isDarkMode}
        />

        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}

export default App
