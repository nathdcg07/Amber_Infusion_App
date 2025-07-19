import { Image, HStack, Box,Text, Pressable,  } from "native-base";
import { Link } from "expo-router";
import React from "react";
import {View, StyleSheet, Touchable} from 'react-native'


export default function RecomendacionMedicamiento(){
return(
    <View style={styles.container}>
        <Link href='./DetalleMedicamento.jsx'>
            <Pressable>
                
                <HStack space={3} alignItems="center" padding="4">
                    <Image
                        source={{ uri: 'https://via.placeholder.com/80' }} // Reemplaza con la imagen deseada
                        alt="Icon"
                        size="80px"
                        borderRadius="md"
                        shadow={3}
                        marginLeft="0.5"
                    />
                    <Box flex={1}>
                        <Text fontSize="2xl" fontWeight="bold">
                        Aspirinetas 500mg
                        </Text>
                        <Text fontSize="md" color="gray.500">
                        Description duis aute irure dolor in reprehenderit in voluptate velit.
                        </Text>
                        <Box style={styles.Detalles}>
                            <Text>
                                Detalles ---&gt;
                            </Text>
                        </Box>
                        
                    </Box>
                </HStack>
            </Pressable>
        </Link>
        
    </View>
   
    );

}
const styles=StyleSheet.create({
container: {
    padding: 10,  // Espaciado interno para estética
    marginTop:4,
    marginBottom:4,
    backgroundColor:'#FFF',
    borderRadius:15,

},
Detalles:{
    flex:3,
    fontSize:20,
    fontWeight:'bold',
    alignItems:'flex-end',
    margin:8,
}


});