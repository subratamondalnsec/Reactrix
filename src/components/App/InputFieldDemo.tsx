import type { FormData, SizesDemoData } from "./types"
import { SizesDemo } from "./SizesDemo"
import { FormExamples } from "./FormExamples"
import { VariantsDemo } from "./VariantsDemo"
import { ResetButton } from "./ResetButton"

interface InputFieldDemoProps {
  formData: FormData
  onFormDataChange: (data: FormData) => void
  sizesDemoData: SizesDemoData
  onSizesDemoChange: (data: SizesDemoData) => void
  isResetting: boolean
  onReset: () => void
  isDarkMode: boolean
}

export const InputFieldDemo = ({
  formData,
  onFormDataChange,
  sizesDemoData,
  onSizesDemoChange,
  isResetting,
  onReset,
  isDarkMode
}: InputFieldDemoProps) => {
  return (
    <div className="mb-16">
      <div className={`rounded-xl shadow-lg p-8 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          InputField Component Demo
        </h2>
        
        <SizesDemo
          sizesDemoData={sizesDemoData}
          onSizesDemoChange={onSizesDemoChange}
          isDarkMode={isDarkMode}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <FormExamples
            formData={formData}
            onFormDataChange={onFormDataChange}
            isDarkMode={isDarkMode}
          />

          <VariantsDemo isDarkMode={isDarkMode} />
        </div>

        <ResetButton
          isResetting={isResetting}
          onReset={onReset}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  )
}
