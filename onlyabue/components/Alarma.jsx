import { View, VStack, Text, Box, Icon, Square, Button, Image } from "native-base";
import { Dimensions } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from "../Styles/GlobalStyles";
import placeholder from "../assets/icons/Image-placeholder.png";
import { useState } from "react";
import { use } from "react";
const { width, height } = Dimensions.get("window");

export const Alarma=()=>{
const [Hora,setHora]=useState("16:30");
const [NombMedicamento,setNombMedicamento] = useState("Paracetamol");
const [tamanio,setTamanio]=useState("200");
const [Unidad, setUnidad] = useState("Gr.");
const [ImgUrl1,setImgUrl1]=useState();
const [ImgUrl2,setImgUrl2]=useState();

    return(
    <Box backgroundColor={'white'} style={styles.container} >
            <Box backgroundColor={'#0D94B9'} minWidth={"70%"} minHeight={"20%"} alignItems={'center'} borderBottomRadius={"20"}>
                <Box mt={8}>
                    <MaterialCommunityIcons name="pill" size={40} color="black" />
                </Box>
                <Text fontWeight={"bold"} fontSize={40} color={'white'}>{Hora}</Text>
            </Box>

        <View space={4} alignItems="center">
          <Text fontWeight={"bold"} fontSize={22} >{NombMedicamento}</Text>
          <Text fontWeight={'bold'} color={'gray.400'} fontSize={20}>{tamanio}{Unidad}</Text>

          <VStack 
            backgroundColor={"red.300"}
            pr={8}
            pl={8}
            pt={4}
            pb={4}
            mt={2}
            borderTopRadius={20}
            minWidth={"60%"}
            
          >
            <Image
              source={placeholder}
              alt="Paracetamol"
              width={200}
              height={200}
              resizeMode="cover"
              m={3}
            />
            <Image
              source={placeholder}
              alt="Pill"
              width={200}
              height={200}
              resizeMode="cover"
              m={3}
            />
            <Button style={styles.button} mb={3}>
                <Text style={styles.buttonText}>APLAZAR</Text>
            </Button>
          </VStack>

          
        </View>
    </Box>
    )

}
