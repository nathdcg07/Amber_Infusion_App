import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../services/firebaseConfig';
import * as Notifications from 'expo-notifications';
export default function DetalleRecordatorio() {
  return (
      <View>
          <Text>Welcome to DetalleRecordatorio!</Text>
      </View>
  );
}

// export default function DetalleRecordatorio({ route, navigation }) {
//   const { medicamentoId, usuarioId } = route.params || {};
//   const [medicamento, setMedicamento] = useState(null);

//   useEffect(() => {
//     const obtenerDatosMedicamento = async () => {
//       const docRef = doc(firestore, 'usuarios', usuarioId, 'medicamentos', medicamentoId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setMedicamento(docSnap.data());
//       } else {
//         console.log('No se encontró el medicamento');
//       }
//     };
//     obtenerDatosMedicamento();
//   }, [medicamentoId, usuarioId]);

//   const handleTomado = async () => {
//     const recordatorioRef = doc(firestore, 'usuarios', usuarioId, 'medicamentos', medicamentoId, 'recordatorios', `${medicamentoId}_${usuarioId}`);
//     await updateDoc(recordatorioRef, { estado: 'tomado' });
//     Alert.alert('¡Listo!', 'Se ha registrado que tomaste el medicamento.');
//     navigation.goBack();
//   };

//   const handleRetrasar = async () => {
//     const recordatorioRef = doc(firestore, 'usuarios', usuarioId, 'medicamentos', medicamentoId, 'recordatorios', `${medicamentoId}_${usuarioId}`);
//     const nuevaHora = new Date();
//     nuevaHora.setMinutes(nuevaHora.getMinutes() + 5);

//     await updateDoc(recordatorioRef, {
//       estado: 'retrasado',
//       proximaToma: nuevaHora.toISOString(),
//     });

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Recordatorio de Medicamento",
//         body: "Es momento de tomar tu dosis. ¿Lo has tomado?",
//         data: { medicamentoId, usuarioId },
//       },
//       trigger: { date: nuevaHora },
//     });

//     Alert.alert('Notificación retrasada', 'Te recordaremos en 5 minutos.');
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       {medicamento ? (
//         <>
//           <Text style={styles.title}>{medicamento.nombreComercial}</Text>
//           <Image source={{ uri: medicamento.imagenMedUrl }} style={styles.image} />
//           <Text>Dosis: {medicamento.dosis}</Text>
//           <Text>Intervalo: {medicamento.intervalo} horas</Text>
//           <View style={styles.buttonContainer}>
//             <Button title="Tomado" onPress={handleTomado} />
//             <Button title="Retrasar" onPress={handleRetrasar} color="orange" />
//           </View>
//         </>
//       ) : (
//         <Text>Cargando...</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//   image: { width: 150, height: 150, marginBottom: 20 },
//   buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '100%' },
// });
