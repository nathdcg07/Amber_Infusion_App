import React, { useEffect, useState } from 'react';
import { Box, HStack, Text, View, VStack } from 'native-base';
import { StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import styles from "../Styles/GlobalStyles";
import { Navigator, useLocalSearchParams, useRouter } from 'expo-router';
import placeholdo from "../assets/icons/Image-placeholder.png";
import Ionicons from '@expo/vector-icons/Ionicons';
import CuadroInf from './InfAdicional';

export const ProductScreen = () => {
  const router = useRouter();
  const { ImgUrl, MedicamentoRes } = useLocalSearchParams();  
  
  let medObj = {};
  try {
    medObj = MedicamentoRes ? JSON.parse(decodeURIComponent(MedicamentoRes)) : {};
  } catch (error) {
    console.error('Error parsing MedicamentoRes:', error);
  }

  const [Tamanio, setTamanio] = useState("");
  
  useEffect(() => {
    if (medObj) {
      setTamanio(medObj.Tamanio + medObj.Unidad);
    }
  }, [medObj]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HStack justifyContent={'space-between'} marginTop={4} marginBottom={5} px={4} space={3}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={50} color="black" style={styles.BackIconButton} />
        </Pressable>
        <Text flex={1} fontSize={28} fontWeight={'bold'} textAlign={'center'} left={-20}>Detalles</Text>
      </HStack>
      <View>
        <Box alignItems={'center'}>
          <Image borderRadius={10} width={200} height={180} source={{ uri: ImgUrl }} />
        </Box>
        <VStack marginBottom={2} space={2}>
          <Text textAlign={'center'} fontSize={24} fontWeight={'bold'} color={'#0D94B9'}>
            {medObj?.NombreComercial ?? 'Nombre no disponible'}
          </Text>
          <Text textAlign={'center'} fontSize={20} color={'gray.500'}>
            {medObj?.NombreGenerico ?? 'Nombre genérico no disponible'}
          </Text>
        </VStack>
        <View>
          <Text fontWeight={'bold'} fontSize={22}>Presentación:</Text>
          <View backgroundColor={'#0D94B9'} borderRadius={15}>
            <Text margin={2} alignSelf={'center'} color={'white'} fontWeight={'bold'} fontSize={'22'} 
            >{medObj.Presentacion}</Text>
          </View>
          
          
        </View>
        <View>
          <Text fontWeight={'bold'} fontSize={22}>Tamaño:</Text>
          <View backgroundColor={'#0D94B9'} borderRadius={15}>
            <Text margin={2} alignSelf={'center'} color={'white'} fontWeight={'bold'} fontSize={'22'} 
            >{Tamanio}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
