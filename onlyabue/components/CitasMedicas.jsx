
import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner,Circle,Button,HStack } from "native-base";
import { ScrollView, StyleSheet,Dimensions,ImageBackground, RefreshControl } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import { NextDate } from "./NextDate";
import React,{ useEffect,useState,useCallback } from "react";
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
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {

    const initialize = async () => {
      try {
        const fetchedUser = await getNameFromAsyncStorage();
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
    if (!Array.isArray(citas) || citas.length === 0) {
      return (
        <Text alignSelf="center" color="white" fontSize={20}>
          No hay citas disponibles.
        </Text>
      );
    }
  
    return citas.map((dates, index) => {
      if (PlaceHolderF) {
        return <CardPlaceholder key={index} medicamento={dates} />;
      } else {
        return <CitaCard key={index} Cita={dates} />;
      }
    });
  };


const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const remoteData = await obtenerCitasPorUsuario(user);
      setCitas(remoteData);
      await saveDatesToFile(remoteData);

    } catch (error) {

    } finally {
      setRefreshing(false);
    }
  }, [user]);




  return (
    <View flex={1}>
        <ImageBackground source={backogoundo}
        style={styles.backgroundImage}>
      
        <StatusBar/>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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



