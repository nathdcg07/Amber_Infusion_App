import { StatusBar, View, Fab, Center, Pressable, Box, Text } from "native-base";
import { ScrollView, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { NextAlarm } from "./nextAlarm";
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export function AlarmHome() {
  return (
    <View flex={1}>
      <StatusBar/>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.nextAlarmContainer}>
          <NextAlarm />          
        </View>
        
        <View alignItems='center'>
       <Box bg={'#E3F2FD'} rounded="xl" width={(width*0.9)} borderColor={'#4FC3F7'} borderWidth={1}>
       <Text color='black' fontSize={23} marginLeft={3} marginY={2} fontWeight='bold'>
            TUS RECORDATORIOS
          </Text>
        <MedCard/>
        <MedCard/>
        <MedCard/>
       </Box>
       </View>
      </ScrollView>
      <Link asChild href="/RegisterMed">
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
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    
  },
  footbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  nextAlarmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
