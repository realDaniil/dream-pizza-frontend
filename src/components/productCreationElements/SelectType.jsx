import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { myAxios } from '../../myAxios'

const SelectType = ({ type, setType }) => {
  const [allTypes, setAllTypes] = useState([])

  useEffect(() => {
    const getAllTypes = async () => {
      try {
        const { data } = await myAxios.get('/type')
        setAllTypes(data)
        setType(data[0].name || 'Піца')
      } catch (error) {
        console.log(error)
      } finally {
        if (allTypes.length === 0) setType('Піца')
      }
    }
    getAllTypes()
  }, [])

  return (
    <FormControl sx={{ my: 6 }} fullWidth>
      <InputLabel>Тип продукту</InputLabel>
      <Select
        value={type || 'Піца'}
        label={'Тип продукту'}
        onChange={e => setType(e.target.value)}
      >
        {allTypes.length !== 0 ? allTypes.map(type => (
          <MenuItem key={type._id} value={type.name}>
            {type.name}
          </MenuItem>
        ))
          : <MenuItem value={'Піца'}>
            {'Піца'}
          </MenuItem>
        }
      </Select>
    </FormControl>
  )
}

export default SelectType