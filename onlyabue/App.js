import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductScreen from './components/DetalleMedicamento';
import Constants from "expo-constants";
import { NativeBaseProvider } from 'native-base';
import { RegistroMedicamento } from './components/RegistroMedicamento';
import {RegistroUsuario} from './components/registroUsuario';
export default function App() {
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
