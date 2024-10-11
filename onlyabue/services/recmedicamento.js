const firebase = require('firebase/app');
require('firebase/firestore');

const db = firebase.firestore();

async function crearMedicamento() {
  const medicamento = {
    nombre: "Ibuprofeno",
    descripcion: "Antiinflamatorio y analgésico",
    dosis: "200mg",
    forma: "tabletas",
    cantidadTabletas: 30,
    tipoVenta: "Venta Libre",
    etiquetas: [] // Este array se llenará con IDs de etiquetas
  };

  try {
    const docRef = await db.collection('Medicamentos').add(medicamento);
    console.log("Medicamento agregado con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al agregar medicamento: ", error);
  }
}

// Llama a la función para agregar el medicamento
crearMedicamento();
