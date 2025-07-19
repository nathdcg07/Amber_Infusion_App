import { Image,View, Text, VStack, Box } from "native-base";
import placeholder from "../assets/icons/Image-placeholder.png"

export const HistorialHCard=({medicamento})=>{
    // Convertir a fecha y hora
const fechaCreacion = new Date(medicamento.creadoEn.seconds * 1000 + medicamento.creadoEn.nanoseconds / 1000000);

// Formatear la fecha legible
const opcionesFormato = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const fechaLegible = fechaCreacion.toLocaleDateString("es-ES", opcionesFormato);

    return(
        <View width={200} height={350} borderRadius={20} backgroundColor={'white'} margin={5} shadow={"6"}>
            <VStack alignItems={'center'}>
                <Image source={{uri: medicamento.imagenBoxUrl}} alt="medicamentobox.png" width={150} height={150}  mt={5} borderRadius={5}/>
                <Box p={3}>
                    <Text fontWeight={'bold'}>{medicamento.nombreComercial}</Text>
                    <Text color={"gray.500"}>{medicamento.nombreGenerico}</Text>
                    <Text fontWeight={"bold"} mr={5}>Inicio: {fechaLegible}</Text>
                    <Text fontWeight={"bold"} mr={5}>cantidad: {medicamento.cantidad}</Text>                                  
                    <Text alignSelf={"Center"} color={"gray.400"}> {medicamento.Dias}</Text>
                </Box>
                
            </VStack>
        </View>
    );
}