import { FormControlLabel, Switch, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { myAxios } from '../../../myAxios'

const SelectPrice = ({ isEditing = false, submitPrices, setSubmitPrices, id }) => {
  const [smallPrice, setSmallPrice] = useState('')
  const [mediumPrice, setMediumPrice] = useState('')
  const [largePrice, setLargePrice] = useState('')
  const [anyPrice, setAnyPrice] = useState('')
  const [checked, setChecked] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isEditing) {
      myAxios.get(`/products/${id}`)
        .then(({ data }) => {
          setSmallPrice(data.prices.find(obj => obj.size === 'small')?.price)
          setMediumPrice(data.prices.find(obj => obj.size === 'medium')?.price)
          setLargePrice(data.prices.find(obj => obj.size === 'large')?.price)
          setAnyPrice(data.prices.find(obj => obj.size === 'any')?.price)
          if(data.prices.find(obj => obj.size === 'any')?.price) setChecked(false)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    } else setIsLoading(false)
  }, [])

  useEffect(() => {
    setSubmitPrices(checked
      ? [
        { size: 'small', price: smallPrice },
        { size: 'medium', price: mediumPrice },
        { size: 'large', price: largePrice },
      ]
      : [{ size: 'any', price: anyPrice }])
  }, [checked, smallPrice, mediumPrice, largePrice, anyPrice])

  if (isLoading) return <>Loading...</>

  return (
      <div>
        <FormControlLabel style={{ userSelect: 'none' }}
          control={
            <Switch
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
            />
          }
          label={"Створити ціни до трьох розмірів"}
        />
        {checked ?
          <>
            <TextField
              variant="standard"
              label='Малий розмір'
              type='number'
              fullWidth
              value={smallPrice}
              onChange={e => setSmallPrice(e.target.value)}
            />
            <TextField
              variant="standard"
              label='Середній розмір'
              type='number'
              fullWidth
              value={mediumPrice}
              onChange={e => setMediumPrice(e.target.value)}
            />
            <TextField
              variant="standard"
              label='Великий розмір'
              type='number'
              fullWidth
              value={largePrice}
              onChange={e => setLargePrice(e.target.value)}
            />
          </>
          :
          <TextField
            variant="standard"
            label="Стандартний розмір"
            type='number'
            fullWidth
            value={anyPrice}
            onChange={e => setAnyPrice(e.target.value)}
          />
        }
      </div>
    )
}

export default SelectPrice