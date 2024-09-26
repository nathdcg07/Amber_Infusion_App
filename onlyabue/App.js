import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RegistroUsuario} from './components/registroUsuario';
import { NativeBaseProvider } from 'native-base';
import Constants from "expo-constants";

export default function App() {
  return (
    <NativeBaseProvider>
    <View flex={1} style={{paddingTop: Constants.statusBarHeight,}}>
      <StatusBar style="auto" />
      <RegistroUsuario/>
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
