import { Text, View,Box } from "native-base";
import { useState, } from "react";



export default function CuadroInf  ({enfermedad}){
    const [InfoAdicional, setInfoAdicional]= useState(enfermedad);
return(
    <View margin={2} >
        <Box backgroundColor={'#0D94B9'} borderRadius={15}> 
            <Text margin={2} alignSelf={'center'} color={'white'} fontWeight={'bold'} fontSize={'22'}>{InfoAdicional}</Text>
        </Box>        
    </View>
);
}