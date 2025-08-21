import { useState } from 'react'
import { InputField } from '../components/InputField/'
import { DataTable } from '../components/DataTable/'
import type { Column } from '../components/DataTable/'

// Example: User Management Form
type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

export function UserManagement() {
  const [users] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "inactive" },
  ])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
      // Reset form
      setFormData({ name: '', email: '', password: '' })
    }
  }

  // Table columns
  const columns: Column<User>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sortable: true,
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      align: 'center',
      render: (status: 'active' | 'inactive') => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Add User Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Add New User
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <InputField
            label="Full Name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
            onClear={() => handleInputChange('name', '')}
            showClearButton
            invalid={!!errors.name}
            errorMessage={errors.name}
            helperText={!errors.name ? "Enter the user's full name" : undefined}
          />
          
          <InputField
            label="Email Address"
            placeholder="user@example.com"
            type="email"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
            invalid={!!errors.email}
            errorMessage={errors.email}
            helperText={!errors.email ? "User's email address" : undefined}
          />
        </div>
        
        <div className="mb-6">
          <InputField
            label="Password"
            placeholder="Enter password"
            type="password"
            value={formData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
            invalid={!!errors.password}
            errorMessage={errors.password}
            helperText={!errors.password ? "Minimum 8 characters required" : undefined}
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Users ({users.length})
          </h2>
          
          {selectedUsers.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
        
        <DataTable
          data={users}
          columns={columns}
          selectable="multiple"
          onRowSelect={setSelectedUsers}
          bordered
          striped
          emptyText="No users found"
        />
        
        {selectedUsers.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Selected Users:
            </h3>
            <div className="space-y-1">
              {selectedUsers.map(user => (
                <div key={user.id} className="text-sm text-blue-700 dark:text-blue-300">
                  {user.name} ({user.email})
                </div>
              ))}
            </div>
            <div className="mt-3 space-x-2">
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                Delete Selected
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                Export Selected
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserManagement
