import {Tabs} from "expo-router";
import { View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';

export default function TabsLayout(){

    return(
        <Tabs screenOptions={{tabBarActiveTintColor: 'white',tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',tabBarInactiveBackgroundColor: '#29B6F6',tabBarActiveBackgroundColor: '#29B6F6',headerShown:false, tabBarStyle:{height: 80,}, tabBarLabelStyle: {
            fontSize: 14, marginBottom:15, marginLeft:8,}, }} >
            <Tabs.Screen name="index" options={{title: "Medicamentos", tabBarIcon: ({color})=> <Fontisto name="pills" size={28} color={color}/>,  }} />
            <Tabs.Screen name="medicDates" options={{title: "Citas",tabBarIcon: ({color})=> <Fontisto name="doctor" size={30} color={color}/>, }}/>
            <Tabs.Screen name="search" options={{title: "Buscar",tabBarIcon: ({color})=> <MaterialIcons name="search" size={30} color={color} />, }}/>
            <Tabs.Screen name="account" options={{title: "Cuenta",tabBarIcon: ({color})=> <Fontisto name="male" size={30} color={color}/>,}}/>
        </Tabs>
    )
}