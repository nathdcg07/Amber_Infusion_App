import React, { useEffect, useState } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../services/firebaseConfig';

export default function NotificacionMedicamento({ medicamentoId, usuarioId, intervaloHoras = 8 }) {
  const [notificacion, setNotificacion] = useState(null);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    return () => subscription.remove();
  }, []);

  const programarNotificacion = async () => {
    const proximaToma = new Date();
    proximaToma.setHours(proximaToma.getHours() + intervaloHoras);

    console.log(`Programando notificación para: ${proximaToma.toISOString()}`);

    await setDoc(doc(firestore, 'recordatorio', `${medicamentoId}_${usuarioId}`), {
      medicamentoId,
      usuarioId,
      proximaToma: proximaToma.toISOString(),
      estado: 'pendiente',
      retrasadoVeces: 0,
      horaInicial: new Date().toISOString(),
      intervalo: intervaloHoras,
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Es hora de tomar tu medicamento!",
        body: "Es momento de tomar tu dosis. ¿Lo has tomado?",
        data: { medicamentoId, usuarioId },
      },
      trigger: {
        date: proximaToma,
      },
    });
  };

  const handleNotificationResponse = async (response) => {
    const { medicamentoId, usuarioId } = response.notification.request.content.data;
    navigation.navigate('DetalleRecordatorio', { medicamentoId, usuarioId });
    const docRef = doc(firestore, 'recordatorio', `${medicamentoId}_${usuarioId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { retrasadoVeces, intervalo } = docSnap.data();
      Alert.alert(
        'Toma de medicamento',
        '¿Has tomado el medicamento?',
        [
          {
            text: 'Sí',
            onPress: async () => {
              await updateDoc(docRef, { estado: 'tomado' });
            },
          },
          {
            text: 'Retrasar',
            onPress: async () => {
              const nuevaHora = new Date();
              nuevaHora.setMinutes(nuevaHora.getMinutes() + 5);

              console.log(`Notificación retrasada hasta: ${nuevaHora.toISOString()}`);

              await updateDoc(docRef, {
                estado: 'retrasado',
                retrasadoVeces: retrasadoVeces + 1,
                proximaToma: nuevaHora.toISOString(),
              });

              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Recordatorio de Medicamento",
                  body: "Es momento de tomar tu dosis. ¿Lo has tomado?",
                  data: { medicamentoId, usuarioId },
                },
                trigger: {
                  date: nuevaHora,
                },
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View>
      <Button title="Programar Notificación" onPress={programarNotificacion} />
      {notificacion && <Text>{JSON.stringify(notificacion)}</Text>}
    </View>
  );
}
