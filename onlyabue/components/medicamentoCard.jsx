import {  HStack, Box,Text, Pressable,  } from "native-base";
import { Link } from "expo-router";
import React, { useState } from "react";
import {View, StyleSheet, Touchable} from 'react-native'
import styles from "../Styles/GlobalStyles";


export default function MedCard({medicamento}){
    return(
        <View style={styles.CardsContainer}>
            
                <Link asChild href='./MedDetails'>
                    <Pressable>                        
                        <HStack space={3} alignItems="center" padding="1">
                            <Box flex={1}>
                                <Text fontSize="2xl" fontWeight="bold">
                                {medicamento.nombreComercial} {medicamento.gramaje} {"\n"}{medicamento.dosis} tableta
                                </Text>
                                <Text fontSize="md" color="gray.500">
                                cada {medicamento.intervalo || "Sin descripción disponible"} horas{"\n"} 
                                {medicamento.dias+"" || "Sin descripción disponible"}
                                </Text>
                                <Box style={styles.DetallesCard}>
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

    