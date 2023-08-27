import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { myAxios } from '../../../myAxios'
import { useQuery } from 'react-query'

const getAllTypes = async () => {
  const { data } = await myAxios.get('/type')
  return data
}

const SelectType = ({ isEditing = false, id, type, setType }) => {
  const [newTypeName, setNewTypeName] = useState('')
  const { data, isLoading, isError, refetch } = useQuery('data', getAllTypes)

  useEffect(() => {
    if (isEditing) {
      myAxios.get(`/products/${id}`)
        .then(({ data }) => {
          setType(data.type || 'Піца')
        })
        .catch(err => console.log(err))
    } else setType('Піца')
  }, [])

  const createType = async () => {
    try {
      await myAxios.post('/type', { name: newTypeName })
      refetch()
    } catch (error) {
      console.log(error)
      alert('Не вдалося створити новий тип')
    }
  }

  const removeType = async () => {
    try {
      await myAxios.delete(`/type/${type}`)
      setType('Піца')
      refetch()
    } catch (error) {
      console.log(error)
      alert('Не вдалося видалити новий тип')
    }
  }

  if (isLoading) return <>Loading...</>
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Тип продукту</InputLabel>
        <Select
          value={type || 'Піца'}
          label={'Тип продукту'}
          onChange={e => setType(e.target.value)}
        >
          {data?.map(type => (
            <MenuItem key={type._id} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type && <>
        <p>Видалити {type}?</p>
        <Button onClick={removeType} disabled={type === 'Піца'} variant='contained' color='error'>Видалити</Button>
      </>}
      <Box>
        <TextField
          onChange={e => setNewTypeName(e.target.value)}
          value={newTypeName}
          label='Створити тип продукту'
          placeholder='Піца, напоЇ, соуси'
        />
        <Button onClick={createType} variant={'contained'}>Створити тип</Button>
      </Box>
    </Box>
  )
}

export default SelectType