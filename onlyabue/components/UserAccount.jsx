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
import { getNameFromAsyncStorage } from "../services/frontServices";

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
  const [userData, setUserData] = useState({});
  const [meds, setMeds] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoad(true);
      try {
        //const user = await getNameFromAsyncStorage(); // Asegúrate de que esta función esté importada
        const user = 'W2H5OUAzK5maXu5jcww5';
        const fetchedUser = await getUserData(user);
        setUserData(fetchedUser || {});
        const listaMed = await loadMedsFromFile();
        setMeds(listaMed || []);
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchUser();
  }, []);

  if (load) {
    return <Spinner size="xl" />;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Circle
        backgroundColor="#027AA7"
        width={width * 1}
        height={height * 0.5}
        position="absolute"
        top={topPosition}
        overflow="hidden"
        justifyContent="center"
      />

      <Box>
        <VStack mt={10} alignItems="center">
          <Image
            source={{uri: userData.SelectedImagen}||imgPlaceholder}
            size="2xl"
            borderRadius="full"
            mb={5}
            alt="Perfil"
          />
          <Text fontSize={25} fontWeight="bold">
            {`${userData.name || 'N/A'} ${userData.surNamePat || ''} ${userData.surNameMat || ''}`}
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
                {userData.age || 'N/A'} años
              </Text>
              <Text color="white" fontSize="sm">
                Edad
              </Text>
            </Box>
            <Divider orientation="vertical" thickness={2} />
            <Box alignItems="center">
              <Text color="white" fontSize="lg">
                {userData.tipoSangre || 'N/A'}
              </Text>
              <Text color="white" fontSize="sm">
                Sangre
              </Text>
            </Box>
            <Divider orientation="vertical" thickness={2} />
            <Box alignItems="center">
              {sexoFunc(userData.Sex || '')}
              <Text color="white" fontSize="sm">
                {userData.Sex || 'N/A'}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>

      {/* Enfermedades */}
      <Box px={4}>
        <Text fontSize={28} fontWeight="bold">
          Enfermedades de Base:
        </Text>
        <View style={styles.row}>
          {userData.enfermedades?.length > 0 ? (
            userData.enfermedades.map((enfermedad, index) => (
              <View
                key={`enfermedad-${index}`}
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="flex-start"
                marginTop={6}
              >
                <CuadroInf enfermedad={enfermedad} />
              </View>
            ))
          ) : (
            <View margin={4}>
              <Text fontSize={20} alignSelf="center">
                No tiene enfermedades de base registradas
              </Text>
            </View>
          )}
        </View>
      </Box>

      {/* Instrumentación */}
      <Box px={4}>
        <Text fontSize={28} fontWeight="bold">
          Instrumentaria Médica:
        </Text>
        <View style={styles.row}>
          {userData.instrumentacion?.length > 0 ? (
            userData.instrumentacion.map((instrumento, index) => (
              <View
                key={`instrumento-${index}`}
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="flex-start"
                marginTop={6}
              >
                <CuadroInf enfermedad={instrumento} />
              </View>
            ))
          ) : (
            <View margin={4}>
              <Text fontSize={20} alignSelf="center">
                No tiene instrumentación registrada
              </Text>
            </View>
          )}
        </View>
      </Box>

      {/* Historial */}
      <Box px={4}>
        <HStack space={2}>
          <Text fontSize={28} fontWeight="bold">
            Historial
          </Text>
          <Link asChild href="/(screens)/HistorialScreenCompleto" style={styles.DetallesCard}>
            <Text>Ver Más ---&gt;</Text>
          </Link>
        </HStack>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollHorizontalContainer}
        >
          {meds.length > 0 ? (
            meds.map((medicamentos, index) => (
              <HistorialHCard key={`medicamento-${index}`} medicamento={medicamentos} />
            ))
          ) : (
            <View margin={4}>
              <Text fontSize={20} alignSelf="center">
                No tiene medicamentos registrados
              </Text>
            </View>
          )}
        </ScrollView>
      </Box>
    </ScrollView>
  );
};