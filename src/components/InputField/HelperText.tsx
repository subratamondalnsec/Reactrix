import type { BaseInputFieldProps } from "./types"

interface HelperTextProps extends BaseInputFieldProps {
  id: string
  children: string
}

export const HelperText = ({ id, children, isDarkMode }: HelperTextProps) => {
  return (
    <p id={id} className={`mt-1.5 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
      {children}
    </p>
  )
}
