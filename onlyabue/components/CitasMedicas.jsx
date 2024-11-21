import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner,Circle } from "native-base";
import { ScrollView, StyleSheet,Dimensions,ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import { NextDate } from "./NextDate";
import React,{ useEffect,useState } from "react";
import { CitaCard } from "./CitasProgramadas";
import styles from "../Styles/GlobalStyles";
import backogoundo from '../assets/icons/Fondo.jpg'

const { width,height } = Dimensions.get('window');
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -200 : -150;
export const CitasMedicas = () => {
    
  return (
    <View flex={1}>
        <ImageBackground source={backogoundo}
        style={styles.backgroundImage}>
      
        <StatusBar/>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.nextAlarmContainer}>
                  <Circle backgroundColor="#ffffff"  width={width * 1.1} height={height*0.6} position={"absolute"}  top={topPosition} overflow={'hidden'}
                  ></Circle>
                  <NextDate />
                </View>
                
                
                <View alignContent='center'>
                <Box >
                    <Text alignSelf={'center'} color='white' fontSize={29} fontWeight='bold'>
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



