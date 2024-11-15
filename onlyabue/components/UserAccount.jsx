import { StatusBar, View, Fab, Center, Pressable, Box, Text, Circle,Image,HStack,VStack,Divider } from "native-base";
import { ScrollView, StyleSheet,Dimensions } from "react-native";
import React,{ useEffect,useState } from "react";
import logo from '../assets/icons/logoPill.png';
import styles from "../Styles/GlobalStyles";
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width,height } = Dimensions.get('window');
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -200 : -150;
function sexoFunc(Sexo){
  if(Sexo == 'Masculino'){
    return <Foundation name="male-symbol" size={24} color="white" />;
  }else if(Sexo == 'Femenino'){
    return <Foundation name="female-symbol" size={24} color="white" />
  }else{
    return <AntDesign name="minus" size={24} color="white" />
  }

}
export const UserAccount = () => {

  const [Nombre,setNombre]= useState('pepito');
  const [ApellidoPat,setApellidoPat] = useState('juares');
  const [ApellidMat,setApellidoMat] = useState('cadima');
  const [Edad,setEdad] = useState('80');
  const [TipoSangre,setTipoSangre]=useState('O+');
  const [Sexo,setSexo]=useState('Femenino');

  return (
    <View flex={1}>
        <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>  
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Circle backgroundColor="#027AA7"  width={width * 1.1} height={height*0.6} position={"absolute"}  top={topPosition} overflow={'hidden'}/>             
          
       
        <VStack marginTop={5} alignItems="center">            
            <Image source={{
                            uri: "https://via.placeholder.com/200"
                          }}
                      size={'2xl'}
                      borderRadius={"full"}                      
                      mb={5}
            />
            <Text fontSize={25} fontWeight={"bold"}>{Nombre+' '+ApellidoPat + ' ' + ApellidMat}</Text>
            <HStack background={'#0D94B9'} borderRadius={10} space={3} mt={5} mb={5}>
            <Box   p={3} alignItems="center">
              <Text color="white" fontSize="lg">{Edad} años</Text>
              <Text color="white" fontSize="sm">Edad </Text>
            </Box>
            <Divider orientation="vertical" thickness="2" ></Divider>
            <Box  p={3} alignItems="center">
              <Text color="white" fontSize="lg">{TipoSangre}</Text>
              <Text color="white" fontSize="sm">Sangre </Text>
            </Box>
            <Divider orientation="vertical" thickness="2"></Divider>
            <Box p={3} alignItems="center">
              {sexoFunc(Sexo)}              
              <Text color="white" fontSize="sm">{Sexo} </Text>
            </Box>
          </HStack> 
            
        </VStack>       
        <View>
            <Text fontSize={28} fontWeight={"bold"}>Enfermedades de Base:</Text>
            
        </View>
        
        </ScrollView>
    </View>
  )
}

