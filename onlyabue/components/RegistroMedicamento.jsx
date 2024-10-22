import React from "react";
import {Alert,Dimensions, StyleSheet, Text,  Image, StatusBar,TouchableOpacity,  ScrollView} from 'react-native';
import {useState,useCallback} from 'react';
import { Input, VStack, Select, Pressable, Modal, Button, FormControl,View, Center, Box  } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import ColorPicker from 'react-native-wheel-color-picker';

const { width, height } = Dimensions.get('window');
 export function RegistroMedicamento(){
  
  const [NombreComercial,setNombreComercial] = useState('');
  const [NombreGenerico,setNombreGenerico] = useState('');
  const [Dosis,setDosis] = useState('');
  const [Intervalo,setIntervalo] = useState('');
  const [Tamanio, setTamanio]=useState('');
  const [Unidad, setUnidad]=useState('');
  const [Presentacion, setPresentacion]=useState('');
  const [SelectedImagen1,setSelectedImagen1]=useState(null);
  const [SelectedImagen2,setSelectedImagen2]=useState(null);
  const [Cantidad,setCantidad]=useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Estado para el color seleccionado
  const [showColorPicker, setShowColorPicker] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setNombreComercial('');
      setNombreGenerico('');
      setDosis('');
      setIntervalo('');      
      setTamanio('');
      setUnidad('');
      setPresentacion('');
      setSelectedImagen1(null);
      setSelectedImagen2(null);
      setCantidad('');
      setSelectedColor('');
// Setear errores            
      setErrorNombreComercial('');
      setErrorNombreGenerico('');
      setErrorDosis('');
      setErrorIntervalo('');      
      setErrorImagen1('');
      setErrorImagen2('');

    }, [])
  );

  const handleSubmit = () => {

    if (
      !errorNombreComercial &&
      !errorNombreGenerico &&
      !errorDosis &&
      !errorIntervalo &&
      !errorImage &&
      SelectedImagen &&
      NombreComercial &&
      NombreGenerico &&
      Dosis &&
      Intervalo 
      
    ) {
      console.log({
        NombreComercial,
        NombreGenerico,
        Dosis,
        Intervalo,        
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
    setErrorImagen1('Seleccione una imagen')
    return;
  }
  const uri = PickResult.assets?.[0]?.uri;
     setSelectedImagen1(uri);
     setErrorImagen1('');
  }
  let openImagePickerAsync2 = async()=>{
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
    setErrorImagen2('Seleccione una imagen')
    return;
  }
  const uri = PickResult.assets?.[0]?.uri;
     setSelectedImagen2(uri);
     setErrorImagen2('');
  }
  const handleColorChange = (color) => {
    setSelectedColor(color); 
    
  };
 
// Estados de errores
  const [errorNombreComercial, setErrorNombreComercial] = useState('');
  const [errorNombreGenerico, setErrorNombreGenerico] = useState('');
  const [errorDosis, setErrorDosis] = useState('');
  const [errorIntervalo, setErrorIntervalo] = useState('');
  const [errorTamanio,setErrorTamanio]=useState('');
  const [errorUnidad,setErrorUnidad]=useState('');
  const[errorPresentacion,setErrorPresentacion]=useState('');
  const [errorImagen1, setErrorImagen1]=useState('');
  const [errorImagen2, setErrorImagen2]=useState('');
  const [errorCantidad,setErrorCantidad]=useState('');
  const [errorSelectedColor,setErrorSelectedColor]=useState('');

  
  const [ModalConfig, setModalConfig] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  //validaciones
  const validateNombreComercial = (text) => {
    const regex =  /^[a-zA-Z\s]{2,}$/; // Solo letras y espacios
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
  const validate= (text)=>{
    if
  }
  const validateCantidad = (text)=>{
    const regex = /^[1-9]{1,3}$/;
    if(!regex.test(text)){
      setErrorCantidad('Ingrese un valor numerico valido');
    }else{
      setErrorCantidad('');
    }
    setCantidad(text);
  }
  const validateTamanio = (text)=>{
    const regex = /^ [1-9]$/;
    if(!regex.test(text)){
      setErrorTamanio('Ingrese un numero valido');
    }else{
      setErrorTamanio('');
    }
    setTamanio(text);
  }

  const handleTimeChange = (event, time) => {
    if (time) {
      setSelectedTime(time); // Guardar la hora seleccionada
    }
    setShowTimePicker(false); // Cerrar el selector después de elegir la hora
  };
  
  function FlechaColor(color){
      let flecha='#878787';
      if(color=='#000000'){
        flecha='#ffffff'
      }else if(color=='#ffffff'){
        flecha='#000000'
      }
      return(flecha);
  }
  
  

  
    return (

    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <StatusBar style='default'></StatusBar>
        <VStack space={4}>
        
        <View style={styles.form}>
        <Text style={styles.title}>Registro de Medicamento</Text>
          <View alignItems={"center"}>
            <Text style={styles.textForm}>Imagen del Medicamento:</Text>
            <TouchableOpacity onPress={openImagePickerAsync}>
{/* imagen medicamento */}
              <Image    
                source={{
                  uri : SelectedImagen1 !== null
              ?  SelectedImagen1  // URI dinámica
              : 'https://via.placeholder.com/100'// Placeholder local
              }}style={styles.icon} />
            </TouchableOpacity>
            {errorImagen1 ? <Text style={styles.error}>{errorImagen1}</Text> : null}
          </View>
          <View alignItems={"center"}>
            <Text style={styles.textForm}>Imagen Caja Medicamento:</Text>
            <TouchableOpacity onPress={openImagePickerAsync2}>
{/* imagen caja medicamento */}
              <Image    
                source={{
                  uri : SelectedImagen2 !== null
              ?  SelectedImagen2  // URI dinámica
              : 'https://via.placeholder.com/100'// Placeholder local
              }}style={styles.icon} />
            </TouchableOpacity>
            {errorImagen2 ? <Text style={styles.error}>{errorImagen2}</Text> : null} 
          </View>

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
          <Text style={styles.textForm}>Presentacion del medicamento:</Text>
          <Select size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1} selectedValue={Presentacion} minWidth="200"  placeholder="presentacion del Medicamento"
            onValueChange={(itemValue) => setPresentacion(itemValue)}>
              <Select.Item label="Comprimido" value="Comprimido"/>
              <Select.Item label="Capsula Blanda" value="Capsula Blanda"/>
              <Select.Item label="Inyectable" value="Inyectable"/>
              <Select.Item label="Loción Tópica" value="Locion Topica"/>
              <Select.Item label="Polvo" value="Polvo"/>
              <Select.Item label="Jarabe" value="Jarabe"/>
              <Select.Item label="Solucion Liquida" value="Solucion Liquida"/>

          </Select>
          <Text style={styles.textForm}>Cantidad:</Text>
          <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1}
                value={Cantidad}
                onChangeText={validateCantidad}></Input>
          {errorCantidad? <Text  style={styles.error}>{errorCantidad}</Text>:null}
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
          <Text style={styles.textForm}>Tamaño y unidad:</Text>
          <View style={{
            flexDirection:"row",
            justifyContent: "space-between"

          }}
          >
           <Input size={"xs"} variant={"outline"} backgroundColor={'white'} fontSize={14}
            borderRadius={7}
            marginTop={1}
            value={Tamanio}
            minWidth="100"
            onChange={validateTamanio}
           ></Input> 
           <Select size={"sm"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1} selectedValue={Unidad} minWidth="200"  placeholder="Selecciones Unidad"
                onValueChange={(itemValue) => setUnidad(itemValue)}>
            <Select.Item label="mg" value="mg"/>
            <Select.Item label="ml" value="ml"/>
            <Select.Item label="Unidades" value="unidades"/>
            <Select.Item label="g" value="g"/>
            <Select.Item label="UI/ml" value="UI/ml"/>
           </Select>
          </View>
          {errorTamanio? <Text style={styles.error}>{errorTamanio}</Text>:null}
         
{/* Modal Configuracion Alarma */}

          <Button onPress={()=>setModalConfig(true)} margin={"3"} style={styles.buttonText}>Configurar Alarma</Button>
          <Modal isOpen={ModalConfig} onClose={()=>setModalConfig(false)}>
              <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header >Configuracion Alarma</Modal.Header>
              <Modal.Body>
                <VStack space={3}>
                  <FormControl>
                  <FormControl.Label>Hora Seleccionada:</FormControl.Label>
                    <Button  variant="outline" backgroundColor="white" endIcon={<MaterialIcons name="arrow-forward-ios" size={18} color="#878787" />}
                     onPress={()=>setShowTimePicker(true)}>
                      <Text>{selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionada'}</Text>
                      
                    </Button>
                    <Modal isOpen={showTimePicker} onClose={()=>setShowTimePicker(false)}>
                      <DateTimePicker
                        value={selectedTime || new Date()}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                        is24Hour={true} 
                      />
                    </Modal>
                  </FormControl>
                  <View>
                    <Text>Intervalo:</Text>
                    <Select size={"lg"} 
                        variant={"outline"}
                         backgroundColor={'white'} 
                         fontSize={14}
                         borderRadius={7} 
                         marginTop={1} 
                         selectedValue={Intervalo}
                         minWidth="200"  
                         placeholder="Seleccione Intervalo"
                         onValueChange={(itemValue) => setIntervalo(itemValue)}>
                      <Select.Item label='1 Hora' value="1" />
                      <Select.Item label='2 Horas' value="2" />
                      <Select.Item label='4 Horas' value="4" />
                      <Select.Item label='6 Horas' value="6" />
                      <Select.Item label='8 Horas' value="8"/>
                      <Select.Item label='12 Horas' value="12"/>
                      <Select.Item label='24 Horas' value="24"/>
                    </Select>
                  </View>
                  <FormControl>
                    <FormControl.Label>Seleccione un Color:</FormControl.Label>
                    <Pressable onPress={() => setShowColorPicker(true)}>
                    <View style={{ 
                        flexDirection: "row",  // Alinear contenido horizontalmente
                        alignItems: "center",  // Alinear verticalmente el contenido en el centro
                        width: width * 0.60, 
                        height: 35, 
                        backgroundColor: selectedColor,  // Color seleccionado
                        borderRadius: 10, 
                        margin: 10, 
                        borderWidth: 1, 
                        borderColor: '#878787', 
                        paddingHorizontal: 10,  // Añadimos padding para los elementos dentro
                        justifyContent: "space-between" // Espacio entre el color y la flecha
                      }}>
                        {/* Cuadro de color */}
                        <View style={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: 5, 
                          backgroundColor: selectedColor  // Color seleccionado
                        }} />
                          <MaterialIcons name="arrow-forward-ios" size={18} color={FlechaColor(selectedColor)} />
                      </View>
                        
                          
                          
                          
                    </Pressable>
                    <Modal isOpen={showColorPicker} onClose={() => setShowColorPicker(false)}>
                      <Modal.Content Width={width*0.8} > {/* Ajustamos el tamaño */}
                        <Modal.Header fontSize="3xl">Seleccione un Color</Modal.Header>
                        <Modal.Body>
                          <ScrollView>
                              {/* Color Picker Wheel */}
                              <ColorPicker
                                color={selectedColor}
                                onColorChange={handleColorChange}
                                thumbSize={20}
                                sliderSize={30}
                                noSnap={true}
                                row={false}
                                swatches={true} // Mostrar colores base
                                swatchesOnly={false} // Mostrar solo los colores base
                                swatchesLast={false} // Posicionar la rueda debajo de los colores base
                                discrete={true}
                                style={{ width: '100%', height: '100%' }} // Tamaño reducido
                               
                              />
                          </ScrollView>
                          
                        </Modal.Body>
                        <Modal.Footer> 
                          <Button  onPress={()=>setShowColorPicker(false)}>Confirmar</Button>                         
                        </Modal.Footer>
                      </Modal.Content>
                    </Modal>
                  </FormControl>
                </VStack>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="ghost" onPress={() => setModalConfig(false)}>
                    Cancelar
                  </Button>
                  <Button onPress={()=>{console.log(selectedTime.toLocaleTimeString());
                      console.log(Intervalo);
                      console.log(selectedColor);
                  }}>
                    Enviar
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
         
          <View alignItems={"center"}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}> Agregar</Text>
            </TouchableOpacity>
            <Link asChild href='/'>
              <Pressable style={styles.button_Secundary}>
                <Text style={styles.buttonText}>Atras</Text>
              </Pressable>
            </Link>
          </View>
          
          
        
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
      textAlign: 'center',
    },
    form:{
      backgroundColor: '#BBDEFB',
      padding: 20,
      borderRadius: 20,
      width: width * 0.9,
      marginBottom:20,
      marginTop:20,
      
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
      paddingVertical: 20,
      textAlign:'left',
      
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
