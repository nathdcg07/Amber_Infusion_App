import {  HStack, Box,Text, Pressable,View  } from "native-base";
import { Link } from "expo-router";
import React, { useState } from "react";
import styles from "../Styles/GlobalStyles";


export default function CardPlaceholder({medicamento}){
    return(
        <View alignSelf={'center'} style={styles.CardsContainer} shadow={"6"} >
            <HStack space={3} alignItems="center" >
                <Box alignItems={'center'}flex={1} >
                    <Text alignSelf={'center'}  fontSize="2xl" fontWeight="bold">
                        {medicamento.nombreComercial}
                    </Text>
                    
                                  
                </Box>
            </HStack>
        </View>
)};

    