import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductScreen from './components/DetalleMedicamento';
import Constants from "expo-constants";
import { RegistroMedicamento } from './components/RegistroMedicamento';
export default function App() {
  return (
    <View flex={1} style={{paddingTop: Constants.statusBarHeight,}}>
      <StatusBar style='default' />
     
      <RegistroMedicamento/>
    </View>
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
