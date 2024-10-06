import React from "react";
import { useState } from "react";
import { Box,View,Text,HStack,Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');


export const NextAlarm = () => {
  return (
    <Box backgroundColor="#4FC3F7" borderRadius="15" width={(width*0.9)} height={215} >
        <View>
            <HStack alignItems="center" paddingLeft={5} paddingTop={5}> 
                <Icon as={MaterialIcons} name="alarm" size={29} color="white" />
                <Text fontSize={24} color="white" ml={2}>Proxima alarma</Text>
            </HStack>
        </View>
         <View justifyContent="center" alignItems="center">
         <Text fontSize={60} color="white">  15:20 </Text>
        </View>
        <View position="absolute" bottom={5} left={5}>
            <Text fontSize={45} color="white">Insulina</Text>
        </View>
    </Box>
  )
}
