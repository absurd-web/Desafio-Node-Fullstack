import { Input } from '@mui/material'
import { ChangeEvent } from 'react'

interface CustomInputProps {
  id: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
}
const CustomInput: React.FC<CustomInputProps> = ({
  id,
  placeholder,
  value,
  onChange,
  type = 'text',
}) => {
  return (
    <Input
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      size="small"
      sx={(theme) => ({
        color: 'primary.main',
        '& .MuiInputBase-input::placeholder': {
          color: theme.palette.greyBlue.main,
        },
        py: 0.8,
        px: 1,
        width: '100%',
        borderRadius: '4px',
        bgcolor: theme.palette.background.default,
      })}
    />
  )
}

export default CustomInput
