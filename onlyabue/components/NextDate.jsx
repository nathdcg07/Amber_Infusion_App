import React,{useEffect, useState} from "react";
import { Box, View, Text, HStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const NextDate = ( {ListaMed} ) => {
    const [CitaProxima, setCitaProxima] = useState(null);
  
    return (
      <Box backgroundColor="#4FC3F7" borderRadius="15" width={width * 0.9} height={215}>
        <View>
          <HStack alignItems="center" paddingLeft={5} paddingTop={5}>
            <Icon as={MaterialIcons} name="alarm" size={29} color="white" />
            <Text fontSize={24} color="white" ml={2}>Próxima Cita medica</Text>
          </HStack>
        </View>
        {CitaProxima ? (
          <>
            <View justifyContent="center" alignItems="center">
              <Text fontSize={60} color="white">{CitaProxima.horaInicio}</Text>
            </View>
            <View position="absolute" bottom={5} left={5}>
              <Text fontSize={45} color="white">{CitaProxima.nombreMedico} {CitaProxima.ApellidoMedico}</Text>
            </View>
          </>
        ) : (
            <>
            <View justifyContent="center" alignItems="center">
              <Text fontSize={60} color="white">15:00</Text>
            </View>
            <View position="absolute" bottom={5} left={5}>
              <Text fontSize={30} color="white">Dr. Jose Armando rocios</Text>
            </View>
          </>
          

        )}
      </Box>
    );
  };
  