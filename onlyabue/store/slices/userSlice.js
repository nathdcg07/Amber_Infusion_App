// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token; // Establece isAuthenticated si hay un token
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
