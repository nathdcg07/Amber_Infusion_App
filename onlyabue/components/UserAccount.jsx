import React, { useState } from "react";
import {  ScrollView,  Dimensions,  StyleSheet,  TouchableOpacity,} from "react-native";
import {  StatusBar,  View,  Box,  Circle,  VStack,  Image,  Text,  HStack,  Divider,  Card, Button,} from "native-base";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import CuadroInf from "./InfAdicional";
import imgPlaceholder from "../assets/icons/Image-placeholder.png";
import styles from "../Styles/GlobalStyles";
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import imgPlaceholder from '../assets/icons/Image-placeholder.png'
import CuadroInf from './InfAdicional'
import { getUserData } from "../services/firestoreService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const { width,height } = Dimensions.get('window');
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

  const [Nombre,setNombre]= useState('pepito');
  const [ApellidoPat,setApellidoPat] = useState('juares');
  const [ApellidMat,setApellidoMat] = useState('cadima');
  const [Edad,setEdad] = useState('80');
  const [TipoSangre,setTipoSangre]=useState('O+');
  const [Sexo,setSexo]=useState('Femenino');
  const [ImagenPerfil,setImagenPerfil] = useState(imgPlaceholder);
  const [load,setLoad] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState();

useEffect(() => {
  setLoad(true);
  const fetchUser = async () => {
    const user = await getNameFromAsyncStorage();
    const fetchedUser = await getUserData(user);
    setUserData(fetchedUser);
    console.log(userData);
    setLoad(false);
  };
  fetchUser();
}, []);
  return (
    <View flex={1}>
        <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>  
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Circle backgroundColor="#027AA7"  width={width * 1.1} height={height*0.6} position={"absolute"}  top={topPosition} overflow={'hidden'}/>             
          
       
        {load?(<Spinner size='xl' />):(<><VStack marginTop={5} alignItems="center">            
            <Image source={ImagenPerfil}
                      size={'2xl'}
                      borderRadius={"full"}                      
                      mb={5}
            />
            <Text fontSize={25} fontWeight={"bold"}>{userData?.name+' '+userData?.surNamePat + ' ' + userData?.surNameMat}</Text>
            <HStack background={'#0D94B9'} borderRadius={10} space={3} mt={5} mb={5}>
            <Box   p={3} alignItems="center">
              <Text color="white" fontSize="lg">{userData?.age} años</Text>
              <Text color="white" fontSize="sm">Edad </Text>
            </Box>
            <Divider orientation="vertical" thickness="2" ></Divider>
            <Box  p={3} alignItems="center">
              <Text color="white" fontSize="lg">{userData?.tipoSangre}</Text>
              <Text color="white" fontSize="sm">Sangre </Text>
            </Box>
            <Divider orientation="vertical" thickness="2"></Divider>
            <Box p={3} alignItems="center">
              {sexoFunc(userData?.Sex)}              
              <Text color="white" fontSize="sm">{userData?.Sex} </Text>
            </Box>
          </HStack> 
            
        </VStack>       
        <View>
            <Text alignSelf={'flex-start'} fontSize={28} fontWeight={"bold"}>Enfermedades de Base:</Text>
            {userData.enfermedades.length > 0 ? (
              userData.enfermedades.map((enfermedad, index) => (
                <View flexDirection={"row"} flexWrap={'wrap'} justifyContent={'flex-start'}
            marginTop={6}>
              <CuadroInf enfermedad={enfermedad}/>
            </View>
              ))
            ) : (
              <View margin={4}>
              <Text fontSize={15} alignSelf={'center'}>No tiene enfermedades de base registradas</Text>
              </View>
            )}
            
            
        </View>
        <View>
            <Text alignSelf={'flex-start'} fontSize={28} fontWeight={"bold"}>Instrumentaria Medica:</Text>
            {userData.instrumentacion.length > 0 ? (
              userData.instrumentacion.map((instrumento, index) => (
                <View flexDirection={"row"} flexWrap={'wrap'} justifyContent={'flex-start'}
            marginTop={6}>
              <CuadroInf enfermedad={instrumento}/>
            </View>
              ))
            ) : (
              <View margin={4}>
              <Text fontSize={15} alignSelf={'center'}>No tiene instrumentacion registradas</Text>
              </View>
            )}
        </View>
      </Box>
      <Box px={4}>
        <HStack space={2}>
          <Text fontSize={28} fontWeight="bold">
            Historial
          </Text>
          <TouchableOpacity style={styles.DetallesCard}><Text>Ver Mas ---&gt;</Text></TouchableOpacity>
        </HStack>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cardsData.map((card) => (
            <TouchableOpacity key={card.id}>
              <Card
                style={{
                  marginHorizontal: 10,
                  width: 200,
                  height: 250,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={{ uri: card.image }}
                  alt={card.title}
                  style={{
                    height: 150,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Box p={3} borderRadius={20}>
                  <Text fontSize="lg" fontWeight="bold">
                    {card.title}
                  </Text>
                </Box>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
    </ScrollView>
  );
};


