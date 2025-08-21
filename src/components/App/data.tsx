import type { User } from "./types"

export const sampleUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28, role: "Designer", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", age: 32, role: "Developer", status: "active" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", age: 26, role: "Manager", status: "inactive" },
  { id: 4, name: "David Wilson", email: "david@example.com", age: 35, role: "Developer", status: "active" },
  { id: 5, name: "Eva Brown", email: "eva@example.com", age: 29, role: "Designer", status: "active" },
]

export const userColumns = [
  { 
    key: "name", 
    title: "Name", 
    dataIndex: "name" as keyof User, 
    sortable: true,
    render: (value: string, record: User) => (
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
          {value.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      </div>
    )
  },
  { key: "age", title: "Age", dataIndex: "age" as keyof User, sortable: true, align: "center" as const },
  { key: "role", title: "Role", dataIndex: "role" as keyof User, sortable: true },
  { 
    key: "status", 
    title: "Status", 
    dataIndex: "status" as keyof User, 
    sortable: true,
    align: "center" as const,
    render: (value: "active" | "inactive") => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === "active" 
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  },
]
