import { render, screen, fireEvent } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import InputField from "../components/InputField/"

describe("InputField", () => {
  test("renders label and accepts input", () => {
    const onChange = vi.fn()
    render(<InputField label="Email" placeholder="Type here" value="" onChange={onChange} />)
    
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    const input = screen.getByPlaceholderText("Type here")
    fireEvent.change(input, { target: { value: "test@example.com" } })
    expect(onChange).toHaveBeenCalled()
  })

  test("shows error when invalid", () => {
    render(<InputField label="Name" invalid errorMessage="This field is required" />)
    
    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true")
  })

  test("shows helper text when provided", () => {
    render(<InputField label="Username" helperText="Choose a unique username" />)
    
    expect(screen.getByText("Choose a unique username")).toBeInTheDocument()
  })

  test("calls onClear when clear button is clicked", () => {
    const onClear = vi.fn()
    render(
      <InputField 
        label="Search" 
        value="test value" 
        showClearButton 
        onClear={onClear} 
      />
    )
    
    const clearButton = screen.getByLabelText("Clear input")
    fireEvent.click(clearButton)
    expect(onClear).toHaveBeenCalled()
  })

  test("toggles password visibility", () => {
    render(<InputField type="password" label="Password" value="secret123" />)
    
    const input = screen.getByLabelText("Password")
    const toggleButton = screen.getByLabelText("Show password")
    
    expect(input).toHaveAttribute("type", "password")
    
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute("type", "text")
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument()
  })

  test("disables input when disabled prop is true", () => {
    render(<InputField label="Disabled Input" disabled value="cannot edit" />)
    
    const input = screen.getByLabelText("Disabled Input")
    expect(input).toBeDisabled()
  })

  test("shows loading state", () => {
    render(<InputField label="Loading Input" loading />)
    
    expect(screen.getByLabelText("Loading")).toBeInTheDocument()
  })

  test("applies correct variant classes", () => {
    const { rerender } = render(<InputField variant="filled" label="Test" />)
    
    // Test that different variants render without errors
    rerender(<InputField variant="outlined" label="Test" />)
    rerender(<InputField variant="ghost" label="Test" />)
  })

  test("applies correct size classes", () => {
    const { rerender } = render(<InputField size="sm" label="Small" />)
    
    // Test that different sizes render without errors
    rerender(<InputField size="md" label="Medium" />)
    rerender(<InputField size="lg" label="Large" />)
  })

  test("renders with icon", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>
    
    render(
      <InputField 
        label="Search" 
        icon={<TestIcon />} 
        iconPosition="left" 
      />
    )
    
    expect(screen.getByTestId("test-icon")).toBeInTheDocument()
  })
})
