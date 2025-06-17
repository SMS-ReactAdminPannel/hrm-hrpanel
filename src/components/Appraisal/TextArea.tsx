import React, { useCallback } from "react"

interface TextAreaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  id: string
}

const TextArea = React.memo<TextAreaProps>(({ value, onChange, placeholder, rows = 3, id }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange],
  )

  return (
    <textarea
      id={id}
      value={value}
      onChange={handleChange}
      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#006666] focus:border-[#006666]"
      rows={rows}
      placeholder={placeholder}
    />
  )
})

TextArea.displayName = "TextArea"

export default TextArea
