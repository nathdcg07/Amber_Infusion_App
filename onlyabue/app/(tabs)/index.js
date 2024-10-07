import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
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

    useEffect(() => {
        const agregarMedicamentoEjemplo = async () => {
          try {
            await agregarMedicamento({
              nombre: 'Paracetamol',
              dosis: '500mg',
              usuarioId: 'usuario1234',
              creadoEn: new Date(),
            });
            console.log('Medicamento agregado correctamente');
          } catch (error) {
            console.error('Error al agregar medicamento:', error);
          }
        };
        const obtenerDatos = async () => {
          const medicamentos = await obtenerMedicamentos();
          console.log('Medicamentos:', medicamentos);
        };
    
        const medicamentosPorUsuario = async () => {
          const medicamentosUsuario = await obtenerMedicamentosPorUsuario('usuario123');
          console.log('usuario123', medicamentosUsuario);
        }
        const actualizarMed = async () => {
          actualizarMedicamento('PSDBxeQM9HdwtEjbdElz', { dosis: '1000mg' });
        }
    
        const eliminarMed = async () => {
          eliminarMedicamento('N5sIPyXh11e1I1r0rSQm');
        }
    
        // eliminarMed();
        agregarMedicamentoEjemplo();
    
    }, []);
    
    return (
        <View flex={1}>
          <AlarmHome/>
          </View>     
      );
}