// import { configureStore } from '@reduxjs/toolkit'
// import { authReducer } from './slices/auth'

// const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// })

// export default store

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers'

const store = configureStore({
  reducer: rootReducer,
})

export default store