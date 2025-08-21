import InputField from "../InputField/"
import type { FormData } from "./types"
import { UserIcon, EmailIcon } from "./icons"

interface FormExamplesProps {
  formData: FormData
  onFormDataChange: (data: FormData) => void
  isDarkMode: boolean
}

export const FormExamples = ({ formData, onFormDataChange, isDarkMode }: FormExamplesProps) => {
  return (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Form Examples
      </h3>
      
      <InputField
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormDataChange({ ...formData, name: e.target.value })}
        icon={<UserIcon />}
        iconPosition="left"
        showClearButton
        onClear={() => onFormDataChange({ ...formData, name: "" })}
        helperText="This will be displayed on your profile"
        isDarkMode={isDarkMode}
      />
      
      <InputField
        label="Email Address"
        placeholder="your@email.com"
        type="email"
        value={formData.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormDataChange({ ...formData, email: e.target.value })}
        icon={<EmailIcon />}
        iconPosition="left"
        invalid={formData.email.length > 0 && !formData.email.includes('@')}
        errorMessage={formData.email.length > 0 && !formData.email.includes('@') ? "Please enter a valid email address" : undefined}
        isDarkMode={isDarkMode}
      />
      
      <InputField
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={formData.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormDataChange({ ...formData, password: e.target.value })}
        showPasswordToggle={true}
        helperText="Must be at least 8 characters long"
        isDarkMode={isDarkMode}
      />
    </div>
  )
}
