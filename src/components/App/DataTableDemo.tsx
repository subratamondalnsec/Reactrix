import InputField from "../InputField/"
import DataTable from "../DataTable/"
import type { User, FormData } from "./types"
import { userColumns, sampleUsers } from "./data"
import { SearchIcon } from "./icons"
import { SelectionInfo } from "./SelectionInfo"
import { TableFeaturesInfo } from "./TableFeaturesInfo"

interface DataTableDemoProps {
  formData: FormData
  filteredUsers: User[]
  selectedUsers: User[]
  onSearch: (searchTerm: string) => void
  onRowSelect: (selected: User[]) => void
  onClearSelection: () => void
  isDarkMode: boolean
}

export const DataTableDemo = ({
  formData,
  filteredUsers,
  selectedUsers,
  onSearch,
  onRowSelect,
  onClearSelection,
  isDarkMode
}: DataTableDemoProps) => {
  return (
    <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        DataTable Component Demo
      </h2>
      
      {/* Search */}
      <div className="mb-6">
        <InputField
          label="Search Users"
          placeholder="Search by name, email, or role..."
          value={formData.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
          icon={<SearchIcon />}
          iconPosition="left"
          showClearButton
          onClear={() => onSearch("")}
          helperText={`Showing ${filteredUsers.length} of ${sampleUsers.length} users`}
          isDarkMode={isDarkMode}
        />
      </div>

      <SelectionInfo
        selectedUsers={selectedUsers}
        onClearSelection={onClearSelection}
        isDarkMode={isDarkMode}
      />
      
      {/* Data Table */}
      <DataTable
        data={filteredUsers}
        columns={userColumns}
        selectable="multiple"
        onRowSelect={onRowSelect}
        bordered
        striped
        emptyText="No users match your search criteria. Try different keywords."
        isDarkMode={isDarkMode}
      />
      
      <TableFeaturesInfo isDarkMode={isDarkMode} />
    </div>
  )
}
