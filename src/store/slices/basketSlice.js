import { createSlice } from '@reduxjs/toolkit'

const saveBasketToLocalStorage = (basket) => {
  localStorage.setItem('basket', JSON.stringify(basket))
}

const getBasketFromLocalStorage = () => {
  const savedBasket = localStorage.getItem('basket')
  return savedBasket ? JSON.parse(savedBasket) : null
}

const initialState = {
  items: [],
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.itemId === action.payload.itemId)
      if (existingItem) {
        existingItem.totalCount += 1
      } else {
        state.items.push({ ...action.payload, totalCount: 1 })
      }
      saveBasketToLocalStorage(state.items)
    },
    decreaseItem: (state, action) => {
      const existingItem = state.items.find(item => item.itemId === action.payload.itemId)
      if (existingItem && existingItem.totalCount > 0) {
        existingItem.totalCount -= 1
        saveBasketToLocalStorage(state.items)
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.itemId !== action.payload)
      saveBasketToLocalStorage(state.items)
    },
    removeTotalCount: (state, action) => {
      const existingItem = state.items.find(item => item.itemId === action.payload.itemId)
      if (existingItem) {
        existingItem.totalCount = 0
      }
      saveBasketToLocalStorage(state.items)
    },
    restoreBasket: state => {
      const savedBasket = getBasketFromLocalStorage()
      if (savedBasket) {
        state.items = savedBasket
      }
    }
  }
})

export const { addItem, removeItem, decreaseItem, restoreBasket, removeTotalCount } = basketSlice.actions

export default basketSlice.reducer