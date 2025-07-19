import React from 'react';
import { Button, HStack,Heading,Spinner, View,Image,Text, Center, VStack, } from 'native-base';
import { ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import backograundo from '../assets/icons/fondoLoading.png'
import logo from '../assets/icons/Logotipo.png'
import styles from '../Styles/GlobalStyles';

const { width,height } = Dimensions.get('window');
export const LoadScreen = () => {
  
  return (
    <View flex={1}>
      <ImageBackground  source={backograundo}
      style={styles.backgroundImage}>
        <Center>
            <Image alignItems={'center'} top={-height*0.15} source={logo}/>            
        </Center>
        <HStack space={3} justifyContent="center">
              <VStack top={-height*0.10} space={3}>
              <Text alignSelf={'center'} color={'white'}   fontSize={'30'} fontWeight={'bold'}>AbueApp</Text>
                  <Spinner size={'lg'} color={'white'} accessibilityLabel="Loading posts" />
                  { <Heading color="white" fontSize="2xl">
                    Loading
                  </Heading>}
              </VStack>
              
        </HStack>
      
      </ImageBackground>
          
          
      
    </View>
  )
}
