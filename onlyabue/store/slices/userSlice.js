// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name: null, // Nuevo campo para almacenar el nombre del usuario
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload; // Almacena el nombre en el estado de Redux
    },
    clearUser: (state) => {
      state.token = null;
      state.name = null; // Limpia también el nombre
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setName, clearUser } = userSlice.actions;
export default userSlice.reducer;


export const saveToken = (token) => async (dispatch) => {
  try {
    const tokenString = typeof token === 'string' ? token : JSON.stringify(token);
    await AsyncStorage.setItem('authToken', tokenString);
    dispatch(setUser(tokenString));
  } catch (error) {
    alert('Error al guardar el token en AsyncStorage:', error);
  }
};

// Nueva función para guardar el nombre
export const saveName = (name) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('userName', name); // Guarda el nombre en AsyncStorage
    dispatch(setName(name)); // Actualiza Redux con el nombre
  } catch (error) {
    console.error('Error al guardar el nombre en AsyncStorage:', error);
  }
};



export const clearStoredToken = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userName'); // Limpia también el nombre
    dispatch(clearUser());
  } catch (error) {
    console.error('Error clearing token and name from AsyncStorage:', error);
  }
};
