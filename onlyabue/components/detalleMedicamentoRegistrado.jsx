import { View, ScrollView, Text, Image, VStack,HStack,Box,Button } from "native-base";
import React, {useState} from "react";
import placeholder from '../assets/icons/Image-placeholder.png';
import { Navigator,useRouter } from 'expo-router';
import styles from "../Styles/GlobalStyles";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


export const DetalleMedRegistrado = ()=>{
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
      <Box flex={1} p={4} position="relative">
        <View>
                <TouchableOpacity onPress={() => router.back()} style={styles.BackIconButton}>
                    <Ionicons name="arrow-back-circle" size={50} color="black" />
                </TouchableOpacity>            
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            <HStack space={4} alignItems="center" px={3} py={3}>
                <VStack >
                    <Text fontSize={28} bold color="cyan.700">{NombMedicamento}</Text>
                    <Text fontSize={24} color={'black'} >{NombGenerico}</Text>
                </VStack>
                <VStack >
                    <Text fontSize={20}> {Gramaje}{Unidad}</Text> 
                    <Text fontSize={18}>{Presentacion}</Text>
                    
                </VStack>
            </HStack>
        <HStack w="80%" justifyContent="space-between">
            <Box padding={3} backgroundColor={'#0C85AD'} borderRadius={18}> 
                <Image
                source={UrlImagen1 }
                alt="medicine image"
                size="lg"
                borderRadius="md"
                />
                <Text bold textAlign="center" mt={2} color={'white'}>Cantidad: {Cantidad}</Text>
            </Box>
            <Box padding={3} backgroundColor={'#0C85AD'} borderRadius={18}>
                <Image
                source={ UrlImagen2 }
                alt="pill image"
                size="lg"
                borderRadius="md"
                />
                <Text bold textAlign="center" mt={2} color={'white'}>Dosis: {Dosis}</Text>
            </Box>
        </HStack>
         <VStack w="90%" space={2}>
            <Text fontWeight={'bold'} fontSize={24}>Descipcion:</Text>
            <Text fontSize={25}>{Descripcion}</Text>
         </VStack>
         <VStack>
            
         </VStack>
         <HStack space={4}>
            <VStack marginRight={22}  alignItems={'center'}>
                <Text color={'#0D94B9'} fontWeight={'bold'} fontSize={15}>Cada {Intervalo} Horas.</Text>
                <Text>{Dias}</Text>
                <HStack>
                    <Text fontSize={15} fontWeight={'bold'}>Inicio tratamiento:</Text>
                    <Text>{InicioTratamiento} </Text>
                </HStack>
                <HStack>
                <Text fontSize={15} fontWeight={'bold'}>Fin Tratamiento:</Text>
                <Text>{FinTratamiento}</Text>
                </HStack>
                
            </VStack>
            
            
            <Box
            bg="purple.500"
            w={20}
            h={20}
            borderRadius="full"
            justifyContent="center"
            alignItems="center"
            alignSelf="center"
            my={4}
            >
            <Text color="white" bold fontSize="lg">16:30</Text>
            </Box>   
         </HStack>
         
         <HStack space={4} w="100%" justifyContent="center">
          <Button colorScheme="red" flex={1}>Eliminar</Button>
          <Button colorScheme="blue" flex={1}>Editar</Button>
        </HStack>
        </ScrollView>
      </Box>
        
    );
}