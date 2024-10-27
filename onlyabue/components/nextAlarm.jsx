import React,{useEffect, useState} from "react";
import { Box, View, Text, HStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const NextAlarm = ( {ListaMed} ) => {
  const [medicamentoProximo, setMedicamentoProximo] = useState(null);
  for(const{ horaInicio: horas, intervalo: inter, nombreComercial: nombre,} of ListaMed)
 

  return (
    <Box backgroundColor="#4FC3F7" borderRadius="15" width={width * 0.9} height={215}>
      <View>
        <HStack alignItems="center" paddingLeft={5} paddingTop={5}>
          <Icon as={MaterialIcons} name="alarm" size={29} color="white" />
          <Text fontSize={24} color="white" ml={2}>Próxima alarma</Text>
        </HStack>
      </View>
      {medicamentoProximo ? (
        <>
          <View justifyContent="center" alignItems="center">
            <Text fontSize={60} color="white">{medicamentoProximo.horaInicio}</Text>
          </View>
          <View position="absolute" bottom={5} left={5}>
            <Text fontSize={45} color="white">{medicamentoProximo.nombreComercial}</Text>
          </View>
        </>
      ) : (
        <View justifyContent="center" alignItems="center">
          <Text fontSize={60} color="white">Sin datos</Text>
        </View>
      )}
    </Box>
  );
};
