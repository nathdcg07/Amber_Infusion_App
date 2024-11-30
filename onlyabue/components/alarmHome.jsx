import { StatusBar, View, Fab,  Box, Text, Spinner ,Circle, Hidden, Button} from "native-base";
import { ScrollView, StyleSheet,Dimensions,ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { NextAlarm } from "./nextAlarm";
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import React,{ useEffect,useState } from "react";
import { obtenerMedicamentosPorUsuario } from "../services/firestoreService";
import backograundo from '../assets/icons/Fondo.jpg'
import { getNameFromAsyncStorage,loadMedsFromFile,saveMedsToFile } from "../services/frontServices";
import { obtenerDocumentoPorToken } from "../services/firestoreService";

import styles from "../Styles/GlobalStyles";
const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -200 : -150;

export function AlarmHome() {
  const [Medicamentos, setMedicamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchedUser = await getNameFromAsyncStorage();
        setUser(fetchedUser);
  
        const dataMeds = await loadMedsFromFile();
        if (Array.isArray(dataMeds) && dataMeds.length > 0) {
          setMedicamentos(dataMeds);
        } else {
          const remoteData = await obtenerMedicamentosPorUsuario(fetchedUser);
          setMedicamentos(remoteData);
          await saveMedsToFile(remoteData);
        }
      } catch (error) {
        console.error("Error durante la inicialización:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    initialize();
  }, []);




  return (
    <View flex={1} >
      <ImageBackground source={backograundo}
        style={styles.backgroundImage}>
      <StatusBar/>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.nextAlarmContainer}>
          <Circle backgroundColor="#ffffff"  width={width * 1.1} height={height*0.6} position={"absolute"}  top={topPosition} overflow={'hidden'}
          ></Circle>
          <NextAlarm ListaMed={Medicamentos} />          
        </View>

      <View alignItems='center'>
       <Box   width={(width*0.95)} shadow={"3"} >
       <Text alignSelf={'center'} color='white' fontSize={29}  marginY={2} fontWeight='bold'>
            Tus Recordatorios
          </Text>
          <View paddingX={3}>
          {isLoading ?(<Spinner size="lg" paddingTop={5} marginBottom={10}/>):(
            Medicamentos.map((med) => (
              <MedCard medicamento={med}/>
            ))
          )}

          </View>
       </Box>
       </View>
      </ScrollView>
      <Link asChild href="/RegisterMed">
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
  );
}