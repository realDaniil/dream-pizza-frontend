import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import myAxios from '../myAxios'
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ElementDeleteModal({ password, passwordMode = true, visible, onClose, id, title, body, deleteRoute }) {
  const [open, setOpen] = useState(visible);
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    setOpen(visible)
  }, [visible])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const handleDelete = async () => {
    try {
      await myAxios.delete(`/${deleteRoute}/${id}`)
      handleClose()
    } catch (error) {
      console.log(error)
      alert('Не вдалося віддалити цей елемент')
    }
  }

  return (
    <div>
      <Dialog TransitionComponent={Transition} open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {body} {passwordMode && <b>{password}</b>}
          </DialogContentText>
          {passwordMode && <TextField
            autoFocus
            fullWidth
            variant="standard"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
          />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Назад</Button>
          {passwordMode ? <Button onClick={handleDelete} color="error" disabled={password !== inputValue}>
            Видалити
          </Button>
            :
            <Button onClick={handleDelete} color="error">
              Видалити
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
