import { setDoc, doc, collection } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import { firestore } from '../../services/firebaseConfig';

export async function primerRecordatorio(medicamentoData) {
  const { usuarioId, medicamentoId, intervalo, horaInicial } = medicamentoData;

  const primeraNotificacion = new Date(horaInicial);
  const proximaNotificacion = new Date(primeraNotificacion);
  proximaNotificacion.setHours(proximaNotificacion.getHours() + intervalo);

  const recordatorioId = `${medicamentoId}_${new Date().getTime()}`;
  // const recordatorioId = `${new Date().getTime()}`;
  const usuarioPruebaRef = doc(collection(firestore, 'usuarios'), 'usuario1234');
  // const recordatorioRef = doc(collection(
  //   firestore,
  //   `usuarios/${usuarioId}/medicamentos/${medicamentoId}/recordatorios`,
  //   recordatorioId)
  // );
  const recordatorioRef = doc(
    collection(
      firestore,
      `usuarios/${usuarioId}/medicamentos/${medicamentoId}/recordatorios`
    ),
    recordatorioId
  );

  await setDoc(recordatorioRef, {
    proximaToma: proximaNotificacion.toISOString(),
    estado: 'pendiente',
    retrasadoVeces: 0,
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Es hora de tomar tu medicamento!",
      body: "Es momento de tomar tu dosis. ¿Lo has tomado?",
      data: { medicamentoId, usuarioId },
    },
    // trigger: { date: proximaNotificacion },
    trigger: { seconds: 10 }

  });
}
