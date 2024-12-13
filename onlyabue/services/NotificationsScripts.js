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

const scheduleNotifications = async ({ horaInicial, intervalo, dias, medicamento }) => {
    try {
      const fecha = new Date(horaInicial);
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes();
  
      for (const dia of dias) {
        const dayOfWeek = getDayOfWeekNumber(dia);
  

        let currentHour = hora;
        let currentMinute = minutos;
  
        while (currentHour < 24) {

          const trigger = {
            weekday: dayOfWeek, 
            hour: currentHour,
            minute: currentMinute,
            repeats: true, 
          };
  
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Es hora de tomar tu medicamento',
              body: `Recuerda tomar ${medicamento.nombreComercial}`,
              sound: true,
            },
            trigger,
          });
  
          
          currentHour += intervalo; 
          if (currentHour >= 24) break; 
        }
      }
  
      console.log('Notificaciones programadas correctamente.');
    } catch (error) {
      console.error('Error al programar notificaciones:', error);
    }
  };
  

  const getDayOfWeekNumber = (dia) => {
    const diasMap = {
      Domingo: 1,
      Lunes: 2,
      Martes: 3,
      Miercoles: 4,
      Jueves: 5,
      Viernes: 6,
      Sabado: 7,
    };
    return diasMap[dia] || null; 
  };