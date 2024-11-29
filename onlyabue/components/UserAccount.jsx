import { StatusBar, View, Fab, Center, Pressable, Box, Text, Circle, Image, HStack, VStack, Divider, Wrap, Spinner,Card, Button } from "native-base";
import { ScrollView, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import logo from '../assets/icons/logoPill.png';
import styles from "../Styles/GlobalStyles";
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import imgPlaceholder from '../assets/icons/Image-placeholder.png'
import CuadroInf from './InfAdicional'
import { getUserData } from "../services/firestoreService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { loadMedsFromFile } from "../services/frontServices";

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
  const cardsData = [
    { id: 1, title: "Card 1", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Card 2", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Card 3", image: "https://via.placeholder.com/150" },
  ];

  useEffect(() => {
    setLoad(true);
    const fetchUser = async () => {
      //const user = await getNameFromAsyncStorage();
      const fetchedUser = await getUserData('W2H5OUAzK5maXu5jcww5');
      setUserData(fetchedUser);
      console.log(userData);
      setLoad(false);
    };
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
            {`${Nombre} ${ApellidoPat} ${ApellidMat}`}
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
                {Edad} años
              </Text>
              <Text color="white" fontSize="sm">
                Edad
              </Text>
            </Box>
            <Divider orientation="vertical" thickness={2} />
            <Box alignItems="center">
              <Text color="white" fontSize="lg">
                {TipoSangre}
              </Text>
              <Text color="white" fontSize="sm">
                Sangre
              </Text>
            </Box>
            <Divider orientation="vertical" thickness={2} />
            <Box alignItems="center">
              {sexoFunc(Sexo)}
              <Text color="white" fontSize="sm">
                {Sexo}
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
        {/*userData.enfermedades?.length > 0 ? (
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
            )*/}
        </View>
      </Box>
      <Box px={4}>
        <Text fontSize={28} fontWeight="bold">
          Instrumentaria Médica:
        </Text>
        <View style={styles.row}>
        {/*userData.instrumentacion?.length > 0 ? (
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
            )*/}
        </View>
      </Box>
      <Box px={4}>
        <HStack space={2}>
          <Text fontSize={28} fontWeight="bold">
            Historial
          </Text>
          <TouchableOpacity style={styles.DetallesCard}><Text>Ver Mas ---&gt;</Text></TouchableOpacity>
        </HStack>
        <HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {cardsData.map((card) => (
            <TouchableOpacity key={card.id}>
              <Card
                style={{
                  marginHorizontal: 10,
                  width: 200,
                  height: 250,
                  borderRadius: 1,
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
        </HStack>
      </Box></>)}
      
      </ScrollView>
  );
};