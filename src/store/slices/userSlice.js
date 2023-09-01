import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { myAxios } from '../../myAxios' 

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    if (localStorage.getItem('token') !== null) {
      const { data } = await myAxios.get('/auth/me')
      return data;
    }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload 
    },
    userLogout: (state) => {
      localStorage.removeItem('token') 
      state.user = null 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true 
        state.error = null 
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false 
        state.user = action.payload 
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false 
        state.error = action.payload 
      }) 
  }
}) 

export const { setUser, userLogout } = userSlice.actions

export default userSlice.reducer