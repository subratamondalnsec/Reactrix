import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import InputField from "../components/InputField/"

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: "radio", 
      options: ["filled", "outlined", "ghost"],
      description: "Visual variant of the input field"
    },
    size: { 
      control: "radio", 
      options: ["sm", "md", "lg"],
      description: "Size of the input field: small, medium, large"
    },
    disabled: {
      control: "boolean",
      description: "Disable the input field"
    },
    invalid: {
      control: "boolean", 
      description: "Show invalid state"
    },
    loading: {
      control: "boolean",
      description: "Show loading state"
    },
    showClearButton: {
      control: "boolean",
      description: "Show clear button when input has value"
    },
    showPasswordToggle: {
      control: "boolean",
      description: "Show password toggle button (overrides auto-detection)"
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Position of the icon"
    }
  }
} satisfies Meta<typeof InputField>

export default meta

type Story = StoryObj<typeof meta>

// Interactive playground story
export const Playground: Story = {
  name: 'Interactive Demo',
  render: (args) => {
    const [val, setVal] = useState("")
    return (
      <div className="w-80">
        <InputField
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal("")}
        />
      </div>
    )
  },
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'This will be used to identify you',
    variant: 'outlined',
    size: 'md',
    showClearButton: true,
  },
}

// Sizes demonstration
export const Sizes: Story = {
  name: 'All Sizes',
  render: () => {
    const [values, setValues] = useState({ sm: "", md: "", lg: "" })
    
    return (
      <div className="space-y-6 w-80">
        <InputField
          label="Small Size"
          placeholder="Small input..."
          size="sm"
          value={values.sm}
          onChange={(e) => setValues(prev => ({ ...prev, sm: e.target.value }))}
          showClearButton
          onClear={() => setValues(prev => ({ ...prev, sm: "" }))}
        />
        <InputField
          label="Medium Size (Default)"
          placeholder="Medium input..."
          size="md"
          value={values.md}
          onChange={(e) => setValues(prev => ({ ...prev, md: e.target.value }))}
          showClearButton
          onClear={() => setValues(prev => ({ ...prev, md: "" }))}
        />
        <InputField
          label="Large Size"
          placeholder="Large input..."
          size="lg"
          value={values.lg}
          onChange={(e) => setValues(prev => ({ ...prev, lg: e.target.value }))}
          showClearButton
          onClear={() => setValues(prev => ({ ...prev, lg: "" }))}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all three available sizes: small (sm), medium (md), and large (lg)'
      }
    }
  }
}

// Password field with toggle
export const PasswordToggle: Story = {
  name: 'Password Toggle',
  render: () => {
    const [password, setPassword] = useState("")
    return (
      <div className="w-80">
        <InputField
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Click the eye icon to toggle visibility"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Password input with automatic toggle visibility button. The eye icon allows users to show/hide their password.'
      }
    }
  }
}

// Clear button functionality
export const ClearButton: Story = {
  name: 'Clear Button Demo',
  render: () => {
    const [value, setValue] = useState("Some text to clear")
    return (
      <div className="w-80">
        <InputField
          label="Input with Clear Button"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
          showClearButton={true}
          helperText="The clear button appears when there's text"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the optional clear button functionality. The clear button appears when there is text in the input.'
      }
    }
  }
}

// All variants showcase
export const Variants: Story = {
  name: 'Visual Variants',
  render: () => {
    const [values, setValues] = useState({ filled: "", outlined: "", ghost: "" })
    
    return (
      <div className="space-y-6 w-80">
        <InputField
          label="Filled Variant"
          placeholder="Type here..."
          variant="filled"
          value={values.filled}
          onChange={(e) => setValues(prev => ({ ...prev, filled: e.target.value }))}
          onClear={() => setValues(prev => ({ ...prev, filled: "" }))}
          showClearButton
          helperText="Filled background style"
        />
        <InputField
          label="Outlined Variant (Default)"
          placeholder="Type here..."
          variant="outlined"
          value={values.outlined}
          onChange={(e) => setValues(prev => ({ ...prev, outlined: e.target.value }))}
          onClear={() => setValues(prev => ({ ...prev, outlined: "" }))}
          showClearButton
          helperText="Classic outlined style"
        />
        <InputField
          label="Ghost Variant"
          placeholder="Type here..."
          variant="ghost"
          value={values.ghost}
          onChange={(e) => setValues(prev => ({ ...prev, ghost: e.target.value }))}
          onClear={() => setValues(prev => ({ ...prev, ghost: "" }))}
          showClearButton
          helperText="Minimal ghost style"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows all three visual variants: filled, outlined (default), and ghost styles.'
      }
    }
  }
}

// Dark theme demonstration (wrapped in dark container)
export const DarkTheme: Story = {
  name: 'Dark Mode Support',
  render: () => {
    const [value, setValue] = useState("")
    const [password, setPassword] = useState("")
    return (
      <div className="dark bg-gray-900 p-6 rounded-lg">
        <div className="space-y-6 w-80">
          <InputField
            label="Dark Theme Input"
            placeholder="Type in dark mode..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue("")}
            showClearButton
            helperText="Optimized for dark backgrounds"
          />
          <InputField
            type="password"
            label="Dark Theme Password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Toggle visibility in dark mode"
          />
        </div>
      </div>
    )
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Demonstrates full dark mode support with proper contrast and theming for both regular inputs and password fields.'
      }
    }
  }
}

// With icons
export const WithIcons: Story = {
  name: 'Icon Support',
  render: () => {
    const [values, setValues] = useState({ search: "", email: "", phone: "" })
    
    const SearchIcon = () => (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
    
    const EmailIcon = () => (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    )
    
    const PhoneIcon = () => (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
    
    return (
      <div className="space-y-6 w-80">
        <InputField
          label="Search"
          placeholder="Search..."
          value={values.search}
          onChange={(e) => setValues(prev => ({ ...prev, search: e.target.value }))}
          icon={<SearchIcon />}
          iconPosition="left"
          showClearButton
          onClear={() => setValues(prev => ({ ...prev, search: "" }))}
        />
        <InputField
          label="Email"
          placeholder="your@email.com"
          value={values.email}
          onChange={(e) => setValues(prev => ({ ...prev, email: e.target.value }))}
          icon={<EmailIcon />}
          iconPosition="left"
        />
        <InputField
          label="Phone"
          placeholder="+1 (555) 123-4567"
          value={values.phone}
          onChange={(e) => setValues(prev => ({ ...prev, phone: e.target.value }))}
          icon={<PhoneIcon />}
          iconPosition="right"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates icon support with customizable positioning (left or right) and various icon combinations.'
      }
    }
  }
}
