import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Stack, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Provider, useDispatch } from 'react-redux';
import store from '../store/store';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './(screens)/AuthScreen';
import RegisterUser from './(screens)/RegisterUser'; // Asegúrate de importar correctamente
import { setUser } from '../store/slices/userSlice';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

async function CheckTokenFirebase(token) {
    if(token){
        return false;
    }
    else{
        return true;
    }
};

function Layout() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [token, setToken] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "119258832773-87933lhfvlkain9vlpruh6nqm98gkspt.apps.googleusercontent.com",
        redirectUri: "com.onlyabue:/oauthredirect",
    });

    // Verificar si hay un token almacenado en AsyncStorage al iniciar la app
    useEffect(() => {
        const checkStoredToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("@token");
                if (storedToken) {
                    dispatch(setUser({ token: storedToken }));
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log("Error al verificar el token almacenado:", error);
                setIsAuthenticated(false);
            }
        };
        checkStoredToken();
    }, []);

    // Manejar la respuesta de Google 
    useEffect(() => {
        if (response?.type === "success") {
            handleTokenResponse(response.authentication.accessToken);
        }
    }, [response]);

    const handleTokenResponse = async (token) => {
        if (!token) return;
        try {
            await AsyncStorage.setItem("@token", token);
            const tokenExists = await CheckTokenFirebase(token);
            if (tokenExists) {
                dispatch(setUser({ token }));
                setIsAuthenticated(true);
            } else {
                setToken(token);
                setIsAuthenticated(false);
            }
        } catch (e) {
            console.log("Error al manejar el token:", e);
        }
    };

    return (
        <NativeBaseProvider>
            <View flex={1} style={{ paddingTop: Constants.statusBarHeight }}>
                {isAuthenticated === null ? null : isAuthenticated ? (
                    <Stack screenOptions={{ headerShown: false }} />
                ) : (
                  <AuthScreen onSignIn={() => promptAsync()} />
                )}
            </View>
        </NativeBaseProvider>
    );
}

export default function AppLayout() {
    return (
        <Provider store={store}>
            <Layout />
        </Provider>
    );
}
