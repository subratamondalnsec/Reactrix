export type InputFieldSize = "sm" | "md" | "lg"
export type InputFieldVariant = "filled" | "outlined" | "ghost"

export interface BaseInputFieldProps {
  size?: InputFieldSize
  variant?: InputFieldVariant
  isDarkMode?: boolean
  disabled?: boolean
  invalid?: boolean
}

export interface InputFieldProps extends BaseInputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  loading?: boolean
  type?: React.HTMLInputTypeAttribute
  className?: string
  onClear?: () => void
  showClearButton?: boolean
  showPasswordToggle?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export const sizeClasses: Record<InputFieldSize, { 
  container: string, 
  text: string, 
  icon: string,
  padding: { left: string, right: string }
}> = {
  sm: { 
    container: "h-9 px-3", 
    text: "text-sm", 
    icon: "w-4 h-4",
    padding: { left: "pl-9", right: "pr-9" }
  },
  md: { 
    container: "h-10 px-3.5", 
    text: "text-base", 
    icon: "w-5 h-5",
    padding: { left: "pl-10", right: "pr-10" }
  },
  lg: { 
    container: "h-12 px-4", 
    text: "text-lg", 
    icon: "w-6 h-6",
    padding: { left: "pl-12", right: "pr-12" }
  },
}
