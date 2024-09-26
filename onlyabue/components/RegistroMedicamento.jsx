import React from "react";
import {Alert, Button,Dimensions, StyleSheet, Text, View, TextInput, Image, StatusBar,TouchableOpacity } from 'react-native';
import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';


const { width, height } = Dimensions.get('window');
 export function RegistroMedicamento(){
  
  const [NombreComercial,setNombreComercial] = useState('');
  const [NombreGenerico,setNombreGenerico] = useState('');
  const [Dosis,setDosis] = useState('');
  const [Intervalo,setIntervalo] = useState('');
  const [Laboratorio,setLaboratorio] = useState('');
  const [SelectedImagen,setSelectedImagen]=useState(null);
  const handleSubmit = () => {
    // Aquí puedes manejar la lógica del registro
    console.log({
     NombreComercial,
     NombreGenerico,
     Dosis,
     Intervalo,
     Laboratorio,
     SelectedImagen
    });
  };
  let openImagePickerAsync = async()=>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(permissionResult.granted===false){
      alert('Los permisos a galeria de imagenes son requeridos para continuar');
      return;
      }
      const PickResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:1,
      });     
      
      
  if(PickResult.canceled===true){
    return;
  }
  const uri = PickResult.assets?.[0]?.uri;
     setSelectedImagen(uri);
    
  }
    return (

    <View style={styles.container}>
      <View StyleSheet={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={openImagePickerAsync}>
        
        <Image    
        source={{
          uri : SelectedImagen !== null
      ?  SelectedImagen  // URI dinámica
      : 'https://via.placeholder.com/100'// Placeholder local
      }}style={styles.icon} />
      </TouchableOpacity>
      <StatusBar style='default'></StatusBar>
      
      <View style={styles.form}>
        
        <Text style={styles.title}>Registro de Medicamento</Text>
        <Text>Nombre Medicamento:</Text>
        <TextInput 
          style={styles.input}
          value={NombreComercial}
          onChangeText={setNombreComercial}
          
        ></TextInput>
        <Text>Nombre Generico:</Text>
        <TextInput 
          style={styles.input}
          value={NombreGenerico}  
          onChangeText={setNombreGenerico}
          
          ></TextInput>
        <Text>Dosis:</Text>
        <TextInput 
          style={styles.input}
          value={Dosis}  
          onChangeText={setDosis}
          keyboardType="numeric"
        ></TextInput>
        <Text>Intervalo:</Text>
        <TextInput 
          style={styles.input}
          value={Intervalo}
          onChange={setIntervalo}
          
        ></TextInput>
        <Text>Laboratorio:</Text>
        <TextInput 
          style={styles.input}
          value={Laboratorio}
          onChange={setLaboratorio}
          
        ></TextInput>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}> Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_Secundary}>
          <Text style={styles.buttonText}>Atras</Text>
        </TouchableOpacity>
      </View>
    
    </View>
    );
 }
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#90CAF9',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 20,
    },
    form:{
      backgroundColor: '#BBDEFB',
      padding: 20,
      borderRadius: 20,
      width: width * 0.8,
      height:height * 0.8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8,
      paddingVertical: 20,     
      
    },
    input: {
      width: '100%',
      padding: 10,
      borderRadius: 10,                  
      marginBottom: 10,
      fontSize: 16,
      backgroundColor:'#fff',
    },
    icon: {
      width: 100,
      height: 100,
      marginBottom: 15,
      borderRadius: 100,
      resizeMode:'cover'
    
    },
    button: {
      backgroundColor: '#0288d1',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 15,
    },
    backButton: {
      fontSize: 24,
      marginRight: 16,
      flexDirection:'row',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    button_Secundary: {
      backgroundColor: '#617371',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      
    },
  
  });
