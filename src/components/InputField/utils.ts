import type { InputFieldVariant } from "./types"

export const getVariantClasses = (variant: InputFieldVariant, isDarkMode?: boolean): string => {
  const baseClasses = "shadow-sm focus-within:ring-2 focus-within:shadow-md transition-all duration-200";
  
  if (variant === "filled") {
    return `${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} border border-transparent ${baseClasses} ${isDarkMode ? 'focus-within:bg-gray-700' : 'focus-within:bg-white'} focus-within:border-slate-500 ${isDarkMode ? 'focus-within:ring-blue-400/40' : 'focus-within:ring-blue-500/50'}`;
  }
  
  if (variant === "outlined") {
    return `bg-transparent ${isDarkMode ? 'bg-gray-900' : ''} border ${isDarkMode ? 'border-gray-600' : 'border-slate-300'} ${baseClasses} hover:shadow-md focus-within:bg-transparent ${isDarkMode ? 'focus-within:border-slate-400' : 'focus-within:border-slate-500'} ${isDarkMode ? 'focus-within:ring-blue-400/40' : 'focus-within:ring-blue-500/50'} focus-within:shadow-lg`;
  }
  
  if (variant === "ghost") {
    return `bg-transparent border border-transparent hover:bg-gray-50/60 focus-within:bg-transparent ${isDarkMode ? 'focus-within:bg-gray-800' : ''} ${isDarkMode ? 'focus-within:border-gray-600' : 'focus-within:border-slate-300'} ${isDarkMode ? 'focus-within:ring-blue-400/40' : 'focus-within:ring-blue-500/50'} ${baseClasses}`;
  }
  
  return baseClasses;
}
