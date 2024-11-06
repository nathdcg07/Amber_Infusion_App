import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useDispatch } from 'react-redux';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './AuthScreen';
import RegisterUser from './RegisterUser';
import LoadingScreen from './LoadingScreen';
import { setUser } from '../../store/slices/userSlice';
import * as WebBrowser from 'expo-web-browser';
import { verificarToken } from '../../services/firestoreService';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin'


export default function Index() {
  const [error,setError]= useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    configureGoogleSignIn();
    const checkStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("@token");
        if (storedToken) {
          const tokenExists = await verificarToken(storedToken);
          if (tokenExists) {
            setIsAuthenticated(true);
            router.push('/(tabs)/Home');
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Error al verificar el token almacenado:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkStoredToken();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      handleTokenResponse(response.authentication.accessToken);
    }
  }, [response]);

  const configureGoogleSignIn =()=>{
    GoogleSignin.configure({
      androidClientId: "119258832773-57b097ei5nemlrrbc29mtq0l1mv8e5nu.apps.googleusercontent.com",
    });
  }

  

  const signIn = async () => {
    try {
      // Asegúrate de haber llamado `GoogleSignin.configure()` previamente en tu aplicación
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Extraer el token de autenticación
      const token = userInfo.idToken;

      if (token) {
        setIsLoading(true);

        // Verificar si el token es válido en la base de datos
        const tokenExists = await verificarToken(token);

        if (tokenExists) {
          //Si existe el token en la base de datos lo setea en redux y manda al home
          dispatch(setUser({ token }));
          router.push('/(tabs)/Home');
        } else {
          //si no existe muestra en el registro de usuario
          router.push('/RegisterUser');
        }
      }
    } catch (e) {
      console.error('Error al manejar el inicio de sesión con Google:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar pantalla de carga si la autenticación está en progreso
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View flex={1}>
      {isAuthenticated ? <Redirect href="/(tabs)/Home" /> : <GoogleSigninButton onPress={sigIn}/>}
    </View>
  );
}
