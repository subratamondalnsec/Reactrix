import React, { forwardRef, useState } from "react"
import type { BaseInputFieldProps, InputFieldSize, InputFieldVariant } from "./types"
import { sizeClasses } from "./types"
import { getVariantClasses } from "./utils"
import { EyeIcon, EyeOffIcon, LoadingSpinner } from "./icons"
import { ClearButton } from "./ClearButton"

interface InputBoxProps extends BaseInputFieldProps {
  id: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  loading?: boolean
  onClear?: () => void
  showClearButton?: boolean
  showPasswordToggle?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  describedBy?: string
  size: InputFieldSize
  variant: InputFieldVariant
}

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  loading = false,
  onClear,
  showClearButton = false,
  showPasswordToggle,
  icon,
  iconPosition = "left",
  describedBy,
  size,
  variant,
  isDarkMode = false,
  disabled,
  invalid,
}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  
  const showPasswordToggleButton = showPasswordToggle ?? (type === "password")
  
  // Handle password toggle - fix the logic
  const effectiveType = showPasswordToggleButton && type === "password" 
    ? (isPasswordVisible ? "text" : "password") 
    : type
  const showClearBtn = showClearButton && onClear && value && !disabled && !loading
  const sizeConfig = sizeClasses[size]

  // Calculate padding based on icons and buttons
  const hasLeftIcon = icon && iconPosition === "left"
  const hasRightContent = showClearBtn || showPasswordToggleButton || loading || (icon && iconPosition === "right")
  
  const inputPaddingLeft = hasLeftIcon ? sizeConfig.padding.left : ""
  const inputPaddingRight = hasRightContent ? sizeConfig.padding.right : ""

  return (
    <div className={`
      relative flex items-center rounded-lg 
      ${getVariantClasses(variant, isDarkMode)} 
      ${sizeConfig.container} 
      ${disabled ? `opacity-75 cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-200'}` : ""} 
      ${invalid ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/50" : ""}
    `}>
      {/* Left Icon */}
      {hasLeftIcon && (
        <div className={`absolute left-3 flex items-center ${sizeConfig.icon} ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {icon}
        </div>
      )}

      <input
        id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={effectiveType}
        disabled={disabled || loading}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={`
          flex-1 bg-transparent outline-none
          ${sizeConfig.text}
          ${inputPaddingLeft} ${inputPaddingRight}
          ${isDarkMode ? 'placeholder:text-slate-400' : 'placeholder:text-slate-500'}
          ${isDarkMode ? 'text-slate-100' : 'text-black'}
          ${isDarkMode ? 'caret-slate-100' : 'caret-black'}
          ${disabled ? `cursor-not-allowed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}` : ""}
        `}
      />

      {/* Right side content */}
      <div className="absolute right-3 flex items-center gap-1">
        {/* Right Icon (non-interactive) */}
        {icon && iconPosition === "right" && !showClearBtn && !showPasswordToggleButton && !loading && (
          <div className={`${sizeConfig.icon} ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {icon}
          </div>
        )}

        {/* Clear button */}
        {showClearBtn && onClear && (
          <ClearButton onClear={onClear} size={size} isDarkMode={isDarkMode} />
        )}

        {/* Password toggle */}
        {showPasswordToggleButton && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(s => !s)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className={`
              ${sizeConfig.icon} p-0.5 rounded-md
              ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}
              ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-slate-100'}
              transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50
            `}
          >
            {isPasswordVisible ? <EyeOffIcon className="w-full h-full" /> : <EyeIcon className="w-full h-full" />}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className={`${sizeConfig.icon} text-blue-500`} aria-label="Loading">
            <LoadingSpinner className="w-full h-full" />
          </div>
        )}
      </div>
    </div>
  )
})

InputBox.displayName = "InputBox"
