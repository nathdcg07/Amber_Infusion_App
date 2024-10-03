import { View, Text } from 'react-native';
import React from 'react';
import { Stack, Slot } from "expo-router";
import Constants from "expo-constants";
import { NativeBaseProvider } from 'native-base';

export default function Layout(){
    return(
        
        <NativeBaseProvider flex={1}>
            <View flex={1} style={{paddingTop: Constants.statusBarHeight,}}>
                <Stack screenOptions={{headerShown:false}} />
            </View>
            
        </NativeBaseProvider>
        
    )
}
