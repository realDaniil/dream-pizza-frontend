import React from 'react'
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const PasswordInput = ({ variant, sx, value, onChange, label = 'Пароль', error, helperText, register }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      {variant === "outlined" ? (
        <FormControl sx={sx} variant="outlined" error={error}>
          <InputLabel color='warning' htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            color='warning'
            value={value}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            {...register}
            id="outlined-adornment-password"
            autoComplete="current-password"
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
        <FormControl sx={sx} variant="standard" error={error}>
          <InputLabel color='warning' htmlFor="standard-adornment-password">{label}</InputLabel>
          <Input
            color='warning'
            value={value}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            {...register}
            id="standard-adornment-password"
            autoComplete="current-password"
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
