import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner } from "native-base";
import { ScrollView, StyleSheet,Dimensions } from "react-native";
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
        <StatusBar/>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.nextAlarmContainer}>
                    <NextDate />
                </View>
                <View alignItems='center'>
                <Box bg={'#E3F2FD'} rounded="xl" width={(width*0.9)} borderColor={'#4FC3F7'} borderWidth={1}>
                    <Text color='black' fontSize={23} marginLeft={5} marginY={2} fontWeight='bold'>
                        TUS CITAS MEDICAS
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
    </View>
  )
}



