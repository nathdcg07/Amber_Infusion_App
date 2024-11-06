import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
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

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const [error,setError]= useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const configureGoogleSignIn =()=>{
    GoogleSignIn.configure({
      webClientId: "119258832773-947r6k9v5aa2b60v2dtr5jvhbun29pjg.apps.googleusercontent.com",
      androidClientId: "119258832773-87933lhfvlkain9vlpruh6nqm98gkspt.apps.googleusercontent.com",
    });
  }

  useEffect(()=>{
    configureGoogleSignIn();
  },[]);

  const sigIn = async () => {
    console.log("boton correcto");
    try{
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.sigIn();
    }
    catch (e){
      setError(e);
    }
  }

  return (
    <View flex={1}>
      <GoogleSigninButton onPress={sigIn}/>
    </View>
  );
}
