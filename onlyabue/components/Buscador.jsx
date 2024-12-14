import {ScrollView,  HStack,Input,VStack, Text,Box, View, Button, Spinner} from "native-base";
import { Dimensions,ImageBackground } from "react-native";
import { BusquedaCard, CardVacia } from "./BusquedaCard";
import { StatusBar,  } from "native-base";
import styles from "../Styles/GlobalStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import backograundo from "../assets/icons/Fondo.jpg"
import { useState } from "react";
import { buscarMedicamento } from "../services/firestoreService";

const { width, height } = Dimensions.get("window");
export const Buscador=()=>{
const [Medicamento,setMedicamentos] = useState([]);
const [Vacio, setVacio] = useState(true);
const [Conexion,setConexion]=useState(false);
const [pagina, setPagina] = useState(1);
const itemsPorPagina = 3;
const [textoBuscar, settextoBuscar] = useState("");
const [loading, setLoading] = useState(false);


const obtenerItemsDePagina = () => {
    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    return Medicamento.slice(inicio, fin);
};


const hayMasElementos = () => {
    return pagina * itemsPorPagina < Medicamento.length;
};

 
 const retrocederPagina = () => {
    if (pagina > 1) {
        setPagina(pagina - 1);
    }
};


const avanzarPagina = () => {
    if (hayMasElementos()) {
        setPagina(pagina + 1);
    }
};
const manejarBusqueda = async ()=>{
    try{
        setLoading(true);
        const resultado = await buscarMedicamento(textoBuscar);
        setMedicamentos(resultado);
        setVacio(false);
        setPagina(1);
    }catch(error){
        console.error("Error al buscar medicamentos:", error);
    }finally{
        setLoading(false);
    }
    
}

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
                <Input  placeholder="Buscar..."
                 variant="filled"
                 width="90%"
                 borderRadius="10" 
                 backgroundColor={'white'} 
                 py="3" paddingLeft={5} ml={4} mt={4} mr={4} borderColor={'gray.300'}
                onChangeText={(texto) => settextoBuscar(texto)} // Actualiza el texto de búsqueda
                onSubmitEditing={manejarBusqueda}
                InputLeftElement={<Ionicons name="search" paddingLeft={5}  size={24} color="black"
                                />} 
                />
            </Box>
             <ImageBackground source={backograundo} style={styles.backgroundImage}>
            
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <ScrollView minHeight={height*0.80} mt={"20%"} >
                {
                    loading? 
                    (<HStack space={2} justifyContent="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        
                      </HStack>):
                llenado()
                }
                <HStack justifyContent={'center'} mt={4} mb={10} px={5}>
                        {pagina > 1 && (
                            <Button 
                            onPress={retrocederPagina}
                            style={styles.button}
                            m={2}
                            >
                            <Text style={styles.buttonText}>Anterior</Text>
                            </Button>
                        )}

                        {hayMasElementos() && (
                            <Button 
                            onPress={avanzarPagina}
                            style={styles.button}
                            m={2}
                            >
                            <Text style={styles.buttonText}>Siguiente</Text>
                            </Button>
                        )}
                    </HStack>
            </ScrollView>
            </ImageBackground>
        </View>
        
        


    );
}