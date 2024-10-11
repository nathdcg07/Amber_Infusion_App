import { firestore } from './firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const initializeCollections = async () => {
    console.log('Initializing collections...');
  try {
    await setDoc(doc(collection(firestore, 'usuarios'), 'placeholder'), {
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

    await setDoc(doc(collection(firestore, 'citas_medicas'), 'placeholder'), {
      usuarioId: "",
      fecha: "",
      hora: "",
      doctor: "",
      especialidad: "",
      lugar: "",
      creadoEn: new Date(),
    });

    await setDoc(doc(collection(firestore, 'recomendaciones'), 'placeholder'), {
      medicamentoId: "",
      usuarioId: "",
    });

    
  await setDoc(doc(collection(firestore, 'reco_medicamentos'), 'placeholder'), {
    nombre: "Ibuprofeno",
    descripcion: "Antiinflamatorio y analgésico",
    dosis: "200mg",
    forma: "tabletas",
    cantidadTabletas: 30,
    tipoVenta: "Venta Libre",
    etiquetas: [], // Este array se llenará con IDs de etiquetas
    creadoEn: new Date(),
  });
  
    console.log('Colecciones inicializadas exitosamente');
  } catch (error) {
    console.error('Error al inicializar las colecciones: ', error);
  }

};
  
export default initializeCollections;
