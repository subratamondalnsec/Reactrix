import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import DataTable from "../components/DataTable/"

// Sample data types
type User = { 
  id: number
  name: string
  email: string
  age: number
  city: string
  role: string
  status: "active" | "inactive"
  salary: number
}

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
}

// Sample data
const userData: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28, city: "New York", role: "Designer", status: "active", salary: 75000 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", age: 32, city: "San Francisco", role: "Developer", status: "active", salary: 95000 },
  { id: 3, name: "Carol Davis", email: "carol@example.com", age: 26, city: "Los Angeles", role: "Product Manager", status: "inactive", salary: 85000 },
  { id: 4, name: "David Wilson", email: "david@example.com", age: 35, city: "Chicago", role: "Developer", status: "active", salary: 92000 },
  { id: 5, name: "Eva Brown", email: "eva@example.com", age: 29, city: "Austin", role: "Designer", status: "active", salary: 78000 },
  { id: 6, name: "Frank Miller", email: "frank@example.com", age: 41, city: "Seattle", role: "Manager", status: "active", salary: 110000 },
  { id: 7, name: "Grace Taylor", email: "grace@example.com", age: 31, city: "Boston", role: "Developer", status: "inactive", salary: 88000 },
  { id: 8, name: "Henry Garcia", email: "henry@example.com", age: 27, city: "Miami", role: "Designer", status: "active", salary: 72000 },
]

const productData: Product[] = [
  { id: 1, name: "MacBook Pro", category: "Laptops", price: 2399, stock: 15, rating: 4.8 },
  { id: 2, name: "iPhone 14", category: "Phones", price: 999, stock: 42, rating: 4.7 },
  { id: 3, name: "iPad Air", category: "Tablets", price: 599, stock: 28, rating: 4.6 },
  { id: 4, name: "Apple Watch", category: "Wearables", price: 399, stock: 33, rating: 4.5 },
  { id: 5, name: "AirPods Pro", category: "Audio", price: 249, stock: 67, rating: 4.4 },
]

const userColumns = [
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
  { key: "city", title: "City", dataIndex: "city" as keyof User, sortable: true },
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
  { 
    key: "salary", 
    title: "Salary", 
    dataIndex: "salary" as keyof User, 
    sortable: true, 
    align: "right" as const,
    render: (value: number) => `$${value.toLocaleString()}`
  },
]

const productColumns = [
  { key: "name", title: "Product", dataIndex: "name" as keyof Product, sortable: true },
  { key: "category", title: "Category", dataIndex: "category" as keyof Product, sortable: true },
  { 
    key: "price", 
    title: "Price", 
    dataIndex: "price" as keyof Product, 
    sortable: true, 
    align: "right" as const,
    render: (value: number) => `$${value.toLocaleString()}`
  },
  { key: "stock", title: "Stock", dataIndex: "stock" as keyof Product, sortable: true, align: "center" as const },
  { 
    key: "rating", 
    title: "Rating", 
    dataIndex: "rating" as keyof Product, 
    sortable: true, 
    align: "center" as const,
    render: (value: number) => (
      <div className="flex items-center justify-center space-x-1">
        <span>{value}</span>
        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    )
  },
]

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  parameters: { 
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A flexible and powerful data table component with sorting, selection, and customization features.

## Features
- Sortable columns
- Row selection (single/multiple)
- Loading and empty states
- Custom cell rendering
- Responsive design
- Accessible with ARIA labels
- TypeScript support with generics
- Dark mode support
        `
      }
    }
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Show loading state"
    },
    selectable: {
      control: "radio",
      options: [false, true, "single", "multiple"],
      description: "Enable row selection"
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Table size"
    },
    bordered: {
      control: "boolean",
      description: "Add border around table"
    },
    striped: {
      control: "boolean",
      description: "Alternate row background colors"
    }
  }
}
export default meta
type Story = StoryObj<typeof DataTable<User>>

// Basic usage
export const Basic: Story = {
  args: {
    data: userData.slice(0, 5),
    columns: userColumns,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic data table with user data, sortable columns, and custom cell rendering."
      }
    }
  }
}

// With selection
export const WithSelection: Story = {
  render: (args: any) => {
    const [selectedRows, setSelectedRows] = useState<User[]>([])
    
    return (
      <div className="p-4">
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Selected: {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''}
          </p>
          {selectedRows.length > 0 && (
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              {selectedRows.map(row => row.name).join(', ')}
            </p>
          )}
        </div>
        <DataTable<User>
          {...args}
          data={userData}
          columns={userColumns}
          selectable="multiple"
          onRowSelect={(rows: User[]) => setSelectedRows(rows)}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Data table with multiple row selection enabled. Shows selected row count above the table."
      }
    }
  }
}

// Single selection
export const SingleSelection: Story = {
  render: (args: any) => {
    const [selectedRow, setSelectedRow] = useState<User | null>(null)
    
    return (
      <div className="p-4">
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm font-medium text-green-900 dark:text-green-100">
            Selected: {selectedRow ? selectedRow.name : 'None'}
          </p>
          {selectedRow && (
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
              {selectedRow.email} • {selectedRow.role}
            </p>
          )}
        </div>
        <DataTable<User>
          {...args}
          data={userData}
          columns={userColumns}
          selectable="single"
          onRowSelect={(_rows: User[], row?: User) => setSelectedRow(row || null)}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Data table with single row selection (radio buttons). Shows selected row details above the table."
      }
    }
  }
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">Small Size</h3>
        <DataTable<User>
          data={userData.slice(0, 3)}
          columns={userColumns}
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Medium Size (Default)</h3>
        <DataTable<User>
          data={userData.slice(0, 3)}
          columns={userColumns}
          size="md"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Large Size</h3>
        <DataTable<User>
          data={userData.slice(0, 3)}
          columns={userColumns}
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Data tables in different sizes to fit various design needs."
      }
    }
  }
}

// With styling options
export const StylingOptions: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">Bordered</h3>
        <DataTable<User>
          data={userData.slice(0, 4)}
          columns={userColumns}
          bordered
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Striped</h3>
        <DataTable<User>
          data={userData.slice(0, 4)}
          columns={userColumns}
          striped
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Bordered + Striped</h3>
        <DataTable<User>
          data={userData.slice(0, 4)}
          columns={userColumns}
          bordered
          striped
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various styling options including borders and striped rows."
      }
    }
  }
}

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state with spinner and message."
      }
    }
  }
}

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyText: "No users found. Try adjusting your search criteria.",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state with custom message and icon."
      }
    }
  }
}

// Different data type - Products
export const ProductTable: Story = {
  render: () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Product Inventory</h3>
      <DataTable<Product>
        data={productData}
        columns={productColumns}
        selectable="multiple"
        striped
        onRowSelect={(rows: Product[]) => console.log('Selected products:', rows)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example with different data type (products) showing the flexibility of the generic implementation."
      }
    }
  }
}

// Interactive playground
export const Playground: Story = {
  render: (args: any) => {
    const [selectedRows, setSelectedRows] = useState<User[]>([])
    
    return (
      <div className="p-4">
        {args.selectable && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium">
              Selected: {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
        <DataTable<User>
          {...args}
          data={userData}
          columns={userColumns}
          onRowSelect={(rows: User[]) => setSelectedRows(rows)}
        />
      </div>
    )
  },
  args: {
    loading: false,
    selectable: false,
    size: "md",
    bordered: false,
    striped: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to experiment with all table features and options."
      }
    }
  }
}
