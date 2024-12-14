import React, { useEffect, useState, useCallback } from "react";
import { StatusBar, View, Fab, Box, Text, Spinner, Circle, Button } from "native-base";
import { ScrollView, StyleSheet, Dimensions, ImageBackground, RefreshControl } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NextAlarm } from "./nextAlarm";
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import CardPlaceholder from "./CardPlaceholder";
import { obtenerMedicamentosPorUsuario } from "../services/firestoreService";
import backograundo from "../assets/icons/Fondo.jpg";
import { loadMedsFromFile, saveMedsToFile } from "../services/frontServices";
import styles from "../Styles/GlobalStyles";
import * as Notifications from 'expo-notifications';
import { solicitarPermisosNotificaciones } from "../services/NotificationsScripts";
import { getNameFromAsyncStorage } from "../services/frontServices";

const { width, height } = Dimensions.get("window");
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -200 : -150;



export function AlarmHome() {
  const [Medicamentos, setMedicamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [PlaceHolderF, setPlaceholderF] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    solicitarPermisosNotificaciones();
    const initialize = async () => {
      try {
        
        const fetchedUser = await getNameFromAsyncStorage();
        setUser(fetchedUser);

        const dataMeds = await loadMedsFromFile();
        if (Array.isArray(dataMeds) && dataMeds.length > 0) {
          setMedicamentos(dataMeds);
          saveMedsToFile(dataMeds);
          setPlaceholderF(false);
        } else {
          const remoteData = await obtenerMedicamentosPorUsuario(fetchedUser);
          setMedicamentos(remoteData);
          await saveMedsToFile(remoteData);
        }
        if (!dataMeds || dataMeds.length === 0) {
          setPlaceholder();
        }
      } catch (error) {
        console.error("Error durante la inicialización:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const setPlaceholder = () => {
    const placeholderMed = [
      {
        nombreComercial: "Sin Medicamento",
        dias: "-",
      },
    ];
    setPlaceholderF(true);
    setMedicamentos(placeholderMed);
  };



  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const remoteData = await obtenerMedicamentosPorUsuario(user);
      setMedicamentos(remoteData);
      await saveMedsToFile(remoteData);

    } catch (error) {

    } finally {
      setRefreshing(false);
    }
  }, [user]);

  return (
    <View flex={1}>
      <ImageBackground source={backograundo} style={styles.backgroundImage}>
        <StatusBar />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Agregar RefreshControl
        >
          <View style={styles.nextAlarmContainer}>
            <Box position={"absolute"} zIndex={-1}>
              <Circle backgroundColor="#ffffff" width={width * 1.1} height={height * 0.6} top={topPosition} />
            </Box>
            <NextAlarm ListaMed={Medicamentos} />
          </View>

          <View alignItems="center">
            <Box width={width * 0.95} shadow={"3"}>
              <Text alignSelf={"center"} color="white" fontSize={29} marginY={2} fontWeight="bold">
                Tus Recordatorios
              </Text>
              <View paddingX={3}>
              {isLoading ?(<Spinner size="lg" paddingTop={5} marginBottom={10}/>):(
              Medicamentos.map((med) => (
              <MedCard key={med.id} medicamento={med}/>
              ))
            )}
              </View>
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
      </ImageBackground>
    </View>
  );
}