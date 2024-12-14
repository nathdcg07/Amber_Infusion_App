import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function solicitarPermisosNotificaciones() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Se necesitan permisos para recibir notificaciones.');
    return false;
  }
  return true;
}


export const initializeNotifications =()=>{
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        })
    });
};

export const programarNotificacion = async (recordatorioData) => {
    const { intervalo, horaInicial, dias, medicamentoCantidad,medicamentoPres,medicamentoNombre } = recordatorioData;
  
    // Extraer hora y minutos de selectedTime
    const date = new Date(horaInicial);
    const hour = date.getHours();
    const minute = date.getMinutes();
  
    for (const dia of dias) {
        try {
          const dayOfWeek = getDayOfWeekNumber(dia); // Convertir días en números
          const trigger = {
            weekday: dayOfWeek, // Día de la semana (1 = Domingo, 7 = Sábado)
            hour,
            minute,
            repeats: true,
          };
      
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Recordatorio de Medicamento",
              body: `Es hora de tomar tu medicamento. ${medicamentoNombre} ${medicamentoCantidad} ${medicamentoPres}`,
              sound: true,
              data: { medicamentoId: recordatorioData.medicamentoId },
            },
            trigger,
          });
        } catch (error) {
          console.error(`Error programando notificación para el día ${dia}:`, error);
        }
      }
  };
  
  // Convertir el nombre del día a número
  const getDayOfWeekNumber = (dia) => {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const index = diasSemana.indexOf(dia);
    if (index === -1) {
      throw new RangeError(`El día proporcionado no es válido: ${dia}`);
    }
    return index + 1; // Ajustar índice (0 = Domingo, necesitamos 1 = Domingo)
  };