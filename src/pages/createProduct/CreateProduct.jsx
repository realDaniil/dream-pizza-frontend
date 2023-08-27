import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { myAxios } from '../../myAxios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateProductSkeleton from './CreateProductSkeleton';
import ProductCard from '../../components/products/productCard/ProductCard'
import SelectType from '../../components/products/productCreationElements/SelectType';
import SelectPrice from '../../components/products/productCreationElements/SelectPrice';

const CreateProduct = () => {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [type, setType] = useState()
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [submitPrices, setSubmitPrices] = useState([])

  const inputFileRef = useRef(null)

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
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    } else setIsLoading(false)
  }, [id])

  const onSubmit = async () => {
    try {
      const fields = {
        name: name,
        ingredients: ingredients.split(','),
        type: type,
        prices: submitPrices,
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
      {imageUrl &&
        <ProductCard previewMode imageUrl={imageUrl} type={type} name={name} prices={submitPrices} ingredients={ingredients.split(',')} />
      }
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      {imageUrl}
      <Button variant="contained" disabled={!imageUrl} color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
      <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
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
      <SelectType isEditing={isEditing} id={id} setType={setType} type={type} />
      <SelectPrice isEditing={isEditing} id={id} submitPrices={submitPrices} setSubmitPrices={setSubmitPrices} />
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