import { firestore } from './firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const initializeCollections = async () => {
    console.log('Initializing collections...');
  try {
    await setDoc(doc(collection(firestore, 'usuarios'), 'placeholder'), {
      userId:"",
      nombre: "",
      email: "",
      fechaNacimiento: "",
      genero: "",
      creadoEn: new Date(),
    });
    
    await setDoc(doc(collection(firestore, 'medicamentos'), 'placeholder'), {
      nombre: "",
      dosis: "",
      dias: [],  
      horas: [],
      imagen: "",
      color: "",
    });

    await setDoc(doc(collection(firestore, 'recordatorios'), 'placeholder'), {
      tipo: ["medicamento", "cita medica"],
      fecha: "",
      hora: "",
      repeticion: "",
      usuarioId: "",
      medicamentoId: "",
      creadoEn: new Date(),
    });

    await setDoc(doc(collection(firestore, 'historial_medicamentos'), 'placeholder'), {
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

      const recomendacionRef = doc(collection(usuarioRef, 'reco_medicamentos'), 'placeholder');
      await setDoc(recomendacionRef, {
          medicamentoId: "",
          usuarioId: "",
      nombre: "",
      descripcion: "",
      dosis: "",
      forma: "",
      cantidadTabletas: '',
      tipoVenta: "",
      etiquetas: [], // Este array se llenará con IDs de etiquetas
      creadoEn: new Date(),
    });

    await setDoc(doc(collection(firestore, 'etiquetas'), 'placeholder'), {
      nombre: "analgésico",
      descripcion: "Medicamento para aliviar el dolor",
      creadoEn: new Date(),
      });
    console.log('Colecciones inicializadas exitosamente');
  } catch (error) {
    console.error('Error al inicializar las colecciones: ', error);
  }

};
  
export default initializeCollections;
