import { firestore } from './firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const initializeCollections = async () => {
    console.log('Initializing collections...');
    try {
      const usuarioRef = doc(collection(firestore, 'usuarios'), 'placeholder');
      await setDoc(usuarioRef, {
        nombre: "usuario1234",
        email: "usuario1234@correo.com",
        fechaNacimiento: "2000-01-01",
        genero: "masculino",
        creadoEn: new Date(),
      });
      const medicamentoRef = doc(collection(usuarioRef, 'medicamentos'), 'placeholder');
      await setDoc(medicamentoRef, {
        nombre: "",
        dosis: "",
        intervalo: "",
        horaInicial: "",  
        imagen: "",
        color: "",
        creadoEn: new Date(),
      });
      const recordatorioRef = doc(collection(medicamentoRef, 'recordatorios'), 'placeholder');
      await setDoc(recordatorioRef, {
        tipo: "medicamento",
        proximaToma: "",
        estado: "pendiente",
        creadoEn: new Date(),
      });
      const historialRef = doc(collection(usuarioRef, 'historial_medicamentos'), 'placeholder');
      await setDoc(historialRef, {
          usuarioId: "",
          medicamentoId: "",
          fecha: "",
          dosisTomada: "",
          observaciones: "",
      });

      const citaRef = doc(collection(usuarioRef, 'citas_medicas'), 'placeholder');
      await setDoc(citaRef, {
          usuarioId: "",
          fecha: "",
          hora: "",
          doctor: "",
          especialidad: "",
          lugar: "",
          creadoEn: new Date(),
      });

      const recomendacionRef = doc(collection(usuarioRef, 'recomendaciones'), 'placeholder');
      await setDoc(recomendacionRef, {
          medicamentoId: "",
          usuarioId: "",
      });
    console.log('Colecciones inicializadas exitosamente');
  } catch (error) {
    console.error('Error al inicializar las colecciones: ', error);
  }

};
  
export default initializeCollections;
