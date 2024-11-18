import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export const getNameFromAsyncStorage = async () => {
  try {
    const name = await AsyncStorage.getItem('name'); // 'name' es la clave usada para guardar el dato
    if (name) {
      console.log('Nombre recuperado:', name);
      return name; // Devuelve el nombre si existe
    } else {
      console.log('No se encontró el nombre en AsyncStorage.');
      return null;
    }
  } catch (error) {
    console.error('Error al recuperar el nombre de AsyncStorage:', error);
    return null;
  }
};

// para guardar los medicamentos en un archivo
export async function saveMedsToFile(data) {
    try {
      const fileUri = FileSystem.documentDirectory + 'medicamentos.json'; // Ruta del archivo
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2)); // Guardar como JSON
      console.log('Medicamentos guardados en el archivo:', fileUri);
    } catch (error) {
      console.error('Error guardando medicamentos en el archivo:', error);
    }
  }
// para recuperar o cargar los medicamentos del archivo
export async function loadMedsFromFile() {
    try {
      const fileUri = FileSystem.documentDirectory + 'medicamentos.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      
      // Verificar si el archivo existe
      if (!fileExists.exists) {
        console.log('El archivo no existe.');
        return null;
      }
      
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      
      // Verificar si el contenido del archivo está vacío
      if (!fileContent || fileContent.trim().length === 0) {
        console.log('El archivo está vacío.');
        return null;
      }
  
      const meds = JSON.parse(fileContent);
      console.log('Medicamentos cargados desde el archivo:', meds);
      return meds;
      
    } catch (error) {
      console.error('Error cargando medicamentos desde el archivo:', error);
      return null;  // En caso de error, retornar null
    }
  }
  
  
