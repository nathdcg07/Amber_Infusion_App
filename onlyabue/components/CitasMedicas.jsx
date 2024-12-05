import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner,Circle } from "native-base";
import { ScrollView, StyleSheet,Dimensions,ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import { NextDate } from "./NextDate";
import React,{ useEffect,useState } from "react";
import { CitaCard } from "./CitasProgramadas";
import styles from "../Styles/GlobalStyles";
import backogoundo from '../assets/icons/Fondo.jpg'
import CardPlaceholder from "./CardPlaceholder";
const { width,height } = Dimensions.get('window');
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -150 : -150;
export const CitasMedicas = () => {
  const [PlaceHolderF,setPlaceholderF]=useState(false);
    const [Citas,setCitas]=useState([
      {nombreComercial:"Sin Citas"}
      // {NombreMed:'Dr. Jose Armando rocio',Detalle:'Sin Detalle',Lugar:'Hospital del Norte', HoraCita:'12:30', Fecha:'12/11/2024'},
      // {NombreMed:'Dr. Armando Hoyos',Detalle:'Sin Detalle',Lugar:'Hospital del Sur', HoraCita:'9:30', Fecha:'12/10/2024'},
      // {NombreMed:'Dr. Jose Armando rocio',Detalle:'Sin Detalle',Lugar:'Hospital del Norte', HoraCita:'12:30', Fecha:'12/11/2024'},

    ]);

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
      console.log('llegue a la funcion')
      if(PlaceHolderF==true){
        console.log('llegue al if true')
        return Citas.map((med) => (
        <CardPlaceholder medicamento={med}/>
        ))
      }else{
        return Citas.map((cita,index)=>(
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
                    Citas.map((med) => (
                      <CardPlaceholder medicamento={med}/>
                      ))
                  }
                
                </View>
            </Box>
            </View>
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



