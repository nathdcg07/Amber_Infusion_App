import { View, ScrollView, Text, Image, VStack,HStack,Box,Button, Pressable } from "native-base";
import React, {useState} from "react";
import placeholder from '../assets/icons/Image-placeholder.png';
import { Navigator,useRouter } from 'expo-router';
import styles from "../Styles/GlobalStyles";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


export const DetalleMedRegistrado = (medicamento)=>{
const router = useRouter();
const [NombMedicamento,setNombMedicamento] = useState('Aspirina');
const [Gramaje,setGramaje] = useState('200');
const [NombGenerico,setNombGenerico] = useState('acetaminofén');
const [UrlImagen1, setUrlImagen1] = useState(placeholder);
const [UrlImagen2, setUrlImagen2] = useState(placeholder);
const [Presentacion, setPresentacion] = useState('comprimido');
const [Descripcion, setDescripcion] = useState('Las pastillas están en la mesa de noche, justo al lado de la cama. Asegúrate de tomarlas con dos vasos de agua, no menos, para que sea más fácil pasarlas y funcionen bien. ');
const [Intervalo,setIntervalo] = useState('24');
const [Dias,setDias] = useState('Lunes,Martes');
const [InicioTratamiento,setInicioTratamiento]= useState('10/11/2024');
const [FinTratamiento,setFinTratamiento] = useState('-');
const [Cantidad,setCantidad] = useState('12');
const [Dosis,setDosis] = useState('1/2');
const [Unidad,setUnidad]= useState('Gr.');

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
                        <Text fontSize={28} bold color="cyan.700">{medicamento.NombMedicamento}</Text>
                        <Text fontSize={24} color={'black'} >{medicamento.NombGenerico}</Text>
                    </VStack>
                    <VStack >
                        <Text fontSize={20}> {medicamento.Gramaje}{medicamento.Unidad}</Text> 
                        <Text fontSize={18}>{medicamento.Presentacion}</Text>
                        
                    </VStack>
                </HStack>
                <HStack w="80%" justifyContent="space-between">
                    <Box padding={3} backgroundColor={'#0C85AD'} borderRadius={18}> 
                        <Image
                        source={medicamento.UrlImagen1 }
                        alt="medicine image"
                        size="lg"
                        borderRadius="md"
                        />
                        <Text bold textAlign="center" mt={2} color={'white'} fontSize={20}>Cantidad: {medicamento.Cantidad}</Text>
                    </Box>
                    <Box padding={3} backgroundColor={'#0C85AD'} borderRadius={18}>
                        <Image
                        source={ medicamento.UrlImagen2 }
                        alt="pill image"
                        size="lg"
                        borderRadius="md"
                        />
                        <Text bold textAlign="center" mt={2} color={'white'} fontSize={20}>Dosis: {medicamento.Dosis}</Text>
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
                        <Text color={'#0D94B9'} fontWeight={'bold'} fontSize={20}>Cada {medicamento.Intervalo} Horas.</Text>
                        <Text>{medicamento.Dias}</Text>
                        <HStack>
                            <Text fontSize={20} fontWeight={'bold'}>Inicio tratamiento:</Text>
                            <Text>{medicamento.InicioTratamiento} </Text>
                        </HStack>
                        <HStack>
                        <Text fontSize={20} fontWeight={'bold'}>Fin Tratamiento:</Text>
                        <Text>{medicamento.FinTratamiento}</Text>
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