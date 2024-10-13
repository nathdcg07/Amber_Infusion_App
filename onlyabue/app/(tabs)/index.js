import { View } from 'native-base';
import { AlarmHome } from '../../components/alarmHome';

import React, { useEffect } from 'react';

import initializeCollections from '../../services/initFirestore';
import { agregarMedicamento, 
  obtenerMedicamentos, 
  obtenerMedicamentosPorUsuario, 
  actualizarMedicamento, 
  eliminarMedicamento } from '../../services/firestoreService';

export default function Index() {

    useEffect(() => {
        const init = async () => {
        try {
            await initializeCollections();
        } catch (err) {
            console.log(err);
        }};

        init();
    }, []);
    
    return (
        <View flex={1}>
          <AlarmHome/>
          </View>     
      );
}