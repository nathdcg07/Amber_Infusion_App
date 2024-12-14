import { firestore } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc,setDoc, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

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
    // Referencia al documento del usuario con el ID proporcionado
    const usuarioDocRef = doc(firestore, 'usuarios', usuarioId);

    // Verificar si el documento existe
    const usuarioDoc = await getDoc(usuarioDocRef);
    if (!usuarioDoc.exists()) {
      console.error(`No se encontró un usuario con el ID: ${usuarioId}`);
      return [];
    }

    // Acceder a la subcolección "medicamentos" del usuario
    const medicamentosCollectionRef = collection(usuarioDocRef, 'medicamentos');
    const medicamentosSnapshot = await getDocs(medicamentosCollectionRef);

    // Mapear los documentos de la subcolección a un array
    const listaMedicamentos = medicamentosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return listaMedicamentos;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    return [];
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

export async function crearUsuario(user) {
  try {
    // Verifica si `user` es un array y accede al primer objeto si es necesario
    if (Array.isArray(user)) {
      user = user[0]; // Accede al primer objeto del array
    }

    // Verifica que `user` sea un objeto plano y no un array
    if (typeof user !== 'object' || Array.isArray(user)) {
      throw new Error("El parámetro 'user' debe ser un objeto plano.");
    }

    // Agrega el documento a la colección y recupera su referencia
    const docRef = await addDoc(collection(firestore, 'usuarios'), user);
    console.log(`Usuario creado con éxito. ID del documento: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error creando el usuario: ', error);
    return null; // Retorna null en caso de error
  }
}

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
/*export async function crearUsuario(email, fechaNacimiento, genero, nombre) {
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
*/
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

// import { doc, updateDoc } from 'firebase/firestore';
// import { firestore } from './firebase';

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
    // Referencia a la colección 'usuarios'
    const usuariosRef = collection(firestore, 'usuarios');
    const usuariosSnapshot = await getDocs(usuariosRef);
    
    // Búsqueda del token en cada documento de la colección
    for (const doc of usuariosSnapshot.docs) {
      const data = doc.data();
      
      // Verifica si el campo 'Token' del documento coincide con el token proporcionado
      if (data.Token === token) {
        return true;  // Token encontrado
      }
    }
    // Si ningún documento tiene el token, devuelve false
    return false;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return false;
  }
};

//Para obtener el nombre del doc
export const obtenerDocumentoPorToken = async (token) => {
  try {
    // Referencia a la colección 'usuarios'
    const usuariosRef = collection(firestore, 'usuarios');
    const usuariosSnapshot = await getDocs(usuariosRef);

    // Itera sobre los documentos en la colección
    for (const doc of usuariosSnapshot.docs) {
      const data = doc.data();

      // Verifica si el campo 'Token' coincide con el token proporcionado
      if (data.Token === token) {
        return doc.id; // Devuelve el ID del documento donde se encontró el token
      }
    }
    // Si no se encuentra el token, devuelve null
    return null;
  } catch (error) {
    console.error("Error al obtener el documento por token:", error);
    return null;
  }
};

//agregande funciones para en el token con mas datos
async function seleccionarImagen() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    registrarUsuario({
      token: 'token_example',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'López',
      edad: 65,
      sexo: 'Masculino',
      enfermedadesBase: ['Diabetes', 'Hipertensión'],
      instrumentacionMedica: ['Marcapasos'],
      tipoSangre: 'O+',
      imagenURI: result.uri, 
    });
  }
}

export const registrarUsuario = async ({
  token,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  edad,
  sexo,
  enfermedadesBase = [],
  instrumentacionMedica = [],
  tipoSangre,
  imagenURI,
}) => {
  try {
    await addDoc(collection(firestore, 'Usuarios'), {
      token,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      edad,
      sexo,
      enfermedadesBase, 
      instrumentacionMedica, 
      tipoSangre,
      imagenURI, 
    });

    console.log("Usuario registrado con éxito");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
};


//funciones para citas medicas crear, buscar, eliminar actualizar
/*export const crearCitaMedica = async (cita) => {
  try {
    const docRef = await addDoc(collection(firestore, "citas_medicas"), cita);
    console.log("Cita creada exitosamente. ID:", docRef.id);
  } catch (error) {
    console.error("Error al crear la cita:", error);
  }
};
*/
export const leerCitaMedica = async (id) => {
  const docRef = doc(firestore, "citas_medicas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No se encontró la cita.");
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


//funcion recordatorio cita medica
const calcularRecordatorioCita = (fechaCita) => {
  const unDiaAntes = new Date(fechaCita.getTime() - 24 * 60 * 1000);
  const dosHorasAntes = new Date(fechaCita.getTime() - 2 * 60 * 1000);
  
  return { unDiaAntes, dosHorasAntes };
};

//funcion para recuperdar datos del usuario

export const getUserData = async(usuarioId) =>{
  try{
    const usuarioDocRef = doc(firestore, 'usuarios', usuarioId);
    // Verificar si el documento existe
    const usuarioDoc = await getDoc(usuarioDocRef);
    if(usuarioDoc.exists()){
      return usuarioDoc.data();
    }
    else{
      return [];
    }
  }
  catch(e){
    console.error('error al obtener datos',e);
    return [];
  }

}


export const obtenerCitasPorUsuario = async (usuarioId) => {
  try {
    // Referencia al documento del usuario con el ID proporcionado
    const usuarioDocRef = doc(firestore, 'usuarios', usuarioId);

    // Verificar si el documento existe
    const usuarioDoc = await getDoc(usuarioDocRef);
    if (!usuarioDoc.exists()) {
      console.error(`No se encontró un usuario con el ID: ${usuarioId}`);
      return [];
    }

    // Acceder a la subcolección "medicamentos" del usuario
    const medicamentosCollectionRef = collection(usuarioDocRef, 'citas_medicas');
    const medicamentosSnapshot = await getDocs(medicamentosCollectionRef);

    // Mapear los documentos de la subcolección a un array
    const listaMedicamentos = medicamentosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return listaMedicamentos;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    return [];
  }
};

export const crearCitaMedica = async (usuarioId, cita) => {
  try {
      const usuarioRef = doc(collection(firestore, 'usuarios'), usuarioId);
      const citasRef = collection(usuarioRef, 'citas_medicas');  
      const docRef = await addDoc(citasRef, cita)    } catch (error) {
      console.error('Error al crear la cita médica:', error);
      throw error;
  }
};






