// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import myAxios from '../../myAxios'

// export const authReducer = createAsyncThunk('auth/authReducer', async () => {
//   const { data } = await myAxios.get('/auth/me')
//   return data
// })

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: {
//     [authReducer.pending]: (state) => {
//       state.loading = true
//     },
//     [authReducer.fulfilled]: (state, action) => {
//       state.loading = false
//       state.user = action.payload
//     },
//     [authReducer.rejected]: (state, action) => {
//       state.loading = false
//       state.error = action.error.message
//     }
//   },
// })

// export const selectIsAuth = (state) => state








// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import myAxios from '../../myAxios'

// export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
//   const { data } = await myAxios.post('/auth/login', params)
//   return data
// })

// export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
//   const { data } = await myAxios.post('/auth/registration', params)
//   return data
// })

// export const fetchLoginMe = createAsyncThunk('auth/fetchLoginMe', async () => {
//   const { data } = await myAxios.get('/auth/me')
//   return data
// })

// const initialState = {
//   data: null,
//   status: 'loading',
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.data = null
//     },
//   },
//   extraReducers: {
//     [fetchLogin.pending]: (state) => {
//       state.status = 'loading'
//       state.data = null
//     },
//     [fetchLogin.fulfilled]: (state, action) => {
//       state.status = 'loaded'
//       state.data = action.payload
//     },
//     [fetchLogin.rejected]: (state) => {
//       state.status = 'error'
//       state.data = null
//     },
//     [fetchLoginMe.pending]: (state) => {
//       state.status = 'loading'
//       state.data = null
//     },
//     [fetchLoginMe.fulfilled]: (state, action) => {
//       state.status = 'loaded'
//       state.data = action.payload
//     },
//     [fetchLoginMe.rejected]: (state) => {
//       state.status = 'error'
//       state.data = null
//     },
//     [fetchRegistration.pending]: (state) => {
//       state.status = 'loading'
//       state.data = null
//     },
//     [fetchRegistration.fulfilled]: (state, action) => {
//       state.status = 'loaded'
//       state.data = action.payload
//     },
//     [fetchRegistration.rejected]: (state) => {
//       state.status = 'error'
//       state.data = null
//     },
//   },
// })

// export const selectIsAuth = (state) => Boolean(state.auth.data)

// export const authReducer = authSlice.reducer

// export const { logout } = authSlice.actions