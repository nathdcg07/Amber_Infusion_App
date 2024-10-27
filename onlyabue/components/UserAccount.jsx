import { StatusBar, View, Fab, Center, Pressable, Box, Text, Spinner,Image,HStack,VStack,Stack } from "native-base";
import { ScrollView, StyleSheet,Dimensions } from "react-native";
import React,{ useEffect,useState } from "react";
import logo from '../assets/icons/logoPill.png';

const { width } = Dimensions.get('window');

export const UserAccount = () => {

  return (
    <View flex={1}>
        <StatusBar/>  
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <VStack marginTop={5} >
            <HStack flex={1} flexWrap={'wrap'} width={width*0.9} marginLeft={3} alignContent={'center'} alignItems={'center'}>
                <Image source={{
                                uri: "https://wallpaperaccess.com/full/317501.jpg"
                                }} 
                                alt="Alternate Text" 
                                size={150} 
                                backgroundColor={"black"} 
                                borderRadius={100}/>
                <Stack flex={1} marginLeft={2} >
                    <Text fontSize={30} fontWeight={"bold"} >Jose Alejando Martinez</Text>
                </Stack>
            </HStack>
        </VStack>
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      
    },
}
);
