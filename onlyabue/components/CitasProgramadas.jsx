import { View, Text,Pressable, HStack,Box } from "native-base";
import styles from "../Styles/GlobalStyles";
import React, { useState } from "react";
import { Link } from "expo-router";
export function CitaCard({Cita}){
    const [NombreMed, setNombreMed] =useState()
    const [Detalle, setDetalle] = useState()
    const [Lugar, setLugar] = useState()
    const [HoraCita, setHoraCita] = useState()
    const [Fecha, setFecha]=useState()
    return(
            <View alignSelf={'center'} style={styles.CardsContainer} shadow={"6"}>
                        
                    <Link asChild href='./MedDetails'>
                        <Pressable>                        
                            <HStack space={3} alignItems="center" padding={1}>
                                <Box alignItems={'center'} flex={1}>
                                    <Text alignSelf={'center'} fontSize="2xl" fontWeight="bold">
                                    {Cita.NombreMed}
                                    </Text>
                                    <Text alignSelf={'center'} fontSize="2xl" fontWeight="bold">
                                    {Cita.Fecha}
                                    </Text>
                                    <Text alignItems="center" fontSize="2xl" fontWeight="bold">
                                    {Cita.HoraCita}
                                    </Text>
                                    <Text alignSelf={'center'} fontSize="md" color="gray.500">
                                    {Cita.Lugar}
                                    </Text>
                                    <Text alignSelf={'center'} fontSize="md" color="gray.500">
                                    {Cita.Detalle}
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

        
    );
}