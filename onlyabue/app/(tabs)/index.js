import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { View } from 'native-base';
import { AlarmHome } from '../../components/alarmHome';



export default function Index(){
    return (
      
        <View flex={1}>
          <AlarmHome/>
          </View>
        
      );
}