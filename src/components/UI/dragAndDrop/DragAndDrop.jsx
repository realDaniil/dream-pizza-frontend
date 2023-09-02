import React, { useState } from 'react'
import cl from './DragAndDrop.module.scss'
import { myAxios } from '../../../myAxios'

const DragAndDrop = ({ setImageUrl }) => {
  const [drag, setDrag] = useState(false)

  const dragStartHandler = e => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = e => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = async e => {
    try {
      e.preventDefault()
      const formData = new FormData()
      let file = [...e.dataTransfer.files][0]
      formData.append('image', file)
      const { data } = await myAxios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error)
      alert('Помилка під час завантаження зображення')
    }
  }
  if (/Mobi/.test(navigator.userAgent)) {
    return null
  }
  return (
    <div className={cl.dragAndDrop}>
      {drag
        ?
        <div
          className={cl.dropArea}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => onDropHandler(e)}
        >Відпустіть зображення, щоб завантажити його</div>
        :
        <div
          className={cl.area}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
        >Перетягніть зображення, щоб завантажити його</div>
      }
    </div>
  )
}

export default DragAndDrop