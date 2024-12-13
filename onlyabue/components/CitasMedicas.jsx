import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner,Circle,Button,HStack } from "native-base";
import { ScrollView, StyleSheet,Dimensions,ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import { NextDate } from "./NextDate";
import React,{ useEffect,useState } from "react";
import { CitaCard } from "./CitasProgramadas";
import styles from "../Styles/GlobalStyles";
import backogoundo from '../assets/icons/Fondo.jpg';
import { getNameFromAsyncStorage } from "../services/frontServices";
import CardPlaceholder from "./CardPlaceholder";
const { width,height } = Dimensions.get('window');
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -150 : -150;
export const CitasMedicas = () => {
  const [PlaceHolderF,setPlaceholderF]=useState(false);
    const [Citas,setCitas]=useState([
      // {nombreComercial:"Sin Citas"}
      {NombreMed:'Dr. Jose Armando rocio',Detalle:'Sin Detalle',Lugar:'Hospital del Norte', HoraCita:'12:30', Fecha:'12/11/2024'},
      {NombreMed:'Dr. Armando Hoyos',Detalle:'Sin Detalle',Lugar:'Hospital del Sur', HoraCita:'9:30', Fecha:'12/10/2024'},
      {NombreMed:'Dr. Jose Armando rocio',Detalle:'Sin Detalle',Lugar:'Hospital del Norte', HoraCita:'12:30', Fecha:'12/11/2024'},

    ]);
     //paginacion
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 5;  

// Obtener solo los elementos de la página actual
const obtenerItemsDePagina = () => {
    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    return Citas.slice(inicio, fin);
};

// Detectar si hay más elementos para cargar
  const hayMasElementos = () => {
    return pagina * itemsPorPagina < Citas.length;
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

    //no preocuparse, estoy reutilizando un componente para el placeholder,
    // me dio flojera hacer otro XD
    const setPlaceholder = ()=>{
      const placeholderMed=[{
        nombreComercial:"Sin Citas",
        
      }]
      setPlaceholderF(true);
      setCitas(placeholderMed);
    }
    
    const setCards=()=>{
      if(PlaceHolderF==true){      
        return Citas.map((med) => (
        <CardPlaceholder medicamento={med}/>
        ))
      }else{
        const itemsVisibles = obtenerItemsDePagina();
        return itemsVisibles.map((cita,index)=>(
          <CitaCard key={index} Cita={cita}/>
        ))
      }
      
    }
  return (
    <View flex={1}>
        <ImageBackground source={backogoundo}
        style={styles.backgroundImage}>
      
        <StatusBar/>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.nextAlarmContainer}>
            <Box position={'absolute'}  zIndex={-1}>
              <Circle backgroundColor="#ffffff"  width={width * 1.2} height={height*0.6} top={topPosition} />
            </Box>
              <NextDate />
            </View>
            <View alignContent='center'>
            <Box >
                <Text alignSelf={'center'} color='white' fontSize={29} fontWeight='bold'>
                    Citas Medicas
                </Text>
                <View paddingX={3}>
                  
                  {
//cambiar esta wea por la funcion del placeholder cuando este el fetch
                    setCards()
                  }
                
                </View>
            </Box>
            </View>
            <HStack justifyContent="space-between" mt={4} mb={10} px={5}>
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
            <Link asChild href="/RegistroCitaMed">
            <Fab
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={<AntDesign name="plus" size={25} color="white" />}
                backgroundColor="#29B6F6"
                position="absolute"
                bottom={10}
                right={30}
            />
        </Link>
        </ImageBackground>
    </View>
  )
}



