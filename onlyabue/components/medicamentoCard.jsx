import {  HStack, Box,Text, Pressable,View  } from "native-base";
import { Link } from "expo-router";
import React, { useState } from "react";
import styles from "../Styles/GlobalStyles";


export default function MedCard({medicamento}){
    
    return(
        <View alignSelf={'center'} style={styles.CardsContainer} shadow={"6"} >
            
                <Link asChild href='/(screens)/MedDetails'>
                    <Pressable>                        
                        <HStack space={3} alignItems="center" >
                            <Box alignItems={'center'}flex={1} >
                                <Text  fontWeight={'bold'} fontSize={'md'} color={'#0D94B9'}> 
                                    
                                     { "Cada "+ medicamento.intervalo +" horas" || "Sin descripción disponible"} 
                                </Text>
                                <Text alignSelf={'center'}  fontSize="2xl" fontWeight="bold">
                                    {medicamento.nombreComercial} {medicamento.gramaje} {"\n"}{medicamento.dosis} tableta
                                </Text>
                                <Text fontSize="md" color="gray.500" >                                
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

    