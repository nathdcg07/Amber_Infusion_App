import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner } from "native-base";
import { ScrollView, StyleSheet,Dimensions } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { NextAlarm } from "./nextAlarm";
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import React,{ useEffect,useState } from "react";
import {RegisterUser} from "../app/(screens)/RegisterUser";
import { obtenerMedicamentosPorUsuario } from "../services/firestoreService";

const { width } = Dimensions.get('window');

export function AlarmHome() {
  const [Medicamentos, setMedicamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setIsLoading(true);
      fetchMeds('usuario1234');
      
 }, []);
 async function fetchMeds(user) {
  try {

      const data = await obtenerMedicamentosPorUsuario(user);
      setMedicamentos(data);
      setIsLoading(false);
  } catch (error) {
      console.error("Error fetching meds:", error);
  }
}

  

  return (
    <View flex={1}>
      <StatusBar/>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.nextAlarmContainer}>
          <NextAlarm ListaMed={Medicamentos} />          
        </View>
        
        <View alignItems='center'>
       <Box bg={'#E3F2FD'} rounded="xl" width={(width*0.9)} borderColor={'#4FC3F7'} borderWidth={1}>
       <Text color='black' fontSize={23} marginLeft={5} marginY={2} fontWeight='bold'>
            TUS RECORDATORIOS
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
      <Link asChild href="/RegisterUser">
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
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    
  },
  footbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  nextAlarmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
