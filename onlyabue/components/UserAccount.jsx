import React, { useState } from "react";
import {  ScrollView,  Dimensions,  StyleSheet,  TouchableOpacity,} from "react-native";
import {  StatusBar,  View,  Box,  Circle,  VStack,  Image,  Text,  HStack,  Divider,  Card, Button,} from "native-base";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import CuadroInf from "./InfAdicional";
import imgPlaceholder from "../assets/icons/Image-placeholder.png";
import styles from "../Styles/GlobalStyles";
import { HistorialHCard } from "./HistorialHCard";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");1
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
  const [Nombre] = useState("pepito");
  const [ApellidoPat] = useState("juares");
  const [ApellidMat] = useState("cadima");
  const [Edad] = useState("80");
  const [TipoSangre] = useState("O+");
  const [Sexo] = useState("Femenino");
  const [EnfermedadesBase] = useState(["enfermedad1", "enfermedad2"]);
  const [InstrumentalMed] = useState(["marca paso", "cuack"]);
  const [ImagenPerfil] = useState(imgPlaceholder);
  const cardsData = [
    { id: 1, title: "Card 1", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Card 2", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Card 3", image: "https://via.placeholder.com/150" },
  ];
  const verMas=()=>{
    router.push('(screens)/HistorialCompleto')
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}
    >
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Circle
        backgroundColor="#027AA7"
        width={width * 1.1}
        height={height * 0.5}
        position="absolute"
        zIndex={-1}
        top={topPosition}
      />
      <Box>
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
          {EnfermedadesBase.map((enfermedad, index) => (
            <CuadroInf key={index} info={enfermedad} />
          ))}
        </View>
      </Box>
      <Box px={4}>
        <Text fontSize={28} fontWeight="bold">
          Instrumentaria Médica:
        </Text>
        <View style={styles.row}>
          {InstrumentalMed.map((instrumento, index) => (
            <CuadroInf key={index} info={instrumento} />
          ))}
        </View>
      </Box>
      <Box px={4}>
        <HStack space={2}>
          <Text fontSize={28} fontWeight="bold">
            Historial
          </Text>
          <TouchableOpacity onPress={verMas} style={styles.DetallesCard}><Text>Ver Mas ---&gt;</Text></TouchableOpacity>
        </HStack>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {cardsData.map((card) => (
            
            <HistorialHCard></HistorialHCard>
          ))}
        </ScrollView>
      </Box>
    </ScrollView>
  );
};


