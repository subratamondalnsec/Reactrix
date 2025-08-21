# Reactrix - React Component Library

A modern React component library built with TypeScript, TailwindCSS, and Storybook featuring accessible, responsive, and customizable UI components.

## 🚀 Features

- **TypeScript**: Full type safety with comprehensive interfaces
- **TailwindCSS**: Modern utility-first styling with dark mode support
- **Storybook**: Interactive component documentation and testing
- **Accessibility**: ARIA labels and keyboard navigation support
- **Responsive**: Mobile-first design approach
- **Customizable**: Multiple variants, sizes, and styling options

## 📦 Components

### InputField

A flexible and accessible input field component with various states and features.

#### Features
- **Variants**: `filled`, `outlined` (default), `ghost`
- **Sizes**: `sm`, `md` (default), `lg`
- **States**: normal, disabled, invalid, loading
- **Optional Features**:
  - Clear button
  - Password toggle (auto-shown for password fields)
  - Left/right icons
  - Helper text and error messages
- **Accessibility**: Full ARIA support with proper labeling

#### Usage

```tsx
import { InputField } from './components/InputField'

function MyForm() {
  const [value, setValue] = useState('')
  
  return (
    <InputField
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      size="md"
      showClearButton
      onClear={() => setValue('')}
      icon={<EmailIcon />}
      iconPosition="left"
      helperText="We'll never share your email"
    />
  )
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Input value |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message (shows when invalid) |
| `disabled` | `boolean` | `false` | Disable the input |
| `invalid` | `boolean` | `false` | Show invalid state |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'outlined'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `loading` | `boolean` | `false` | Show loading state |
| `type` | `HTMLInputTypeAttribute` | `'text'` | Input type |
| `showClearButton` | `boolean` | `false` | Show clear button |
| `showPasswordToggle` | `boolean` | - | Override password toggle visibility |
| `icon` | `React.ReactNode` | - | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `onClear` | `() => void` | - | Clear button handler |

### DataTable

A powerful data table component with sorting, selection, and customization options.

#### Features
- **Sorting**: Click column headers to sort data
- **Selection**: Single or multiple row selection
- **Custom Rendering**: Custom cell content with render functions
- **States**: loading, empty state with custom messages
- **Styling Options**: bordered, striped, multiple sizes
- **Responsive**: Horizontal scroll on smaller screens
- **TypeScript**: Generic types for type-safe data handling

#### Usage

```tsx
import { DataTable, Column } from './components/DataTable'

type User = {
  id: number
  name: string
  email: string
  age: number
  status: 'active' | 'inactive'
}

function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  
  const columns: Column<User>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (value) => (
        <span className={value === 'active' ? 'text-green-600' : 'text-red-600'}>
          {value}
        </span>
      )
    }
  ]
  
  return (
    <DataTable
      data={users}
      columns={columns}
      selectable="multiple"
      onRowSelect={setSelectedUsers}
      bordered
      striped
    />
  )
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | - | Array of data objects |
| `columns` | `Column<T>[]` | - | Column definitions |
| `loading` | `boolean` | `false` | Show loading state |
| `selectable` | `boolean \| 'single' \| 'multiple'` | `false` | Enable row selection |
| `onRowSelect` | `(rows: T[], row?: T) => void` | - | Selection change handler |
| `emptyText` | `string` | `'No data available'` | Empty state message |
| `rowKey` | `keyof T \| (record: T) => string \| number` | - | Unique row identifier |
| `onRowClick` | `(record: T, index: number) => void` | - | Row click handler |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table size |
| `bordered` | `boolean` | `false` | Add table border |
| `striped` | `boolean` | `false` | Alternate row colors |

#### Column Interface

```tsx
interface Column<T> {
  key: string                              // Unique column key
  title: string                            // Column header text
  dataIndex: keyof T                       // Data property key
  sortable?: boolean                       // Enable sorting
  width?: string | number                  // Column width
  align?: 'left' | 'center' | 'right'     // Text alignment
  render?: (value: any, record: T, index: number) => React.ReactNode // Custom renderer
}
```

## 🛠 Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd reactrix

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run test` - Run tests (when configured)
- `npm run lint` - Run ESLint

## 📚 Storybook

Comprehensive component documentation and interactive examples are available in Storybook:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can:
- Explore all component variants and states
- Interactive controls to test different props
- Code examples and documentation
- Accessibility testing with built-in a11y addon

### Available Stories

#### InputField Stories
- **Playground** - Interactive controls for all props
- **Variants** - All visual variants (filled, outlined, ghost)
- **Sizes** - All size options (sm, md, lg)
- **States** - Different states (normal, disabled, invalid, loading)
- **Password** - Password field with toggle
- **WithIcons** - Examples with various icons
- **AllFeatures** - Comprehensive example with validation

#### DataTable Stories
- **Basic** - Simple table with user data
- **WithSelection** - Multiple row selection example
- **SingleSelection** - Single row selection with radio buttons
- **Sizes** - Tables in different sizes
- **StylingOptions** - Bordered and striped variations
- **Loading** - Loading state demonstration
- **Empty** - Empty state with custom message
- **ProductTable** - Example with different data type
- **Playground** - Interactive controls for all props

## 🎨 Styling

The components use TailwindCSS for styling with support for:

- **Dark Mode**: Automatic dark mode support using `dark:` variants
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Customization**: Easy to override styles with custom classes
- **Theming**: Consistent color palette and spacing

### TailwindCSS Configuration

Make sure your `tailwind.config.js` includes the component paths:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## ♿ Accessibility

Both components follow WAI-ARIA guidelines and include:

- **Semantic HTML**: Proper HTML elements and structure
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Error Handling**: Accessible error messages
- **High Contrast**: Support for high contrast modes

### Testing Accessibility

The components include the `@storybook/addon-a11y` addon for automated accessibility testing in Storybook.

## 🧪 Testing

Basic tests are included for both components using Vitest and Testing Library:

```bash
npm run test
```

### Test Coverage

- **InputField**: Form interactions, state changes, accessibility
- **DataTable**: Sorting, selection, data rendering, empty states

## 🚀 Production Usage

### Build for Production

```bash
npm run build
```

### Component Exports

```tsx
// Import individual components
import { InputField } from './components/InputField'
import { DataTable } from './components/DataTable'

// Import types
import type { InputFieldProps } from './components/InputField'
import type { DataTableProps, Column } from './components/DataTable'
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Additional form components (Select, Textarea, DatePicker)
- [ ] Data table pagination and virtual scrolling
- [ ] Advanced filtering and search
- [ ] Theme customization system
- [ ] Animation and transition options
- [ ] Internationalization support
- [ ] Additional testing utilities
