import React,{useEffect, useState} from "react";
import { Box, View, Text, HStack, Icon,VStack, } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

export const NextDate = ( {ListaMed} ) => {

    const [CitaProxima, setCitaProxima] = useState(null);
  
    return (
      <View zIndex={1} overflow={'hidden'} top={"-10%"}>
        
        <View>
          <HStack alignItems="center" paddingLeft={5} paddingTop={5} justifyContent={'center'}>            
            <Text fontSize={24} color="black" ml={2}>Próxima Cita medica</Text>
          </HStack>
        </View>
        {CitaProxima ? (
          <>
            <View justifyContent="center" alignItems="center">
              <Text fontSize={60} color="black">{CitaProxima.horaInicio}</Text>
            </View>
            <View alignContent={'center'} paddingBottom={60} position="absolute" bottom={5} left={5} flexWrap={'wrap'} >
              <Text fontSize={45} color="black">{CitaProxima.nombreMedico} {CitaProxima.ApellidoMedico}</Text>
            </View>
          </>
        ) : (
            <View>
              <View justifyContent="center" alignItems="center">
                <Text fontSize={55} color="black">Sin datos</Text>
                <FontAwesome6 name="clock-four" size={24} color="black" />
              </View>
          </View>
          

        )}
      </View>
    );
  };
  