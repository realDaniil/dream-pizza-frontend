// import { configureStore } from '@reduxjs/toolkit'
// import { authReducer } from './slices/auth'

// const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// })

// export default store

// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/reducers'

// const store = configureStore({
//   reducer: rootReducer,
// })

// export default store

// store.js
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import basketSlice, { restoreBasket } from './slices/basketSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    basket: basketSlice,
  },
})

store.dispatch(restoreBasket()) // Восстановление данных из localStorage

export default store;
