import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, NativeBaseProvider } from 'native-base';
import { Stack, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Provider} from 'react-redux';
import store from '../store/store';


function Layout() {

    return (
        <NativeBaseProvider>
            <View flex={1} style={{ paddingTop: Constants.statusBarHeight }}>
                <Stack screenOptions={{ headerShown: false }} />
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
