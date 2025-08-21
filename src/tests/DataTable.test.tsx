import { render, screen, fireEvent } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import DataTable from "../components/DataTable/"

type TestRow = { id: number; name: string; age: number; role: string }

const testData: TestRow[] = [
  { id: 1, name: "Bob Wilson", age: 30, role: "Developer" },
  { id: 2, name: "Alice Johnson", age: 25, role: "Designer" },
  { id: 3, name: "Charlie Brown", age: 35, role: "Manager" }
]

const testColumns = [
  { key: "name", title: "Name", dataIndex: "name" as keyof TestRow, sortable: true },
  { key: "age", title: "Age", dataIndex: "age" as keyof TestRow, sortable: true },
  { key: "role", title: "Role", dataIndex: "role" as keyof TestRow }
]

describe("DataTable", () => {
  test("renders table with data", () => {
    render(<DataTable data={testData} columns={testColumns} />)
    
    expect(screen.getByText("Bob Wilson")).toBeInTheDocument()
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument()
    expect(screen.getByText("Charlie Brown")).toBeInTheDocument()
  })

  test("sorts by column when sort button is clicked", () => {
    render(<DataTable data={testData} columns={testColumns} />)

    const sortBtn = screen.getByLabelText("Sort by Name")
    fireEvent.click(sortBtn) // Should sort ascending
    
    const rows = screen.getAllByRole("row")
    // Skip header row, check first data row
    const firstRowCells = rows[1].querySelectorAll("td")
    expect(firstRowCells[0]).toHaveTextContent("Alice Johnson")
  })

  test("handles row selection with multiple selection", () => {
    const onSelect = vi.fn()
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable="multiple"
        onRowSelect={onSelect} 
      />
    )

    const checkboxes = screen.getAllByRole("checkbox")
    // Click on first data row checkbox (index 1, as 0 is the header checkbox)
    fireEvent.click(checkboxes[1])
    
    expect(onSelect).toHaveBeenCalledWith([testData[0]])
  })

  test("handles single row selection", () => {
    const onSelect = vi.fn()
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable="single"
        onRowSelect={onSelect} 
      />
    )

    const radioButtons = screen.getAllByRole("radio")
    fireEvent.click(radioButtons[0])
    
    expect(onSelect).toHaveBeenCalled()
  })

  test("shows loading state", () => {
    render(<DataTable data={[]} columns={testColumns} loading />)
    
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  test("shows empty state when no data", () => {
    render(<DataTable data={[]} columns={testColumns} emptyText="No records found" />)
    
    expect(screen.getByText("No Data")).toBeInTheDocument()
    expect(screen.getByText("No records found")).toBeInTheDocument()
  })

  test("select all functionality works", () => {
    const onSelect = vi.fn()
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable="multiple"
        onRowSelect={onSelect} 
      />
    )

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0]
    fireEvent.click(selectAllCheckbox)
    
    expect(onSelect).toHaveBeenCalledWith(testData)
  })

  test("renders custom cell content", () => {
    const customColumns = [
      { 
        key: "name", 
        title: "Name", 
        dataIndex: "name" as keyof TestRow,
        render: (value: string) => <span data-testid="custom-name">{value.toUpperCase()}</span>
      },
      { key: "age", title: "Age", dataIndex: "age" as keyof TestRow }
    ]

    render(<DataTable data={[testData[0]]} columns={customColumns} />)
    
    expect(screen.getByTestId("custom-name")).toHaveTextContent("BOB WILSON")
  })

  test("handles row click callback", () => {
    const onRowClick = vi.fn()
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        onRowClick={onRowClick}
      />
    )

    const firstRow = screen.getAllByRole("row")[1] // Skip header
    fireEvent.click(firstRow)
    
    expect(onRowClick).toHaveBeenCalledWith(testData[0], 0)
  })

  test("applies different sizes correctly", () => {
    const { rerender } = render(
      <DataTable data={testData} columns={testColumns} size="sm" />
    )
    
    // Test that different sizes render without errors
    rerender(<DataTable data={testData} columns={testColumns} size="md" />)
    rerender(<DataTable data={testData} columns={testColumns} size="lg" />)
  })

  test("applies styling options", () => {
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        bordered 
        striped 
      />
    )
    
    // Just verify it renders without errors - visual styling tests would need different tools
    expect(screen.getByText("Bob Wilson")).toBeInTheDocument()
  })

  test("handles sorting direction correctly", () => {
    render(<DataTable data={testData} columns={testColumns} />)

    const sortBtn = screen.getByLabelText("Sort by Age")
    
    // First click - ascending
    fireEvent.click(sortBtn)
    let rows = screen.getAllByRole("row")
    let firstRowCells = rows[1].querySelectorAll("td")
    expect(firstRowCells[1]).toHaveTextContent("25") // Alice (youngest)
    
    // Second click - descending  
    fireEvent.click(sortBtn)
    rows = screen.getAllByRole("row")
    firstRowCells = rows[1].querySelectorAll("td")
    expect(firstRowCells[1]).toHaveTextContent("35") // Charlie (oldest)
  })
})
