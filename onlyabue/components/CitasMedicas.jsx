
import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner,Circle } from "native-base";
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
import { loadDatesFromFile,saveDatesToFile } from "../services/frontServices";
import { obtenerCitasPorUsuario } from "../services/firestoreService";
import CardPlaceholder from "./CardPlaceholder";



const { width,height } = Dimensions.get('window');
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -150 : -150;



export const CitasMedicas = () => {

  const [PlaceHolderF,setPlaceholderF]=useState(false);
  const [user, setUser] = useState(null);
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading]  = useState(false);
  
  useEffect(() => {

    const initialize = async () => {
      try {
        const fetchedUser = 'W2H5OUAzK5maXu5jcww5';
        //const fetchedUser = await getNameFromAsyncStorage();
        setUser(fetchedUser);

        const dataDates = await loadDatesFromFile();
        if (Array.isArray(dataDates) && dataDates.length > 0) {
          setCitas(dataDates);
          setPlaceholderF(false);
        } else {
          const remoteData = await obtenerCitasPorUsuario(fetchedUser);
          setCitas(remoteData);
          await saveDatesToFile(remoteData);
        }
        if (!dataDates || dataDates.length === 0) {
          setPlaceholder(true);
        }
      } catch (error) {
        console.error("Error durante la inicialización:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();

  }, []);
    
  const setPlaceholder = () => {
    const placeholderMed = [
      {
        nombreComercial: "Sin Citas",
        dias: "-",
      },
    ];
    setPlaceholderF(true);
    setCitas(placeholderMed);
  };

  const setCards = () => {
      if (PlaceHolderF) {
        return citas.map((dates) => <CardPlaceholder key={dates.nombreComercial} medicamento={dates} />);
      } else {
        return citas.map((dates) => <CitaCard key={dates.id} Cita={dates} />);
      }
    };


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
                  
                  {isLoading ? <Spinner size="lg" paddingTop={5} marginBottom={10} /> : setCards()}
                
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



