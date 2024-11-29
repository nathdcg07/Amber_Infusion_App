import { View, Image, Text, Box, HStack, VStack, Center, Button } from "native-base";
import styles from "../Styles/GlobalStyles";
export const HistorialCard=({medicamento})=>{

    return(
        <View alignSelf={'center'} style={styles.CardsContainer} shadow={"6"}>
            
            <HStack>
                <Box style={styles.imgHistorialContainer}>
                    <Image source={medicamento.UrlImagen1} style={styles.imgHistorialCard}/>
                </Box>
                <VStack>
                    <HStack>
                        <Text fontSize={18} fontWeight={"bold"} color={"#0D94B9"} mr={18}>{medicamento.NombMedicamento}</Text>
                        <Text fontWeight={16} color={"gray.500"} >{medicamento.Gramaje}{medicamento.Unidad}</Text>
                    </HStack>                
                    <Text color={"gray.500"}>{medicamento.NombGenerico}</Text>
                    <Text fontWeight={"bold"} mr={5}>Inicio: {medicamento.InicioTratamiento}</Text>
                    <Text fontWeight={"bold"} mr={5}>Fin:{medicamento.FinTratamiento}</Text>                
                    <Text alignSelf={"Center"} color={"gray.400"}>{medicamento.Dias}</Text>
                    <Text>Cada: {medicamento.Intervalo} Horas.</Text>
                    <Text>Dosis:{medicamento.Dosis}</Text>
                    <Button mt={5} width={130}>Eliminar</Button>
                </VStack>
            </HStack>
        </View>
    );
}