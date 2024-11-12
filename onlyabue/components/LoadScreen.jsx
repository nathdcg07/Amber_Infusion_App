import React from 'react';
import { Button, HStack,Heading,Spinner, View,Image,Text, Center, } from 'native-base';
import { ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import backograundo from '../assets/icons/Fondo.jpg'
import logo from '../assets/icons/Logotipo.png'
export const LoadScreen = () => {
  
  return (
    <View flex={1}>
      
          
          <HStack space={2} justifyContent="center">
            <Image source={logo}/>
          <Text fontSize={'24'} fontWeight={'bold'}>AbueApp</Text>
            <Spinner accessibilityLabel="Loading posts" />
            {/* <Heading color="primary.500" fontSize="md">
              Loading
            </Heading> */}
          </HStack>
      
      
    </View>
  )
}
