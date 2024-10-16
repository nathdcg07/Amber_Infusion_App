import React from "react";
import {Alert,Dimensions, StyleSheet, Text, View, Image, StatusBar,TouchableOpacity,  ScrollView} from 'react-native';
import {useState,useCallback} from 'react';
import { Input, VStack, Select, Pressable, Modal, Button, FormControl  } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');
 export function RegistroMedicamento(){
  
  const [NombreComercial,setNombreComercial] = useState('');
  const [NombreGenerico,setNombreGenerico] = useState('');
  const [Dosis,setDosis] = useState('');
  const [Intervalo,setIntervalo] = useState('');
  const [Laboratorio,setLaboratorio] = useState('');
  const [SelectedImagen,setSelectedImagen]=useState(null);
  useFocusEffect(
    useCallback(() => {
      setNombreComercial('');
      setNombreGenerico('');
      setDosis('');
      setIntervalo('');
      setLaboratorio('');
      setSelectedImagen(null);
      setErrorNombreComercial('');
      setErrorNombreGenerico('');
      setErrorDosis('');
      setErrorIntervalo('');
      setErrorLaboratorio('');
      setErrorImage('');
    }, [])
  );

  const handleSubmit = () => {

    if (
      !errorNombreComercial &&
      !errorNombreGenerico &&
      !errorDosis &&
      !errorIntervalo &&
      !errorLaboratorio &&
      !errorImage &&
      SelectedImagen &&
      NombreComercial &&
      NombreGenerico &&
      Dosis &&
      Intervalo &&
      Laboratorio
    ) {
      console.log({
        NombreComercial,
        NombreGenerico,
        Dosis,
        Intervalo,
        Laboratorio,
        SelectedImagen
      });
    } else {
      Alert.alert('Error', 'Por favor llene todos los campos del formulario');
    }
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
    setErrorImage('Seleccione una imagen')
    return;
  }
  const uri = PickResult.assets?.[0]?.uri;
     setSelectedImagen(uri);
     setErrorImagen('');
  }
// Estados de errores
  const [errorNombreComercial, setErrorNombreComercial] = useState('');
  const [errorNombreGenerico, setErrorNombreGenerico] = useState('');
  const [errorDosis, setErrorDosis] = useState('');
  const [errorIntervalo, setErrorIntervalo] = useState('');
  const [errorLaboratorio, setErrorLaboratorio] = useState('');
  const [errorImage, setErrorImage]=useState('');
  
  const [ModalConfig, setModalConfig] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState({
    time: new Date(),  // Aquí almacenamos la hora seleccionada
  });
  //validaciones
  const validateNombreComercial = (text) => {
    const regex =  /^[a-zA-Z]{2,}$/; // Solo letras y espacios
    if (!regex.test(text)) {
      setErrorNombreComercial('El nombre comercial debe contener solo letras');
    } else {
      setErrorNombreComercial('');
    }
    setNombreComercial(text);
  };
  const validateNombreGenerico = (text) => {
    const regex = /^[a-zA-Z\s]{3,}$/; // Solo letras y espacios
    if (!regex.test(text)) {
      setErrorNombreGenerico('El nombre comercial debe contener solo letras y un minimo de 2 caracteres');
    } else {
      setErrorNombreGenerico('');
    }
    setNombreGenerico(text);
  };

  const handleTimeChange = (event, time) => {
    if (time) {
      setSelectedTime(time); // Guardar la hora seleccionada
    }
    setShowTimePicker(false); // Cerrar el selector después de elegir la hora
  };
  const validateLaboratorio=(text)=> {
    const regex = /^[a-zA-Z0-9\s]{3,}$/; // Solo letras y espacios
    if (!regex.test(text)) {
      setErrorLaboratorio('El nombre de laboratorio debe contener letras o numeros y un minimo de 3 caracteres');
    } else {
      setErrorLaboratorio('');
    }
    setLaboratorio(text);
  };
  
  

  
    return (

    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        
        <TouchableOpacity onPress={openImagePickerAsync}>
          
          <Image    
            source={{
              uri : SelectedImagen !== null
          ?  SelectedImagen  // URI dinámica
          : 'https://via.placeholder.com/100'// Placeholder local
          }}style={styles.icon} />
        </TouchableOpacity>
        {errorImage ? <Text style={styles.error}>{errorImage}</Text> : null}
        <StatusBar style='default'></StatusBar>
        <VStack space={4}>

        <View style={styles.form}>
          
          <Text style={styles.title}>Registro de Medicamento</Text>
          <Text style={styles.textForm}>Nombre Medicamento:</Text>
          
          
          <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1}
                value={NombreComercial}
                onChangeText={validateNombreComercial}
                ></Input>
          {errorNombreComercial ? <Text style={styles.error}>{errorNombreComercial}</Text> : null}


          <Text style={styles.textForm}>Nombre Generico:</Text>
          <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1}
                value={NombreGenerico}
                onChangeText={validateNombreGenerico}
          ></Input>
           {errorNombreGenerico ? <Text style={styles.error}>{errorNombreGenerico}</Text> : null}

          <Text style={styles.textForm}>Dosis:</Text>
          <Select size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1} selectedValue={Dosis} minWidth="200"  placeholder="Seleccione cantidad de Medicamento"
            onValueChange={(itemValue) => setDosis(itemValue)}>
            <Select.Item label='1/4' value="1/4" />
            <Select.Item label='1/2' value="1/2"/>
            <Select.Item label='3/4' value="3/4"/>
            <Select.Item label='1' value="1"/>
            <Select.Item label='2' value="2"/>
            <Select.Item label='3' value="3"/>
            <Select.Item label='4' value="4"/>
          </Select>
          {errorDosis ? <Text style={styles.error}>{errorDosis}</Text> : null}


          <Button onPress={()=>setModalConfig(true)}>Configurar Alarma</Button>
          <Modal isOpen={ModalConfig} onClose={()=>setModalConfig(false)}>
              <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Formulario</Modal.Header>
              <Modal.Body>
                <VStack space={3}>
                  <FormControl>
                    <FormControl.Label>Hora Seleccionada:</FormControl.Label>
                    <Text>{selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionada'}</Text>
                  </FormControl>
                  <FormControl>
                    <Button onPress={()=>setShowTimePicker(true)}>Ajustar Hora</Button>
                    <Modal isOpen={showTimePicker} onClose={()=>setShowTimePicker(false)}>
                      <DateTimePicker
                        value={selectedTime || new Date()}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                        is24Hour={true} // Opcional, para formato de 24 horas
                      />
                    </Modal>
                  
                  </FormControl>
                </VStack>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="ghost" onPress={() => setModalConfig(false)}>
                    Cancelar
                  </Button>
                  <Button onPress={()=>console.log(selectedTime.toLocaleTimeString())}>
                    Enviar
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Text style={styles.textForm}>Laboratorio:</Text>
          <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1}
                value={Laboratorio}
                onChangeText={validateLaboratorio}
          ></Input>
          {errorLaboratorio ? <Text style={styles.error}>{errorLaboratorio}</Text> : null} 
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}> Agregar</Text>
          </TouchableOpacity>
          <Link asChild href='/'>
            <Pressable style={styles.button_Secundary}>
              <Text style={styles.buttonText}>Atras</Text>
            </Pressable>
          </Link>
          
        
        </View>
      </VStack>
      
    </ScrollView>

    
    );
 }
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#90CAF9',      
      
    },
    page:{
      flex:1,
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
      marginBottom:20,
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
      width: 150,
      height: 150,
      marginBottom: 15,
      borderRadius: 15,
      resizeMode:'cover',
      marginTop:20,
    
    },
    button: {
      backgroundColor: '#64B5F6',
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
    textForm: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  
  });
