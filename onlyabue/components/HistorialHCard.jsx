import { Image,View, Text, VStack, Box } from "native-base";
import placeholder from "../assets/icons/Image-placeholder.png"
export const HistorialHCard=(medicamento)=>{

    return(
        <View width={200} height={350} borderRadius={20} backgroundColor={'#D3F6FF'} margin={5} shadow={"6"}>
            <VStack alignItems={'center'}>
                <Image source={placeholder} width={150} height={180}  mt={5} borderRadius={5}/>
                <Box p={3}>
                    <Text fontWeight={'bold'}>{medicamento.NombMedicamento}</Text>
                    <Text color={"gray.500"}>{medicamento.NombGenerico}</Text>
                    <Text fontWeight={"bold"} mr={5}>Inicio: {medicamento.InicioTratamiento}</Text>
                    <Text fontWeight={"bold"} mr={5}>Fin: {medicamento.FinTratamiento}</Text>                
                    <Text alignSelf={"Center"} color={"gray.400"}> {medicamento.Dias}</Text>
                </Box>
                
            </VStack>
        </View>
    );
}