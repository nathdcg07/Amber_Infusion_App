import { View } from 'native-base';
import { useRouter } from 'expo-router';
import { AlarmHome } from '../../components/alarmHome';
import NotificacionMedicamento from '../../components/recordatorios/NotificacionMedicamento';

import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import initializeCollections from '../../services/initFirestore';
import { agregarMedicamento, 
  obtenerMedicamentos, 
  obtenerMedicamentosPorUsuario, 
  actualizarMedicamento, 
  eliminarMedicamento } from '../../services/firestoreService';
import * as Notifications from 'expo-notifications';

export default function Index() {

  const router = useRouter();
  // const pruebaNombreMedicamento = 'Paracetamol';
  // const fechaRecordatorio = new Date(Date.now() + 5 * 60 * 1000);

  useEffect(() => {
    const init = async () => {
    try {
        await initializeCollections();
        await registerForPushNotificationsAsync();
    } catch (err) {
        console.log(err);
    }};
    
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
      }),
    });
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      console.log("Notification tapped!", response);
      console.log("Notification data:", response.notification.request.content.data); // Log data
      router.push({
          pathname: '/recordatorio',
          // params: { 
          //     medicamentoId: data.medicamentoId, 
          //     usuarioId: data.usuarioId 
          // },
      });
    });

    init();
    return () => subscription.remove();
  }, [router]);

  async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }
  return (
      <View flex={1}>
        <AlarmHome/>
      </View>     
  );
}