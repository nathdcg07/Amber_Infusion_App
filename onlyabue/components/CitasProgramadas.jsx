import { View, Text,Pressable, HStack,Box ,Icon} from "native-base";
import styles from "../Styles/GlobalStyles";
import React, { useState } from "react";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
export function CitaCard({Cita}){
    console.log("desde cards",Cita);
    const fechaCreacion = new Date(Cita.Fecha.seconds * 1000 + Cita.Fecha.nanoseconds / 1000000);
    
        const opcionesFormato = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        const fechaLegible = fechaCreacion.toLocaleDateString("es-ES", opcionesFormato);
    
    return(
            <View alignSelf={'center'} style={styles.CardsContainer} shadow={"6"}>
                                             
                            <HStack space={3} alignItems="center" padding={1}>
                                <Box alignItems={'center'} flex={1}>
                                    <Text alignSelf={'center'} fontSize="2xl" fontWeight="bold">
                                    {Cita.NombreMedico} {Cita.ApellidoMedico}
                                    </Text>
                                    <Text alignSelf={'center'} fontSize="2xl" fontWeight="bold">
                                    {Cita.Hora}
                                    </Text>
                                    <Text alignItems="center" fontSize="2xl" fontWeight="bold">
                                    {fechaLegible}
                                    </Text>
                                    <Text alignSelf={'center'} fontSize="md" color="gray.500">
                                    {Cita.Lugar}
                                    </Text>
                                    <Text alignSelf={'center'} fontSize="md" color="gray.500">
                                    {Cita.Detalle}
                                    </Text>
                                    <Box style={styles.DetallesCard}>

                                    </Box>                                
                                </Box>
                            </HStack>
                    
            </View>

        
    );
}