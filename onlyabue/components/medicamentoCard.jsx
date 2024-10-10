import {  HStack, Box,Text, Pressable,  } from "native-base";
import { Link } from "expo-router";
import React, { useState } from "react";
import {View, StyleSheet, Touchable} from 'react-native'



export default function MedCard({medicamento}){
    return(
        <View style={styles.container}>
            
                <Link asChild href='./MedDetails'>
                    <Pressable>                        
                        <HStack space={3} alignItems="center" padding="4">
                            <Box flex={1}>
                                <Text fontSize="2xl" fontWeight="bold">
                                {medicamento.nombreComercial} {medicamento.dosis}
                                </Text>
                                <Text fontSize="md" color="gray.500">
                                {medicamento.descripcion || "Sin descripción disponible"}
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
)};

    const styles= StyleSheet.create({
        container: {
            padding: 10,  // Espaciado interno para estética
            margin:8,
            backgroundColor:'white',
            borderRadius:15,
            borderWidth:1,
            borderColor:'#4FC3F7',
            
        },
        Detalles:{
            flex:3,
            fontSize:20,
            fontWeight:'bold',
            alignItems:'flex-end',
            margin:8,
        }

    });