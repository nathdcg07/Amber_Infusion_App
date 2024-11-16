import { Text, View,Box } from "native-base";
import { useState, } from "react";

const [InfoAdicional, setInfoAdicional]= useState('Hipertencion');
export default function CuadroInf  (){
return(
    <View margin={2} >
        <Box backgroundColor={'#0D94B9'} borderRadius={15}> 
            <Text margin={2} alignSelf={'center'} color={'white'} fontWeight={'bold'} fontSize={'22'}>{InfoAdicional}</Text>
        </Box>        
    </View>
);
}