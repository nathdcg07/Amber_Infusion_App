import React, { useEffect, useState } from "react";
import { ScrollView, View, HStack, Pressable, Text, Card, Spinner } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Navigator, useRouter } from 'expo-router';
import styles from "../Styles/GlobalStyles";
import { HistorialCard } from "./HistorialCard";
import placeholder from "../assets/icons/Image-placeholder.png";
import { loadMedsFromFile } from "../services/frontServices";


export const Historial = () => {
    const [meds, setMeds] = useState([]);
    const [load, setLoad] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            setLoad(true);
            try {
                const listaMed = await loadMedsFromFile();
                setMeds(listaMed || []);
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            } finally {
                setLoad(false);
            }
        };

        fetchUser();
    }, []);

    if (load) {
        return <Spinner size="xl" />;
    }

    return (
        <ScrollView>
            <HStack justifyContent={'space-between'} marginTop={4} marginBottom={5} px={4} space={3}>
                <Pressable onPress={() => router.back()} style={styles.BackIconButton}>
                    <Ionicons name="arrow-back-circle" size={50} color="black" />
                </Pressable>
                <Text flex={1} fontSize={28} fontWeight={'bold'} textAlign={'center'} left={-20} >Historial</Text>
            </HStack>
            <ScrollView>
                {meds.length > 0 ? (
                    meds.map((medicamentos, index) => (
                        <HistorialCard key={`medicamento-${index}`} medicamento={medicamentos} />
                    ))
                ) : (
                    <View margin={4}>
                        <Text fontSize={20} alignSelf="center">
                            No tiene medicamentos registrados
                        </Text>
                    </View>
                )}
            </ScrollView>
        </ScrollView>
    );
}