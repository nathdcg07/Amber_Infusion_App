import { StatusBar, View, Fab, Center, Pressable, Box, Text, Circle, Image, HStack, VStack, Divider, Wrap, Spinner,Card, Button } from "native-base";
import { ScrollView, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import logo from '../assets/icons/logoPill.png';
import styles from "../Styles/GlobalStyles";
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import imgPlaceholder from '../assets/icons/Image-placeholder.png'
import CuadroInf from './InfAdicional'
import { getUserData } from "../services/firestoreService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { loadMedsFromFile } from "../services/frontServices";
import { HistorialHCard } from "./HistorialHCard";

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -200 : -150;

function sexoFunc(Sexo) {
  if (Sexo === "Masculino") {
    return <Foundation name="male-symbol" size={24} color="white" />;
  } else if (Sexo === "Femenino") {
    return <Foundation name="female-symbol" size={24} color="white" />;
  } else {
    return <AntDesign name="minus" size={24} color="white" />;
  }
}

export const UserAccount = () => {
  const [Nombre, setNombre] = useState('pepito');
  const [ApellidoPat, setApellidoPat] = useState('juares');
  const [ApellidMat, setApellidoMat] = useState('cadima');
  const [Edad, setEdad] = useState('80');
  const [TipoSangre, setTipoSangre] = useState('O+');
  const [Sexo, setSexo] = useState('Femenino');
  const [ImagenPerfil, setImagenPerfil] = useState(imgPlaceholder);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState();
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    setLoad(true);
    const fetchUser = async () => {
      const user = await getNameFromAsyncStorage();
      const fetchedUser = await getUserData(user);
      setUserData(fetchedUser);
      const listaMed = await loadMedsFromFile();
      setMeds(listaMed);  
      setLoad(false);
    };
    const fetchMeds =async ()=>{

    }
    fetchUser();
  }, []);

  return (
    <ScrollView>
      
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Circle
        backgroundColor="#027AA7"
        width={width * 1} height={height*0.5}
        position="absolute"
        
        top={topPosition}
        
        overflow={'hidden'}
        justifyContent={'center'}
      />
      
      {load?(<Spinner size='xl' />):(<><Box>
        <VStack mt={10} alignItems="center">
          <Image
            source={ImagenPerfil}
            size="2xl"
            borderRadius="full"
            mb={5}
            alt="Perfil"
          />
          <Text fontSize={25} fontWeight="bold">
            {`${userData.name} ${userData.surNamePat} ${userData.surNameMat}`}
          </Text>
          <HStack
            background="#0D94B9"
            borderRadius={10}
            space={3}
            mt={5}
            mb={5}
            p={3}
          >
            <Box alignItems="center">
              <Text color="white" fontSize="lg">
                {userData.age} años
              </Text>
              <Text color="white" fontSize="sm">
                Edad
              </Text>
            </Box>
            <Divider orientation="vertical" thickness={2} />
            <Box alignItems="center">
              <Text color="white" fontSize="lg">
                {userData.tipoSangre}
              </Text>
              <Text color="white" fontSize="sm">
                Sangre
              </Text>
            </Box>
            <Divider orientation="vertical" thickness={2} />
            <Box alignItems="center">
              {sexoFunc(userData.Sex)}
              <Text color="white" fontSize="sm">
                {userData.Sex}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
      <Box px={4}>
        <Text fontSize={28} fontWeight="bold">
          Enfermedades de Base:
        </Text>
        <View style={styles.row}>
        {userData.enfermedades?.length > 0 ? (
              userData.enfermedades?.map((enfermedad, index) => (
                <View flexDirection={"row"} flexWrap={'wrap'} justifyContent={'flex-start'}
            marginTop={6}>
              <CuadroInf enfermedad={enfermedad}/>
            </View>
              ))
            ) : (
              <View margin={4}>
              <Text fontSize={20} alignSelf={'center'}>No tiene enfermedades de base registradas</Text>
              </View>
            )}
        </View>
      </Box>
      <Box px={4}>
        <Text fontSize={28} fontWeight="bold">
          Instrumentaria Médica:
        </Text>
        <View style={styles.row}>
        {userData.instrumentacion?.length > 0 ? (
              userData.instrumentacion?.map((instrumento, index) => (
                <View flexDirection={"row"} flexWrap={'wrap'} justifyContent={'flex-start'}
            marginTop={6}>
              <CuadroInf enfermedad={instrumento}/>
            </View>
              ))
            ) : (
              <View margin={4}>
              <Text fontSize={20} alignSelf={'center'}>No tiene instrumentacion registradas</Text>
              </View>
            )}
        </View>
      </Box>
      <Box px={4}>
        <HStack space={2}>
          <Text fontSize={28} fontWeight="bold">
            Historial
          </Text>
          <Link asChild href="/HistorialCompleto" style={styles.DetallesCard}><Text>Ver Mas ---&gt;</Text></Link>
        </HStack>
        <HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollHorizontalContainer}>
          {meds.length > 0 ? (meds.map((medicamentos) => (
            <HistorialHCard medicamento={medicamentos}/>
          ))):(<View margin={4}>
            <Text fontSize={20} alignSelf={'center'}>No tiene Medicamentos registrados</Text>
            </View>)}
        </ScrollView>
        </HStack>
      </Box></>)}
      
      </ScrollView>
  );
};