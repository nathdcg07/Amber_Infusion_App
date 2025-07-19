import {Tabs} from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';

export default function TabsLayout(){

    return(
        <Tabs screenOptions={{tabBarInactiveTintColor: 'Black',tabBarActiveTintColor: 'white',tabBarInactiveBackgroundColor: 'white',tabBarActiveBackgroundColor: '#29B6F6',headerShown:false, 
            tabBarStyle:{height: 80,borderRadius:8, overflow: 'hidden', backgroundColor:'red'},
         tabBarLabelStyle: {
            fontSize: 14, marginBottom:15, marginLeft:8, color:'black'}}} >
            <Tabs.Screen name="Home" options={{title: "Medicamentos", tabBarIcon: ({color})=> <Fontisto name="pills" size={28} color={color}/>,}} />
            <Tabs.Screen name="medicDates" options={{title: "Citas",tabBarIcon: ({color})=> <Fontisto name="doctor" size={30} color={color}/>, }}/>
            <Tabs.Screen name="search" options={{title: "Buscar",tabBarIcon: ({color})=> <MaterialIcons name="search" size={30} color={color} />, }}/>
            <Tabs.Screen name="account" options={{title: "Cuenta",tabBarIcon: ({color})=> <Fontisto name="male" size={30} color={color}/>,}}/>
        </Tabs>
    )
}