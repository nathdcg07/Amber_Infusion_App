import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { View } from 'native-base';
import { AlarmHome } from '../../components/alarmHome';
import React, { useEffect } from 'react';
import initializeCollections from '../../services/initFirestore';


export default function Index() {

    return (
        <View flex={1}>
          <AlarmHome/>
          </View>     
      );
}