import { View, Text,Pressable, HStack,Box } from "native-base";
import styles from "../Styles/GlobalStyles";
import { useState } from "react";
import { Link } from "expo-router";
export function CitaCard(){
    const [NombreMed, setNombreMed] =useState('Dr. Jose Armando rocio')
    const [Detalle, setDetalle] = useState('Sin Detalle ')
    const [Lugar, setLugar] = useState('Hospital del Norte')
    const [HoraCita, setHoraCita] = useState('12:30')
    const [Fecha, setFecha]=useState('12/11/2024')
    return(
            <View style={styles.CardsContainer}>
                        
                    <Link asChild href='./MedDetails'>
                        <Pressable>                        
                            <HStack space={3} alignItems="center" padding="1">
                                <Box flex={1}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                    {NombreMed}
                                    </Text>
                                    <Text fontSize="2xl" fontWeight="bold">
                                    {Fecha}
                                    </Text>
                                    <Text alignItems="center" fontSize="2xl" fontWeight="bold">
                                    {HoraCita}
                                    </Text>
                                    <Text fontSize="md" color="gray.500">
                                    {Lugar}
                                    </Text>
                                    <Text fontSize="md" color="gray.500">
                                    {Detalle}
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