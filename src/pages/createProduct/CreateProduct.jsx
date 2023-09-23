import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { myAxios } from '../../myAxios';
import { useNavigate, useParams } from 'react-router-dom';
import CreateProductSkeleton from './CreateProductSkeleton';
import SelectType from '../../components/products/productCreationElements/SelectType';
import SelectPrice from '../../components/products/productCreationElements/SelectPrice';
import cl from './CreateProduct.module.scss'
import DragAndDrop from '../../components/UI/dragAndDrop/DragAndDrop';
import { Card, FormControlLabel, Switch } from '@mui/material';
import MyImage from '../../components/UI/MyImage';
import MyLoader from '../../components/UI/MyLoader';

const CreateProduct = () => {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [type, setType] = useState()
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [checked, setChecked] = useState(false)

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
          setChecked(data?.isTopSales || false)
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
        isTopSales: checked,
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

  if (isLoading) return <MyLoader />

  return (
    <Paper className={cl.paper}>
      <div className={cl.cardHolder}>
        {imageUrl ?
          <Card className={cl.imgCard}>
            <MyImage src={imageUrl} />
          </Card>
          : <DragAndDrop setImageUrl={setImageUrl} />
        }
        <Button color={'warning'} disabled={imageUrl.length !== 0} onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
          Загрузить превью
        </Button>
        <Button variant="contained" disabled={imageUrl.length === 0} color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
      </div>
      <TextField
        color={'warning'}
        variant="standard"
        label="Назва продукту"
        className={cl.textField}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        color={'warning'}
        variant="standard"
        label="Інгредієнти"
        className={cl.textField}
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
      />
      <FormControlLabel sx={{ userSelect: 'none', mt: '16px' }}
        control={
          <Switch
            color={'warning'}
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          />
        }
        label={"В топ продажів"}
      />
      <SelectType isEditing={isEditing} id={id} setType={setType} type={type} />
      <SelectPrice isEditing={isEditing} id={id} submitPrices={submitPrices} setSubmitPrices={setSubmitPrices} />
      <div>
        <Button color={'warning'} onClick={onSubmit} size="large" variant="contained">
          {!isEditing ? 'Створити' : 'Відредагувати'}
        </Button>
        <Button color={'warning'} onClick={() => navigate('/')} size="large">Відміна</Button>
      </div>
    </Paper>
  )
}

export default CreateProduct