async function crearEtiqueta() {
    const etiqueta = {
      nombre: "analgésico",
      descripcion: "Medicamento para aliviar el dolor"
    };
  
    try {
      const docRef = await db.collection('Etiquetas').add(etiqueta);
      console.log("Etiqueta agregada con ID: ", docRef.id);
    } catch (error) {
      console.error("Error al agregar etiqueta: ", error);
    }
  }
  
  // Llama a la función para agregar la etiqueta
  crearEtiqueta();
  