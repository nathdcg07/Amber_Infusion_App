import React,{useEffect, useState} from "react";
import { Box, View, Text, HStack, Icon,VStack, } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const NextDate = ( {ListaMed} ) => {
    const [CitaProxima, setCitaProxima] = useState(null);
  
    return (
      <View zIndex={1} overflow={'hidden'} top={"-10%"}>
        
        <View>
          <HStack alignItems="center" paddingLeft={5} paddingTop={5}>            
            <Text fontSize={24} color="black" ml={2}>Próxima Cita medica</Text>
          </HStack>
        </View>
        {CitaProxima ? (
          <>
            <View justifyContent="center" alignItems="center">
              <Text fontSize={60} color="black">{CitaProxima.horaInicio}</Text>
            </View>
            <View alignContent={'center'} paddingBottom={60} position="absolute" bottom={5} left={5} >
              <Text fontSize={45} color="black">{CitaProxima.nombreMedico} {CitaProxima.ApellidoMedico}</Text>
            </View>
          </>
        ) : (
            <View>
              <View justifyContent="center" alignItems="center">
                <Text fontSize={55} color="black">15:00</Text>
              </View>
              <View paddingBottom={60} bottom={5} left={5}>
                <Text fontSize={25} color="black">Dr. Jose Armando rocios palacios</Text>
              </View>
          </View>
          

        )}
      </View>
    );
  };
  