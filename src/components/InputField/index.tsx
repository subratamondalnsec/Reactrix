import { forwardRef, useId } from "react"
import type { InputFieldProps } from "./types"
import { Label } from "./Label"
import { InputBox } from "./InputBox"
import { HelperText } from "./HelperText"
import { ErrorMessage } from "./ErrorMessage"

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  loading = false,
  type = "text",
  className,
  onClear,
  showClearButton = false,
  showPasswordToggle,
  icon,
  iconPosition = "left",
  isDarkMode = false,
}, ref) => {
  const id = useId()

  const describedBy = [
    helperText ? `${id}-help` : null,
    invalid && errorMessage ? `${id}-error` : null,
  ].filter(Boolean).join(" ") || undefined

  return (
    <div className={`w-full ${className ?? ""}`}>
      {label && (
        <Label 
          htmlFor={id}
          size={size}
          isDarkMode={isDarkMode}
          disabled={disabled}
        >
          {label}
        </Label>
      )}

      <InputBox
        id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        loading={loading}
        onClear={onClear}
        showClearButton={showClearButton}
        showPasswordToggle={showPasswordToggle}
        icon={icon}
        iconPosition={iconPosition}
        describedBy={describedBy}
        size={size}
        variant={variant}
        isDarkMode={isDarkMode}
        disabled={disabled}
        invalid={invalid}
      />

      {/* Helper text */}
      {helperText && !invalid && (
        <HelperText id={`${id}-help`} isDarkMode={isDarkMode}>
          {helperText}
        </HelperText>
      )}

      {/* Error message */}
      {invalid && errorMessage && (
        <ErrorMessage id={`${id}-error`} isDarkMode={isDarkMode}>
          {errorMessage}
        </ErrorMessage>
      )}
    </div>
  )
})

InputField.displayName = "InputField"

export default InputField
export type { InputFieldProps } from "./types"
