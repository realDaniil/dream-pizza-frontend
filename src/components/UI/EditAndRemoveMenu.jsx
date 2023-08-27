import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const EditAndRemoveMenu = ({ id, setIsModalActive, editRoute }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleEditBtn = () => {
    setAnchorEl(null)
    navigate(editRoute + '/' + id)
  }

  const handleDeleteBtn = () => {
    setAnchorEl(null)
    setIsModalActive(true)
  }

  return (
    <div>
      <IconButton
        size="large"
        onClick={handleMenu}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleEditBtn}>
          <CreateIcon htmlColor="#1557d4" /> Редагувати
        </MenuItem>
        <MenuItem onClick={handleDeleteBtn}>
          <DeleteIcon htmlColor="#d41515" /> Видалити
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EditAndRemoveMenu;
