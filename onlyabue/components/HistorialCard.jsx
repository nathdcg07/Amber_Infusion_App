import { View, Image, Text, Box, HStack, VStack, Center, Button } from "native-base";
import styles from "../Styles/GlobalStyles";

export const HistorialCard = ({ medicamento }) => {
    const fechaCreacion = new Date(medicamento.creadoEn.seconds * 1000 + medicamento.creadoEn.nanoseconds / 1000000);


    const opcionesFormato = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    const fechaLegible = fechaCreacion.toLocaleDateString("es-ES", opcionesFormato);

    return (
        <View alignSelf={'center'} style={styles.CardsContainer} shadow={"6"}>

            <HStack>
                <Box style={styles.imgHistorialContainer}>
                    <Image source={{uri: medicamento.imagenBoxUrl}} style={styles.imgHistorialCard} />
                </Box>
                <VStack flex={1}>
                    <HStack alignItems={'center'} flexWrap={"wrap"}>
                        <Text  fontSize={20} fontWeight={"bold"} color={"#0D94B9"} mr={18}>{medicamento.nombreComercial}</Text>
                        <Text fontSize={18} fontWeight={20} color={"gray.500"} >{medicamento.tamanio}{medicamento.unidad}</Text>
                    </HStack>
                    <Text fontSize={18} color={"gray.500"}>{medicamento.nombreGenerico}</Text>
                    <Text fontWeight={"bold"} mr={5}>Inicio: {fechaLegible}</Text>
                    <Text alignSelf={"Center"} color={"gray.400"}>{medicamento.Dias}</Text>
                    <Text>Cada: {medicamento.intervalo} Horas.</Text>
                    <Text>Dosis:{medicamento.dosis}</Text>
                    <Button mt={5} width={130}>Eliminar</Button>
                </VStack>
            </HStack>
        </View>
    );
}