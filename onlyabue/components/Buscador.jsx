import {ScrollView,  HStack,Input,VStack, Text,Box, View, Button} from "native-base";
import { Dimensions,ImageBackground } from "react-native";
import { BusquedaCard, CardVacia } from "./BusquedaCard";
import { StatusBar,  } from "native-base";
import styles from "../Styles/GlobalStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import backograundo from "../assets/icons/Fondo.jpg"
import { useState } from "react";
const { width, height } = Dimensions.get("window");
export const Buscador=()=>{
const Medicamento=[
    { NombreGenerico: "Acetaminofen", NombreComercial: "Paracetamol" },
    { NombreGenerico: "Ibuprofeno", NombreComercial: "Advil" },
    { NombreGenerico: "Amoxicilina", NombreComercial: "Amoxil" },
    { NombreGenerico: "Clorfenamina", NombreComercial: "Clorotrimeton" },
    { NombreGenerico: "Loratadina", NombreComercial: "Claritin" },
    { NombreGenerico: "Salbutamol", NombreComercial: "Ventolin" },
    { NombreGenerico: "Metformina", NombreComercial: "Glucophage" },
    { NombreGenerico: "Losartán", NombreComercial: "Cozaar" },
    { NombreGenerico: "Atorvastatina", NombreComercial: "Lipitor" },
    { NombreGenerico: "Omeprazol", NombreComercial: "Prilosec" }
];
const [Vacio, setVacio] = useState(false);
const [Conexion,setConexion]=useState(false);
const [pagina, setPagina] = useState(1);
const itemsPorPagina = 5;

// Obtener solo los elementos de la página actual
const obtenerItemsDePagina = () => {
    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    return Medicamento.slice(inicio, fin);
};

// Detectar si hay más elementos para cargar
const hayMasElementos = () => {
    return pagina * itemsPorPagina < Medicamento.length;
};

 // Retroceder a la página anterior
 const retrocederPagina = () => {
    if (pagina > 1) {
        setPagina(pagina - 1);
    }
};

// Avanzar a la siguiente página
const avanzarPagina = () => {
    if (hayMasElementos()) {
        setPagina(pagina + 1);
    }
};

const llenado=()=>{
    if(Vacio){
        return (
            <View >
                <CardVacia/>
            </View>
    );
    }else{
        const itemsVisibles = obtenerItemsDePagina();
            return itemsVisibles.map((med, index) => (
                <BusquedaCard key={index} Medicamento={med} />
            ));
    }
}

    return(
       
        <View flex={1} showsVerticalScrollIndicator={false}>
             <Box space={5}position={"absolute"} top={0} left={0} right={0}  zIndex={1}   paddingBottom={5} >
                <Input  placeholder="Buscar..." variant="filled" width="90%" borderRadius="10" backgroundColor={'white'} py="3" paddingLeft={5} ml={4} mt={4} mr={4} borderColor={'gray.300'}
                    InputLeftElement={<Ionicons name="search" paddingLeft={5}  size={24} color="black"  />} 
                />
            </Box>
             <ImageBackground source={backograundo} style={styles.backgroundImage}>
            
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <ScrollView minHeight={height*0.80} mt={"20%"} >
                {
                llenado()
                }
                <HStack justifyContent="space-between" mt={4} mb={10} px={5}>
                        <Button 
                            onPress={retrocederPagina} 
                            disabled={pagina === 1}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Anterior</Text>
                        </Button>

                        <Button 
                            onPress={avanzarPagina} 
                            disabled={!hayMasElementos()}
                            style={styles.button}
                        >
                            <Text  style={styles.buttonText} >Siguiente</Text>
                        </Button>
                    </HStack>
            </ScrollView>
            </ImageBackground>
        </View>
        
        


    );
}