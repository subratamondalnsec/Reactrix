import InputField from "../InputField/"
interface VariantsDemoProps {
  isDarkMode: boolean
}

export const VariantsDemo = ({ isDarkMode }: VariantsDemoProps) => {
  return (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Variants & States
      </h3>
      
      <InputField
        label="Outlined (Default)"
        placeholder="Default outlined input"
        variant="outlined"
        isDarkMode={isDarkMode}
      />
      
      <InputField
        label="Filled Variant"
        placeholder="Filled background input"
        variant="filled"
        isDarkMode={isDarkMode}
      />
      
      <InputField
        label="Ghost Variant"
        placeholder="Minimal ghost input"
        variant="ghost"
        isDarkMode={isDarkMode}
      />
      
      <InputField
        label="Disabled State"
        placeholder="This input is disabled"
        disabled
        value="Cannot edit this"
        isDarkMode={isDarkMode}
      />
      
      <InputField
        label="Loading State"
        placeholder="Processing..."
        loading
        isDarkMode={isDarkMode}
      />
    </div>
  )
}
