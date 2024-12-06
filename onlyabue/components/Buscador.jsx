import {ScrollView,  Heading,Input,VStack, Icon, View} from "native-base";
import { BusquedaCard } from "./BusquedaCard";
import { StatusBar, ImageBackground } from "native-base";
import styles from "../Styles/GlobalStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import backograundo from '../assets/icons/Fondo.jpg'
export const Buscador=()=>{
const Medicamento=[
    {NombreGenerico:"Acetaminofen",NombreComercial:"paracetamol"},
    {NombreGenerico:"Texto1 con sfasdf",NombreComercial:"Texto1 con sfasdf"},
    {NombreGenerico:"Acetaminofen",NombreComercial:"paracetamol"},
    {NombreGenerico:"Acetaminofen",NombreComercial:"paracetamol"},
    {NombreGenerico:"Acetaminofen",NombreComercial:"paracetamol"},
    {NombreGenerico:"Acetaminofen",NombreComercial:"paracetamol"}
];

    return(
        // <ImageBackground source={backograundo}
        // style={styles.backgroundImage}>
        <ScrollView background={'#027AA7'}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
            <VStack w="90%" space={5} >
                <Input placeholder="Buscar..." variant="filled" width="100%" borderRadius="10" backgroundColor={'white'} py="3" paddingLeft={5} ml={4} mt={4} mr={4} borderColor={'gray.300'}
                    InputLeftElement={<Ionicons name="search" paddingLeft={5}  size={24} color="black" />} 
                />
            </VStack>
            
            {
                Medicamento.map((med, index) =>(
                    <BusquedaCard key={index} Medicamento={med}/>
                ))
            }
            
        </ScrollView>
        // </ImageBackground>


    );
}