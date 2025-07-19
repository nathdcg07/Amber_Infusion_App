import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { View } from 'native-base';
import { AlarmHome } from '../../components/alarmHome';
import * as Notifications from 'expo-notifications';

export default function Home() {
   
    return (
        <View flex={1}>
          <AlarmHome/>
        </View>     
    );
}