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


//Recomendaciones de la tabla rec_medicamentos
export const agregarRecomendacionMedicamentos = async (recomendacionesData) => {
  try {
    const docRef = await addDoc(collection(firestore, 'reco_medicamentos'), recomendacionesData);
    console.log('Recomendación agregada con ID:', docRef.id);
  } catch (error) {
    console.error('Error al agregar recomendación:', error);
  }
};

//usuarios
async function crearUsuario(email, fechaNacimiento, genero, nombre) {
  try {
    const nuevoUsuario = {
      email,
      fechaNacimiento,
      genero,
      nombre,
    };

    await setDoc(doc(collection(firestore, 'usuarios')), nuevoUsuario);
    console.log('Usuario creado con éxito');
  } catch (error) {
    console.error('Error creando el usuario: ', error);
  }
}

async function obtenerUsuario(id) {
  try {
    const docRef = doc(firestore, 'usuarios', id);
    const usuario = await getDoc(docRef);

    if (usuario.exists()) {
      console.log('Datos del usuario:', usuario.data());
    } else {
      console.log('No se encontró el usuario');
    }
  } catch (error) {
    console.error('Error obteniendo el usuario: ', error);
  }
}

import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

async function actualizarUsuario(id, nuevosDatos) {
  try {
    const docRef = doc(firestore, 'usuarios', id);

    await updateDoc(docRef, nuevosDatos);
    console.log('Usuario actualizado con éxito');
  } catch (error) {
    console.error('Error actualizando el usuario: ', error);
  }
}

async function eliminarUsuario(id) {
  try {
    const docRef = doc(firestore, 'usuarios', id);
    await deleteDoc(docRef);
    console.log('Usuario eliminado con éxito');
  } catch (error) {
    console.error('Error eliminando el usuario: ', error);
  }
}

crearUsuario('email@ejemplo.com', '1990-01-01', 'masculino', 'Miguel Robledo');
obtenerUsuario('idDelUsuario');
actualizarUsuario('idDelUsuario', { nombre: 'Nuevo Nombre', genero: 'femenino' });


//recomendaciones medicamento
export const crearMedicamento = async (medicamento) => {
  await setDoc(doc(collection(db, 'reco_medicamentos')), {
    medicamentoId: medicamento.medicamentoId,
    usuarioId: medicamento.usuarioId,
    nombre: medicamento.nombre,
    descripcion: medicamento.descripcion,
    dosis: medicamento.dosis,
    forma: medicamento.forma,
    cantidadTabletas: medicamento.cantidadTabletas,
    tipoVenta: medicamento.tipoVenta,
    etiquetas: medicamento.etiquetas,  // Array de IDs de etiquetas
    creadoEn: new Date(),
  });
};

//leer la reco 
export const leerMedicamento = async (id) => {
  const docRef = doc(db, "reco_medicamentos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No existe ese medicamento.");
  }
};

//crear etiquetas
export const crearEtiqueta = async (etiqueta) => {
  await setDoc(doc(collection(db, 'etiquetas')), {
    nombre: etiqueta.nombre,
    descripcion: etiqueta.descripcion,
    creadoEn: new Date(),
  });
};

//leer etiquetas
export const leerEtiqueta = async (id) => {
  const docRef = doc(db, "etiquetas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No existe esa etiqueta.");
  }
};

//actualizar etiqueta
export const actualizarEtiqueta = async (id, data) => {
  const docRef = doc(db, "etiquetas", id);
  await updateDoc(docRef, data);
};

//eliminar etiqueta
export const eliminarEtiqueta = async (id) => {
  await deleteDoc(doc(db, "etiquetas", id));
};

//para el token
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

//funciones para citas medicas crear, buscar, actualizar, borrar
export const crearCitaMedica = async (cita) => {
  try {
    const docRef = await addDoc(collection(firestore, "citas_medicas"), cita);
    console.log("Cita creada exitosamente", docRef.id);
  } catch (error) {
    console.error("Error al crear la cita:", error);
  }
};

export const leerCitaMedica = async (id) => {
  const docRef = doc(firestore, "citas_medicas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No se encontró la cita");
    return null;
  }
};

export const actualizarCitaMedica = async (id, nuevosDatos) => {
  const docRef = doc(firestore, "citas_medicas", id);
  await updateDoc(docRef, nuevosDatos);
  console.log("Cita actualizada con éxito");
};

export const eliminarCitaMedica = async (id) => {
  await deleteDoc(doc(firestore, "citas_medicas", id));
  console.log("Cita eliminada con éxito");
};

