import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import myAxios from '../../myAxios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateProductSkeleton from './CreateProductSkeleton';
import { FormControlLabel, Switch } from '@mui/material';

const CreateProduct = () => {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [type, setType] = useState('pizza')
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [smallPrice, setSmallPrice] = useState()
  const [mediumPrice, setMediumPrice] = useState()
  const [largePrice, setLargePrice] = useState()
  const [anyPrice, setAnyPrice] = useState()
  const [checked, setChecked] = useState(true)

  const inputFileRef = useRef(null)


  const handleSwitchChange = (e) => {
    setChecked(e.target.checked)
  }

  const handleChangeFile = async e => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await myAxios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error)
      alert('Помилка під час завантаження зображення')
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  useEffect(() => {
    if (isEditing) {
      myAxios.get(`/products/${id}`)
        .then(({ data }) => {
          setName(data.name || '')
          setType(data.type || '')
          setIngredients(data.ingredients ? data.ingredients.join(', ') : '')
          setImageUrl(data.imageUrl || '')
          setSmallPrice(data.prices.find(obj => obj.size === 'small')?.price)
          setMediumPrice(data.prices.find(obj => obj.size === 'medium')?.price)
          setLargePrice(data.prices.find(obj => obj.size === 'large')?.price)
          setAnyPrice(data.prices.find(obj => obj.size === 'any')?.price)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [id])

  const onSubmit = async () => {
    try {
      const fields = {
        name: name,
        ingredients: ingredients.split(','),
        type: type,
        prices: checked
          ? [
            { size: 'small', price: smallPrice },
            { size: 'medium', price: mediumPrice },
            { size: 'large', price: largePrice },
          ]
          : [{ size: 'any', price: anyPrice }],
        imageUrl
      }

      isEditing
        ? await myAxios.patch(`/products/${id}`, fields)
        : await myAxios.post('/products', fields)
      navigate('/')
    } catch (error) {
      console.log(error)
      alert(`Помилка при ${isEditing ? 'редагуванні' : 'створенні'} продукту`)
    }
  }

  if (isLoading) return <CreateProductSkeleton />


  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input  type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
      {imageUrl &&
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img height={100} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      }
      <br />
      <br />
      <TextField
        variant="standard"
        label="Назва продукту"
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        variant="standard"
        label="Інгредієнти"
        fullWidth
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
      />
      <TextField
        variant="standard"
        label="Тип товару"
        fullWidth
        value={type}
        onChange={e => setType(e.target.value)}
      />

      <FormControlLabel style={{ userSelect: 'none' }}
        control={
          <Switch
            checked={checked}
            onChange={handleSwitchChange}
          />
        }
        label={checked ? "Створити ціни до трьох розмірів" : 'Створити ціну для одного розміру'}
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
      <div>
        <Button onClick={onSubmit} size="large" variant="contained">
          {!isEditing ? 'Створити' : 'Відредагувати'}
        </Button>
        <Button onClick={() => navigate('/')} size="large">Відміна</Button>
      </div>
    </Paper>
  )
}

export default CreateProduct