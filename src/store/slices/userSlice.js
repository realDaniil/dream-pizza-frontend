// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import myAxios from '../../myAxios';

// export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
//   const { data } = await myAxios.get('/auth/me');
//   return data;
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.data = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setUser } = userSlice.actions;

// export default userSlice.reducer;
