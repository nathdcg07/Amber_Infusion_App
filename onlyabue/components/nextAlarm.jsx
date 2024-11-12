import React,{useEffect, useState} from "react";
import { Box, View, Text, HStack, Icon, Center } from "native-base";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Dimensions } from "react-native";

const { width,height } = Dimensions.get('window');

export const NextAlarm = ( {ListaMed} ) => {
  const [medicamentoProximo, setMedicamentoProximo] = useState(null);
  for(const{ horaInicio: horas, intervalo: inter, nombreComercial: nombre,} of ListaMed)

  return (
    <View >
      
      <View>
        <HStack alignItems="center" paddingLeft={5} paddingTop={5}>          
          <Text alignSelf={'center'} fontSize={24} color="black" ml={2}>Próxima alarma</Text>
        </HStack>
      </View>
      {medicamentoProximo ? (
        <>
          <View justifyContent="center" paddingBottom={90} alignItems="center">
            <Text fontSize={60} color="black">{medicamentoProximo.horaInicio}</Text>
          </View>
          <FontAwesome6 name="clock-four" size={24} color="black" />
          <View position="absolute" bottom={5} left={5}>
            <Text fontSize={45} color="black">{medicamentoProximo.nombreComercial}</Text>
          </View>
        </>
      ) : (
        <View justifyContent="center" paddingBottom={90} alignItems="center">
          <Text fontSize={60} color="Black">Sin datos</Text>
          <FontAwesome6 name="clock-four" size={24} color="black" />
        </View>
      )}
      
    </View>
  );
};
