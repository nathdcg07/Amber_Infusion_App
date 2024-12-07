import { View, ScrollView, Text, Image, VStack,HStack,Box,Button, Pressable } from "native-base";
import React, {useState} from "react";
import placeholder from '../assets/icons/Image-placeholder.png';
import { Navigator,useRouter,useLocalSearchParams } from 'expo-router';
import styles from "../Styles/GlobalStyles";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


export const DetalleMedRegistrado = ()=>{
const router = useRouter();
const { medicamentoDoc } = useLocalSearchParams();
const { medicamento } = useLocalSearchParams();
const {medBox} = useLocalSearchParams();
const {imagenMed} = useLocalSearchParams();
const medicamentoObj = JSON.parse(decodeURIComponent(medicamento));

const fechaCreacion = new Date(medicamentoObj.creadoEn.seconds * 1000 + medicamentoObj.creadoEn.nanoseconds / 1000000);

const opcionesFormato = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
};
const fechaLegible = fechaCreacion.toLocaleDateString("es-ES", opcionesFormato);


    return(
        <ScrollView >
            <HStack justifyContent={"flex-start"} marginTop={4} marginBottom={5} px={4} space={2}>
                <Pressable  onPress={() => router.back()} style={styles.BackIconButton}>
                    <Ionicons name="arrow-back-circle" size={50} color="black" />
                </Pressable>
                <Text justifyContent={'center'} fontWeight={'bold'} fontSize={22}>Detalle</Text>                 
            </HStack>
            <VStack  alignItems={'center'}>
                <HStack space={4} alignItems="center" px={3} py={3}>
                    <VStack >
                        <Text fontSize={28} bold color="cyan.700">{medicamentoObj.nombreComercial}</Text>
                        <Text fontSize={24} color={'black'} >{medicamentoObj.nombreGenerico}</Text>
                    </VStack>
                    <VStack >
                        <Text fontSize={20}> {medicamentoObj.tamanio}{medicamentoObj.unidad}</Text> 
                        <Text fontSize={18}>{medicamentoObj.presentacion}</Text>
                        
                    </VStack>
                </HStack>
                <HStack w="80%" justifyContent="space-between">
                    <Box padding={3} backgroundColor={'#0C85AD'} borderRadius={18} alignItems={'center'}> 
                        <Image
                        resizeMode="cover"
                        source={{uri: imagenMed} }
                        alt="medicine image"
                        size="xl"
                        borderRadius="md"
                        />
                        <Text bold textAlign="center" mt={2} color={'white'} fontSize={20}>Cantidad: {medicamentoObj.cantidad}</Text>
                    </Box>
                    <Box padding={3} backgroundColor={'#0C85AD'} borderRadius={18} alignItems={'center'}>
                        <Image
                        resizeMode="cover"
                        source={ {uri: medBox} }
                        alt="pill image"
                        size="xl"
                        borderRadius="md"
                        />
                        <Text bold textAlign="center" mt={2} color={'white'} fontSize={20}>Dosis: {medicamentoObj.dosis}</Text>
                    </Box>
                </HStack>                        
                <Box
                        bg="purple.500"
                        w={40}
                        h={40}
                        borderRadius="full"
                        justifyContent="center"
                        alignItems="center"
                        alignSelf="center"
                        my={4}>
                        <Text color="white" bold fontSize={"28"}>16:30</Text>
                    </Box>   
                    <VStack marginRight={22}  alignItems={'center'}>
                        <Text color={'#0D94B9'} fontWeight={'bold'} fontSize={20}>Cada {medicamentoObj.intervalo} Horas.</Text>
                        
                        <Text fontSize={18} paddingX={5}>{medicamentoObj.dias+""} </Text>
                        <HStack alignItems={'center'}>
                            <Text fontSize={20} fontWeight={'bold'}>Inicio tratamiento:</Text>
                            <Text fontSize={18}>{" "+fechaLegible} </Text>
                        </HStack>
                        
                        
                    </VStack>
                <HStack m={5} space={4} w="90%" justifyContent="center">
                    <Button colorScheme="red" flex={1} fontSize={22}>Eliminar</Button>
                    <Button colorScheme="blue" flex={1} fontSize={22}>Editar</Button>
                </HStack>
            </VStack>
            
        </ScrollView>
     
        
    );
}