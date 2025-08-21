import InputField from "../InputField/"
import type { SizesDemoData } from "./types"

interface SizesDemoProps {
  sizesDemoData: SizesDemoData
  onSizesDemoChange: (data: SizesDemoData) => void
  isDarkMode: boolean
}

export const SizesDemo = ({ sizesDemoData, onSizesDemoChange, isDarkMode }: SizesDemoProps) => {
  return (
    <div className="mb-12">
      <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        ✅ All Sizes Demo - Small, Medium, Large with Clear Buttons
      </h3>
      <div className="space-y-6 max-w-md">
        <InputField
          label="Small Size (sm)"
          placeholder="Small input..."
          size="sm"
          value={sizesDemoData.sm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSizesDemoChange({ ...sizesDemoData, sm: e.target.value })}
          showClearButton
          onClear={() => onSizesDemoChange({ ...sizesDemoData, sm: "" })}
          helperText="Small size input field (h-9, text-sm)"
          isDarkMode={isDarkMode}
        />
        <InputField
          label="Medium Size (md) - Default"
          placeholder="Medium input..."
          size="md"
          value={sizesDemoData.md}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSizesDemoChange({ ...sizesDemoData, md: e.target.value })}
          showClearButton
          onClear={() => onSizesDemoChange({ ...sizesDemoData, md: "" })}
          helperText="Medium size input field (h-10, text-base) - Default"
          isDarkMode={isDarkMode}
        />
        <InputField
          label="Large Size (lg)"
          placeholder="Large input..."
          size="lg"
          value={sizesDemoData.lg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSizesDemoChange({ ...sizesDemoData, lg: e.target.value })}
          showClearButton
          onClear={() => onSizesDemoChange({ ...sizesDemoData, lg: "" })}
          helperText="Large size input field (h-12, text-lg)"
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  )
}
