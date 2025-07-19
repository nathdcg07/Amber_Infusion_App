import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
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
import * as AuthSession from 'expo-auth-session';
import CryptoJS from 'crypto-js'
import { saveToken,saveName } from '../../store/slices/userSlice';
import { obtenerDocumentoPorToken } from '../../services/firestoreService';
import { solicitarPermisosNotificaciones,initializeNotifications } from '../../services/NotificationsScripts';
import { requestWritePermission } from '../../services/frontServices';

WebBrowser.maybeCompleteAuthSession();
initializeNotifications();

export default function Index() {
 const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "119258832773-57b097ei5nemlrrbc29mtq0l1mv8e5nu.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      scheme: "com.onlyabue.app",
    }),
    scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
  });

  useEffect(() => {
    requestWritePermission();
    solicitarPermisosNotificaciones();
    const checkStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          setIsAuthenticated(true);
        } 
        else {
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

  const handleTokenResponse = async (token) => {
    if (!token) return;
    try {
      setIsLoading(true);
  
     
      const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userInfo = await userInfoResponse.json();
  
      
      const userEmail = userInfo.email;
      const hashedEmail = CryptoJS.SHA256(userEmail).toString(CryptoJS.enc.Hex);


      const tokenExists = await verificarToken(hashedEmail);
  
      if (tokenExists) {

        const userDocumentId = await obtenerDocumentoPorToken(hashedEmail);
        dispatch(saveName(userDocumentId));
        dispatch(saveToken(hashedEmail));
        setIsAuthenticated(true);
        router.push('/(tabs)/Home');
      } else {
        router.push({
          pathname: '/RegisterUser', 
          params: { Token: hashedEmail }  
        });
      }
    } catch (e) {
      console.log("Error al manejar el token:", e);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View flex={1}>
      {isAuthenticated ? <Redirect href="/(tabs)/Home" /> : <AuthScreen onSignIn={() => promptAsync()} />}
    </View>
  );
}