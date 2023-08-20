import React from 'react'
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const PasswordInput = ({ variant, style, value, onChange, label = 'Пароль', error, helperText, register }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      {variant === "outlined" ? (
        <FormControl sx={style} variant="outlined" error={error}>
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            value={value}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      ) : (
        <FormControl sx={style} variant="standard" error={error}>
          <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
          <Input
            value={value}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    </>
  )
}

export default PasswordInput;