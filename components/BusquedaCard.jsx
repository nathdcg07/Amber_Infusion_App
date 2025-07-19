import { View, Box, Divider, Image, HStack, Text, VStack, Pressable, Center, Icon } from "native-base";
import {useState} from "react";
import placeholder from '../assets/icons/Image-placeholder.png'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

export const BusquedaCard =({Medicamento})=>{
    const router = useRouter();
    
    const pressHandle= ()=>{
        router.push({
            pathname: '/(screens)/BuscadorMedDetail',
            params: {
              MedicamentoRes: encodeURIComponent(JSON.stringify(Medicamento)),
              ImgUrl: encodeURI(Medicamento.ImagenUrl)
            },
        });
    }
    
    return(
        <View  >
            <Pressable onPress={pressHandle}>
                
                    <HStack height={'auto'} borderWidth={"0.5"} borderRadius={15}  m={5} mb={3} overflow="hidden" padding={1} backgroundColor={'white'}>
                        <Image source={{uri: Medicamento.ImagenUrl}} size={"lg"} m={5} mr={3} borderRadius={10}/>
                        {
                            console.log('Imagen:'+ Medicamento.ImagenUrl)
                        }
                        <Divider orientation="vertical" height={"70%"} thickness={2} mt={6} mb={8}></Divider>
                        <VStack ml={4} mt={10} flex={1} >
                            <Text fontSize="22" fontWeight="bold" color={'#0D94B9'} numberOfLines={0}>{Medicamento.NombreComercial}</Text>
                            <Text fontSize="20" color="gray.500" numberOfLines={0}>{Medicamento.NombreGenerico}</Text>
                        </VStack>
                        <VStack justifyContent="center" alignItems="center"pl={2} pr={2}>
                            <Icon as={Ionicons} name="arrow-forward" size={6} color="black" />
                        </VStack>
                    </HStack>
                
            </Pressable>
        

        </View>
        
    )
}
export const CardVacia=()=>{
    return(
        <Center borderWidth={"0.5"} borderRadius={15}  m={5} mb={3} overflow="hidden" padding={1} backgroundColor={'white'}>
            <Text textAlign={'center'} fontSize="22" fontWeight="bold" color={'#0D94B9'} >Sin Conexion</Text>
        </Center>
    );
    
}