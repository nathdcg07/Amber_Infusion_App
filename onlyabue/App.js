import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import Constants from "expo-constants";

import { RegistroUsuario} from './components/registroUsuario';

import initializeCollections from './services/initFirestore';

export default function App() {
  
  useEffect(() => {
    const init = async () => {
      try {
        await initializeCollections();
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, []);

  return (
    <NativeBaseProvider>
      <View flex={1} style={{paddingTop: Constants.statusBarHeight,}}>
      <StatusBar style='default' />
     {/* <RegistroUsuario/> */}
      {/* <RegistroMedicamento/> */}
      <ProductScreen/>
    </View>
    </NativeBaseProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
