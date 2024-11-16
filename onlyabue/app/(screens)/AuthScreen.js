import React, { useEffect } from 'react';
import {  ImageBackground, Dimensions  } from 'react-native';
import { useRouter } from 'expo-router';
import { HStack, View,Image,Text, Center, VStack,Button } from 'native-base';
import backograundo from '../../assets/icons/fondoLoading.png';
import logo from '../../assets/icons/Logotipo.png'
import styles from '../../Styles/GlobalStyles';
const { width,height } = Dimensions.get('window');
export default function AuthScreen({ onSignIn }) {
  const router = useRouter();

  useEffect(() => {
    const params = router.params;
  }, [router.params]);

  return (
    <View flex={1} >
      <ImageBackground  source={backograundo}
      style={styles.backgroundImage}>
        <Center>
            <Image alignItems={'center'} top={-height*0.15} source={logo}/>            
        </Center>
        <HStack space={3} justifyContent="center">
              <VStack top={-height*0.10} space={4}>
              <Text fontSize={30} fontWeight={'bold'} color={'white'} alignSelf={'center'}>OnlyAbue App</Text>
              {/* <Text>Bienvenido. Por favor, inicia sesión</Text> */}
              <Button style={styles.button} shadow={6} onPress={onSignIn} >
                <Text fontSize={20} fontWeight={'bold'} color={'white'}>
                  Iniciar sesión con Google
                </Text>
              </Button>
              </VStack>
              
        </HStack>
      
      </ImageBackground>
          
          
      
    </View>
    
  );
}
