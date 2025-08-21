import type { BaseInputFieldProps, InputFieldSize } from "./types"
import { sizeClasses } from "./types"

interface LabelProps extends BaseInputFieldProps {
  htmlFor: string
  children: string
  size: InputFieldSize
}

export const Label = ({ htmlFor, children, size, isDarkMode, disabled }: LabelProps) => {
  const sizeConfig = sizeClasses[size]
  
  return (
    <label 
      htmlFor={htmlFor} 
      className={`mb-2 block font-medium ${isDarkMode ? 'text-slate-100' : 'text-black'} ${sizeConfig.text} ${disabled ? (isDarkMode ? 'text-slate-400' : 'text-slate-500') : ""}`}
    >
      {children}
    </label>
  )
}
