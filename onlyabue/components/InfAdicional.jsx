import { Text, View,Box } from "native-base";
import { useState } from "react";

const [InfoAdicional, setInfoAdicional]= useState('Diabetes');
export default function CuadroInf  (){
return(
    <View>
        <Box backgroundColor={'#0D94B9'} borderRadius={15}> 
            <Text color={'white'} fontWeight={'bold'} fontSize={'22'}>{InfoAdicional}</Text>
        </Box>        
    </View>
);
}