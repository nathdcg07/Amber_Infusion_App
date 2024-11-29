import React, { useState } from 'react';
import {  Box, HStack, Text, View, VStack } from 'native-base';
import {  StyleSheet,StatusBar,  Image, TouchableOpacity, ScrollView, Pressable, } from 'react-native';
import styles from "../Styles/GlobalStyles";
import { Navigator,useRouter } from 'expo-router';
import placeholdo from "../assets/icons/Image-placeholder.png"
import Ionicons from '@expo/vector-icons/Ionicons';
import CuadroInf from './InfAdicional';


export const ProductScreen = () => {
  const router = useRouter();
  const [NombComercial,setNombComercial ] = useState('paracetamol');
  const [NombGenerico,setNombGenerico] = useState('acetaminofen');
  const [Presentacion, setPresentacion] = useState('comprimido');
  const [Descipcion,setDescripcion] = useState('texto texto largo xd');
  const [EfectosSecundarios, setEfectosSecundarios] = useState(["muerte1","muerte2","modrido"]);
  const [Precauciones,setPrecauciones] = useState('evitar exeder dosis recomendada');
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <HStack justifyContent={'space-between'} marginTop={4} marginBottom={5} px={4} space={3}>
          <Pressable  onPress={() => router.back()} style={styles.BackIconButton}>
            <Ionicons name="arrow-back-circle" size={50} color="black" />
          </Pressable>
          <Text flex={1} fontSize={28} fontWeight={'bold'} textAlign={'center'} left={-20} >Detalles</Text>
      </HStack>
      <View>
            
            <Box alignItems={'center'}>
              <Image borderRadius={10} source={placeholdo}></Image>
            </Box>
            <VStack marginBottom={2} space={2}>
              <Text textAlign={'center'} fontSize={24} fontWeight={'bold'} color={'#0D94B9'}>{NombComercial}</Text>
              <Text textAlign={'center'} fontSize={20} color={'gray.500'}>{NombGenerico}</Text>
            </VStack>
            
            <View>
              <Text fontWeight={'bold'} fontSize={22}>Presentacion:</Text>
              <CuadroInf info={Presentacion}></CuadroInf>              
            </View>
            <View>
              <Text fontWeight={'bold'} fontSize={22}>Descripcion:</Text>
              <Text fontSize={18}>{Descipcion}</Text>
            </View>
            <Text fontSize={22} fontWeight={'bold'}>Efectos Secundarios:</Text>
            <View flexDirection={"row"} flexWrap={'wrap'} justifyContent={'flex-start'}>
            {EfectosSecundarios.map((efecto, index) => (
            <CuadroInf key={index} info={efecto} />
            ))}
              
            </View>

          </View>
    </ScrollView>
  );
}