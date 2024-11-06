import { firestore } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';

// Para medicamentos
export const agregarMedicamento = async (medicamentoData) => {
  try {
    await addDoc(collection(firestore, 'medicamentos'), medicamentoData);
    console.log('Medicamento agregado correctamente');
  } catch (error) {
    console.error('Error al agregar medicamento:', error);
  }
};

export const obtenerMedicamentos = async () => {
  try {
    const medicamentosSnapshot = await getDocs(collection(firestore, 'medicamentos'));
    const listaMedicamentos = medicamentosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return listaMedicamentos;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
  }
};

export const obtenerMedicamentosPorUsuario = async (usuarioId) => {
  try {
    const q = query(collection(firestore, 'medicamentos'), where('usuarioId', '==', usuarioId));
    const medicamentosSnapshot = await getDocs(q);
    const listaMedicamentos = medicamentosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return listaMedicamentos;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
  }
};

export const actualizarMedicamento = async (medicamentoId, nuevosDatos) => {
  try {
    await updateDoc(doc(firestore, 'medicamentos', medicamentoId), nuevosDatos);
    console.log('Medicamento actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar medicamento:', error);
  }
};

export const eliminarMedicamento = async (medicamentoId) => {
  try {
    await deleteDoc(doc(firestore, 'medicamentos', medicamentoId));
    console.log('Medicamento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar medicamento:', error);
  }
};

// Para historial_medicamento
export const agregarHistorialMedicamento = async (userId, medicamentoId, fecha, hora, cantidad) => {
    const historialRef = doc(collection(firestore, 'historial_medicamentos'), userId);
  
    try {
      const historialSnapshot = await historialRef.get();
  
      if (historialSnapshot.exists()) {
        await updateDoc(historialRef, {
          medicamentos: arrayUnion({
            medicamentoId,
            fecha,
            hora,
            cantidad
          })
        });
      } else {
        await setDoc(historialRef, {
          medicamentos: [{
            medicamentoId,
            fecha,
            hora,
            cantidad
          }]
        });
      }
      console.log("Historial de medicamentos actualizado correctamente");
    } catch (error) {
      console.error("Error al agregar el medicamento al historial: ", error);
    }
  };

export const obtenerHistorialMedicamentosPorUsuario = async (usuarioId) => {
  try {
    const q = query(collection(firestore, 'historial_medicamentos'), where('usuarioId', '==', usuarioId));
    const querySnapshot = await getDocs(q);
    const historial = [];
    querySnapshot.forEach((doc) => {
      historial.push({ id: doc.id, ...doc.data() });
    });
    return historial;
  } catch (error) {
    console.error('Error al obtener el historial de medicamentos:', error);
  }
};

//Recomendaciones
export const agregarRecomendacion = async (recomendacionData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'recomendaciones'), recomendacionData);
      console.log('Recomendación agregada con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar recomendación:', error);
    }
};
  
//Recordatorios
export const agregarRecordatorio = async (recordatorioData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'recordatorios'), recordatorioData);
      console.log('Recordatorio agregado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar recordatorio:', error);
    }
};
  
export const eliminarRecordatorio = async (recordatorioId) => {
    try {
      await deleteDoc(doc(firestore, 'recordatorios', recordatorioId));
      console.log('Recordatorio eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar recordatorio:', error);
    }
};

export const verificarToken = async (token) => {
  try {
    const usuariosRef = collection(firestore, 'Usuarios');
    const q = query(usuariosRef, where('UserID', '==', token));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return false;
  }
};
