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
const topPosition = aspectRatio > 1.6 ? -240 : -150;

export function AlarmHome() {
  const [Medicamentos, setMedicamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);


  useEffect(() => {
    fetchUser();
    fetchData(user);
  }, []);

  const fetchUser = async () => {
    try{
      const fetchedUser = await getNameFromAsyncStorage();
    setUser(fetchedUser);
    }catch(e){
      alert("error en el nombre",e);
    }
    
  };


  const fetchData = async (nameUser) => {
    setIsLoading(true);
    try {
      const dataMeds = await loadMedsFromFile();     
      if (dataMeds && dataMeds.length > 0) {
        setMedicamentos(dataMeds);
        setIsLoading(false);
      } else {
        await fetchMeds(nameUser);
      }
    } catch (error) {
      console.error("Error al cargar medicamentos:", error);
    }
  };

 async function fetchMeds(user) {
  try {
    const data = await obtenerMedicamentosPorUsuario(user);

    // Guardar en el estado
    setMedicamentos(data);

    // Guardar en un archivo
    await saveMedsToFile(data);

    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching meds:", error);
  }
}


  

  return (
    <View flex={1} >
      <ImageBackground source={backograundo}
        style={styles.backgroundImage}>
      <StatusBar/>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.nextAlarmContainer}>
          <Circle backgroundColor="#ffffff"  width={width * 1.2} height={height*0.6} position={"absolute"}  top={topPosition} overflow={'hidden'}
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
              <MedCard key={med.id} medicamento={med}/>
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

