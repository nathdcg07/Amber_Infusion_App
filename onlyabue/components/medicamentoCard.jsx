import {  HStack, Box,Text, Pressable,View, Icon  } from "native-base";
import { Link,useRouter } from "expo-router";
import React, { useState } from "react";
import styles from "../Styles/GlobalStyles";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function MedCard({medicamento}){
    const router = useRouter();
    const handlePush = () => {
        router.push({
          pathname: '/(screens)/MedDetails',
          params: {
            medicamentoDoc: medicamento.id,
            medicamento: encodeURIComponent(JSON.stringify(medicamento)),
            medBox: encodeURI(medicamento.imagenBoxUrl),
            imagenMed: encodeURI(medicamento.imagenMedUrl), // Codifica el objeto serializado
          },
        });
      };
    return(
        <View alignSelf={'center'} style={styles.CardsContainer} shadow={"6"} >
            
                
                    <Pressable onPress={handlePush}>                        
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
                                        Detalles<Icon as={AntDesign} name="arrowright" size={4} color="black" />
                                        
                                    </Text>
                                </Box>                                
                            </Box>
                        </HStack>
                    </Pressable>
               
                
        </View>
)};

    