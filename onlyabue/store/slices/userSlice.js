// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload; // Establece isAuthenticated si hay un token
    },
    clearUser: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

// Asynchronous functions to handle AsyncStorage
export const loadToken = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      dispatch(setUser(token)); // Carga el token desde AsyncStorage
    }
  } catch (error) {
    console.error('Error loading token from AsyncStorage:', error);
  }
};

export const saveToken = (token) => async (dispatch) => {
  try {
    // Verifica si el token es un objeto, conviértelo en string si es necesario
    const tokenString = typeof token === 'string' ? token : JSON.stringify(token);

    // Guarda el token en AsyncStorage y Redux
    await AsyncStorage.setItem('authToken', tokenString);
    dispatch(setUser(tokenString)); // Guarda el token en Redux
  } catch (error) {
    alert('Error al guardar el token en AsyncStorage:', error);
  }
};


export const clearStoredToken = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('authToken');
    dispatch(clearUser()); // Limpia el token en Redux
  } catch (error) {
    console.error('Error clearing token from AsyncStorage:', error);
  }
};
