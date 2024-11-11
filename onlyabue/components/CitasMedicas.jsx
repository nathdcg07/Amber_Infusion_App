import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner } from "native-base";
import { ScrollView, StyleSheet,Dimensions,ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import { NextDate } from "./NextDate";
import React,{ useEffect,useState } from "react";
import { CitaCard } from "./CitasProgramadas";
import styles from "../Styles/GlobalStyles";

const { width } = Dimensions.get('window');

export const CitasMedicas = () => {
    
  return (
    <View flex={1}>
        <ImageBackground
        style={styles.backgroundImage}>
      
        <StatusBar/>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                <NextDate />
                
                <View alignContent='center'>
                <Box >
                    <Text alignSelf={'center'} color='white' fontSize={23} fontWeight='bold'>
                        Citas Medicas
                    </Text>
                    <View paddingX={3}>
                      <CitaCard/>
                      <CitaCard/>
                    
                    </View>
                </Box>
                </View>
            </ScrollView>
            <Link asChild href="/RegistroCitaMed">
            <Fab
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={<AntDesign name="plus" size={25} color="white" />}
                backgroundColor="#29B6F6"
                position="absolute"
                bottom={10}
                right={30}
            />
        </Link>
        </ImageBackground>
    </View>
  )
}



