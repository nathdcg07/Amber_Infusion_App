import React, { useState } from "react";
import { ScrollView, View, HStack,Pressable,Text, Card, } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Navigator,useRouter } from 'expo-router';
import styles from "../Styles/GlobalStyles";
import { HistorialCard } from "./HistorialCard";
import placeholder from "../assets/icons/Image-placeholder.png"
export const Historial=()=>{
    const router =useRouter();
    const CardsData=[
        {NombMedicamento:"Aspirina",NombreGenerico:"ácido acetilsalicílico",Gramaje:"500",UrlImagen1:placeholder,Intervalo:"24",Dias: "Lunes,Miercoles,Viernes",InicioTratamiento:'10/11/2024',FinTratamiento:'-',Unidad:"Gr",Dosis:"1/2"},
        {NombMedicamento:"Aspirina",NombreGenerico:"ácido acetilsalicílico",Gramaje:"500",UrlImagen1:placeholder,Intervalo:"24",Dias: "Lunes,Miercoles,Viernes",InicioTratamiento:'10/11/2024',FinTratamiento:'-',Unidad:"Gr",Dosis:"1/2"},
        {NombMedicamento:"Aspirina",NombreGenerico:"ácido acetilsalicílico",Gramaje:"500",UrlImagen1:placeholder,Intervalo:"24",Dias: "Lunes,Miercoles,Viernes",InicioTratamiento:'10/11/2024',FinTratamiento:'-',Unidad:"Gr",Dosis:"1/2"},
        {NombMedicamento:"Aspirina",NombreGenerico:"ácido acetilsalicílico",Gramaje:"500",UrlImagen1:placeholder,Intervalo:"24",Dias: "Lunes,Miercoles,Viernes",InicioTratamiento:'10/11/2024',FinTratamiento:'-',Unidad:"Gr",Dosis:"1/2"},
        {NombMedicamento:"Aspirina",NombreGenerico:"ácido acetilsalicílico",Gramaje:"500",UrlImagen1:placeholder,Intervalo:"24",Dias: "Lunes,Miercoles,Viernes",InicioTratamiento:'10/11/2024',FinTratamiento:'-',Unidad:"Gr",Dosis:"1/2"}
    ];
    return(
        <ScrollView>
            <HStack justifyContent={'space-between'} marginTop={4} marginBottom={5} px={4} space={3}>
                <Pressable  onPress={() => router.back()} style={styles.BackIconButton}>
                    <Ionicons name="arrow-back-circle" size={50} color="black" />
                </Pressable>
                <Text flex={1} fontSize={28} fontWeight={'bold'} textAlign={'center'} left={-20} >Historial</Text>
            </HStack>
            <ScrollView>
                {CardsData.map((card, index)=>(
                    <HistorialCard key={index} medicamento={card} />
                ))}
            </ScrollView>
        </ScrollView>
    );
}