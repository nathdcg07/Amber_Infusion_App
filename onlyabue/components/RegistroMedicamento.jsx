import React from "react";
import { Alert, Dimensions, Text, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useState,useCallback,useEffect } from 'react';
import { Input, VStack, Select, Pressable, Modal, Button, FormControl, View,Box,Checkbox } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import { Link, useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../Styles/GlobalStyles";
import ColorPicker from 'react-native-wheel-color-picker';
import { firestore, storage } from '../services/firebaseConfig';
import { collection, addDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getNameFromAsyncStorage } from "../services/frontServices";
import CustomImagePicker from './ImagePicker';
import { primerRecordatorio } from "./recordatorios/notificacionesService";
import { programarNotificacion } from "../services/NotificationsScripts";



const { width, height } = Dimensions.get('window');
 export function RegistroMedicamento(){
  
  const router = useRouter();
  const [NombreComercial,setNombreComercial] = useState('');
  const [NombreGenerico,setNombreGenerico] = useState('');
  const [Dosis,setDosis] = useState('');
  const [Intervalo,setIntervalo] = useState('');
  const [Tamanio, setTamanio]=useState('');
  const [Unidad, setUnidad]=useState('');
  const [Presentacion, setPresentacion]=useState('');
  const [selectedImageMed, setSelectedImageMed] = useState('');
  const [selectedImageBox, setSelectedImageBox] = useState('');
  const [Cantidad,setCantidad]=useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Estado para el color seleccionado
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('W2H5OUAzK5maXu5jcww5');
  const [selectedDays, setSelectedDays] = useState([]); 

  const daysOfWeek = [
    { label: 'Lunes', value: 'Lunes' },
    { label: 'Martes', value: 'Martes' },
    { label: 'Miércoles', value: 'Miercoles' },
    { label: 'Jueves', value: 'Jueves' },
    { label: 'Viernes', value: 'Viernes' },
    { label: 'Sábado', value: 'Sabado' },
    { label: 'Domingo', value: 'Domingo' },
  ];

  const handleCheckboxChange = (day) => {
      setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        // Si el día ya está seleccionado, lo eliminamos
        return prevDays.filter((selectedDay) => selectedDay !== day);
      } else {
        // Si el día no está seleccionado, lo añadimos
        return [...prevDays, day];
      }
    });
  };
  const aceptarFunc=()=>{
    console.log(selectedDays);
    setModalConfig(false) 
  }

useEffect(() => {
  const fetchUser = async () => {
    //const fetchedUser = await getNameFromAsyncStorage();
    const fetchedUser = 'W2H5OUAzK5maXu5jcww5';
    setUser(fetchedUser);
  };
  fetchUser();
}, []);

  useFocusEffect(
    useCallback(() => {
      setNombreComercial('');
      setNombreGenerico('');
      setDosis('');
      setIntervalo('');      
      setTamanio('');
      setUnidad('');
      setPresentacion('');
      setSelectedImageMed(null);
      setSelectedImageBox(null);
      setCantidad('');
      setSelectedColor('');
      setSelectedTime('');
// Setear errores            
      setErrorNombreComercial('');
      setErrorNombreGenerico('');
      setErrorDosis('');
      setErrorIntervalo('');    
      setTamanio('');
      setErrorImageMed('');
      setErrorImageBox('');
      setCantidad('');     
    }, [])
  );

  const handleSubmit = async () => {
    if (
      !errorNombreComercial &&
      !errorNombreGenerico &&
      !errorDosis &&
      !errorIntervalo && 
      !errorImageMed &&     
      !errorImageBox &&
      selectedImageMed &&
      selectedImageBox &&
      NombreComercial &&
      NombreGenerico &&
      Intervalo &&
      Unidad &&
      Tamanio &&
      Presentacion &&
      Cantidad &&
      selectedColor
    ) {
      try {
        if (errorImageMed && errorImageBox && !selectedImageMed && !selectedImageBox) {
          alert('Debe seleccionar una imagen');
          return;
        }
        setLoading(true);
        const usuarioPruebaRef = doc(collection(firestore, 'usuarios'), user);
        const imageMedUrl = await uploadImage(selectedImageMed);
        const imageBoxUrl = await uploadImage(selectedImageBox);
        const docRef = await addDoc(collection(usuarioPruebaRef, 'medicamentos'), {
          imagenMedUrl: imageMedUrl,
          imagenBoxUrl: imageBoxUrl,
          nombreComercial: NombreComercial,
          nombreGenerico: NombreGenerico,
          dosis: Dosis,
          intervalo: Intervalo,
          tamanio: Tamanio,
          unidad: Unidad,
          presentacion: Presentacion,
          cantidad: Cantidad,
          color: selectedColor,
          hora: selectedTime,
          creadoEn: new Date(),
          dias: selectedDays,
        });
  
        const recordatorioData = {
          medicamentoId: docRef.id,
          usuarioId: usuarioPruebaRef.id,
          medicamentoNombre: NombreComercial,
          intervalo: Intervalo,
          horaInicial: selectedTime,
          dias: selectedDays,
        };
  
        if (selectedTime) {
          await programarNotificacion(recordatorioData);
        }
  
        alert('Medicamento registrado correctamente');
        console.log("Medicamento agregado con ID: ", docRef.id);
  
      } catch (error) {
        console.error("Error agregando el medicamento: ", error);
        alert('Error al registrar el medicamento');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Por favor llene todos los campos del formulario');
    }
  };
  
  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "Imagenes/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Progreso: " + progress + "% terminado.");
        },
        (error) => {
          console.error("Error durante la subida: ", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
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
  const [errorImageMed, setErrorImageMed]=useState('');
  const [errorImageBox, setErrorImageBox]=useState('');
  const [errorCantidad,setErrorCantidad]=useState('');
  const [ModalConfig, setModalConfig] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  //validaciones
  const validateNombreComercial = (text) => {
    const regex = /^[a-zA-Z0-9\s]{2,}$/; // Solo letras y espacios
    if (!regex.test(text)) {
      setErrorNombreComercial('El nombre comercial no debe estar vacío.');
    } else {
      setErrorNombreComercial('');
    }
    setNombreComercial(text);
  };
  const validateNombreGenerico = (text) => {
    const regex = /^[a-zA-Z0-9\s]{3,}$/; // Solo letras y espacios
    if (!regex.test(text)) {
      setErrorNombreGenerico('El nombre comercial no debe estar vacío.');
    } else {
      setErrorNombreGenerico('');
    }
    setNombreGenerico(text);
  };
  
  const validateIntervalo = ()=> {
    
    if(Intervalo==null){
      setErrorIntervalo('Seleccione un intérvalo.');
    }else{
      setErrorIntervalo('');
    }        
  }
  
  const validateCantidad = (text)=>{
    const regex = /^[0-9]*\.?[0-9]+$/;
    if(!regex.test(text)){
      setErrorCantidad('Ingrese un valor numérico válido.');
    }else{
      setErrorCantidad('');
    }
    setCantidad(text);
  }

  const validateTamanio = (text)=>{
    const regex = /^[0-9]*\.?[0-9]+$/;
    if(!regex.test(text)){
      setErrorTamanio('Ingrese un valor numérico válido.');
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

  const ComponentesSegunPresentacion = ()=>{
    switch(Presentacion){
      case 'Inyectable':
        return('');
      case 'Loción Tópica':
        return('');
      case 'Polvo':
        return('');
      case 'Jarabe':
        return(
        <View>
          <Text style={styles.textForm}>Dosis:</Text> 
          <Select size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
              borderRadius={7}
              marginTop={1} selectedValue={Dosis} minWidth="200"  placeholder="Dosis del Medicamento."
            onValueChange={(itemValue) => setDosis(itemValue)}>
            <Select.Item label='1.25 ml' value="1.25" />
            <Select.Item label='2.5 ml' value="2.5"/>
            <Select.Item label='5 ml' value="5"/>
            <Select.Item label='7 ml' value="7"/>
            <Select.Item label='10ml' value="10"/>
          </Select>
        </View>
        );
        case 'Solución Líquida':
          return(
            <View>
            <Text style={styles.textForm}>Dosis:</Text> 
            <Select size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1} selectedValue={Dosis} minWidth="200"  placeholder="Dosis Diaria del Medicamento."
              onValueChange={(itemValue) => setDosis(itemValue)}>
              <Select.Item label='5 gotas' value="5" />
              <Select.Item label='10 gotas' value="10"/>
              <Select.Item label='15 gotas' value="15"/>
              <Select.Item label='20 gotas' value="20"/>
              <Select.Item label='25 gotas' value="25"/>
              <Select.Item label='30 gotas' value="30"/>
              <Select.Item label='35 gotas' value="35"/>
              <Select.Item label='40 gotas' value="40"/>
              <Select.Item label='45 gotas' value="45"/>
            </Select>
          </View>
          );
          case 'Cápsula Blanda':
            return(
            <View>
              <Text style={styles.textForm}>Dosis:</Text> 
              <Select size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                  borderRadius={7}
                  marginTop={1} selectedValue={Dosis} minWidth="200"  placeholder="Dosis Diaria del Medicamento."
                onValueChange={(itemValue) => setDosis(itemValue)}>
                 
                <Select.Item label='1' value="1"/>
                <Select.Item label='2' value="2"/>
                <Select.Item label='3' value="3"/>
                <Select.Item label='4' value="4"/>
              </Select>
          </View>
            );
           
      default:
        return(
          <View>
              <Text style={styles.textForm}>Dosis:</Text> 
              <Select size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                  borderRadius={7}
                  marginTop={1} selectedValue={Dosis} minWidth="200"  placeholder="Dosis Diaria del Medicamento."
                onValueChange={(itemValue) => setDosis(itemValue)}>
                <Select.Item label='1/4' value="1/4" />
                <Select.Item label='1/2' value="1/2"/>
                <Select.Item label='3/4' value="3/4"/>
                <Select.Item label='1' value="1"/>
                <Select.Item label='2' value="2"/>
                <Select.Item label='3' value="3"/>
                <Select.Item label='4' value="4"/>
              </Select>
          </View>      
    );}
  }
  
  

  
    return (
<Box bg="#027AA7" flex={1} p={4} position="relative">
  <View style={styles.topSemiCirclep}></View>
  <View style={styles.middleRigthSemiCircle}></View>
  <View style={styles.middleLeftSemiCircle}></View>
  <View>
    <TouchableOpacity onPress={() => router.back()} style={styles.BackIconButton}>
      <Ionicons name="arrow-back-circle" size={50} color="black" />
    </TouchableOpacity>
  </View>
  <ScrollView  contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <StatusBar style='default'/>
        <VStack space={4}>  
        <View style={styles.form}>
        <Text style={styles.Titulo}>Registro de Medicamento</Text>
          <View alignItems={"center"}>
            <Text style={styles.textForm}>Foto del Medicamento:</Text>
            <CustomImagePicker
              selectedImage={selectedImageMed}
              setSelectedImage={setSelectedImageMed}
              errorImage={errorImageMed}
              setErrorImage={setErrorImageMed}
            />
            <Text style={styles.textForm}>Foto de la caja</Text>
            <CustomImagePicker
              selectedImage={selectedImageBox}
              setSelectedImage={setSelectedImageBox}
              errorImage={errorImageBox}
              setErrorImage={setErrorImageBox}
            />
          </View>

          <Text style={styles.textForm}>Nombre Medicamento:</Text>
          <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1}
                value={NombreComercial}
                onChangeText={validateNombreComercial}
                ></Input>
          {errorNombreComercial ? <Text style={styles.error}>{errorNombreComercial}</Text> : null}

          <Text style={styles.textForm}>Nombre Genérico:</Text>
          <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1}
                value={NombreGenerico}
                onChangeText={validateNombreGenerico}
          ></Input>
           {errorNombreGenerico ? <Text style={styles.error}>{errorNombreGenerico}</Text> : null}
          <Text style={styles.textForm}>Presentación del Medicamento:</Text>
          <Select size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1} selectedValue={Presentacion} minWidth="200"  placeholder="Presentación del Medicamento"
            onValueChange={(itemValue) => {setPresentacion(itemValue); 
                                          setDosis('');}}>
              <Select.Item label="Comprimido" value="Comprimido"/>
              <Select.Item label="Capsula Blanda" value="Capsula Blanda"/>
              <Select.Item label="Inyectable" value="Inyectable"/>
              <Select.Item label="Loción Tópica" value="Locion Topica"/>
              <Select.Item label="Polvo" value="Polvo"/>
              <Select.Item label="Jarabe" value="Jarabe"/>
              <Select.Item label="Solución Líquida" value="Solucion Liquida"/>

          </Select>
          <Text style={styles.textForm}>Cantidad Total del Medicamento:</Text>
          <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1}
                value={Cantidad}
                onChangeText={validateCantidad}></Input>
          {errorCantidad? <Text  style={styles.error}>{errorCantidad}</Text>:null}
          
          {ComponentesSegunPresentacion()}
          
          {errorDosis ? <Text style={styles.error}>{errorDosis}</Text> : null}
          <Text style={styles.textForm}>Gramaje:</Text>
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
            onChangeText={validateTamanio}
           ></Input> 
           <Select size={"sm"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                borderRadius={7}
                marginTop={1} selectedValue={Unidad} minWidth="200"  placeholder="Unidad de Gramaje"
                onValueChange={(itemValue) => setUnidad(itemValue)}>
            <Select.Item label="mg" value="mg"/>
            <Select.Item label="ml" value="ml"/>
            <Select.Item label="Unidades" value="unidades"/>
            <Select.Item label="g" value="g"/>
            <Select.Item label="UI/ml" value="UI/ml"/>
           </Select>
          </View>
          {errorTamanio? <Text style={styles.error}>{errorTamanio}</Text> : null}
         
{/* Modal Configuracion Alarma */}

          <Button onPress={()=>setModalConfig(true)} margin={"3"} style={styles.buttonText}>Configurar Alarma</Button>
          <Modal isOpen={ModalConfig} onClose={()=>setModalConfig(false)}>
              <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header >Configuración Alarma</Modal.Header>
              <Modal.Body>
                <VStack space={3}>
                  <FormControl>
                  <FormControl.Label>Hora Inicial:</FormControl.Label>
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
                    <Text>Intérvalo:</Text>
                    <Select size={"lg"} 
                        variant={"outline"}
                         backgroundColor={'white'} 
                         fontSize={14}
                         borderRadius={7} 
                         marginTop={1} 
                         selectedValue={Intervalo}
                         minWidth="200"  
                         placeholder="Seleccione Intervalo"
                         onValueChange={(itemValue) => {setIntervalo(itemValue);
                            validateIntervalo();
                         }}>
                      <Select.Item label='1 Hora' value="1" />
                      <Select.Item label='2 Horas' value="2" />
                      <Select.Item label='4 Horas' value="4" />
                      <Select.Item label='6 Horas' value="6" />
                      <Select.Item label='8 Horas' value="8"/>
                      <Select.Item label='12 Horas' value="12"/>
                      <Select.Item label='24 Horas' value="24"/>
                    </Select>
                    {errorIntervalo ? <Text style={styles.error}>{errorIntervalo}</Text>: null}
                  </View>
                  <FormControl>
                    <FormControl.Label>Tag Color:</FormControl.Label>
                    <Pressable onPress={() => setShowColorPicker(true)}>
                    <View style={[styles.ColorPickerBase,{ backgroundColor: selectedColor}]}>
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
                      <Modal.CloseButton/>
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
              <FormControl ml={10} pb={5}>
              <FormControl.Label>Días de la semana:</FormControl.Label>
                <ScrollView>
                  {daysOfWeek.map((day) => (
                    <Checkbox
                      key={day.value}
                      isChecked={selectedDays.includes(day.value)} // Verificar si el día está seleccionado
                      onChange={() => handleCheckboxChange(day.value)} // Manejar el cambio manualmente
                      onPress
                    >
                      {day.label}
                    </Checkbox>
                  ))}
                </ScrollView>
              </FormControl>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="ghost" onPress={() => setModalConfig(false)}>
                    Cancelar
                  </Button>
                  <Button onPress={aceptarFunc}>
                    Aceptar
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
         
          <View alignItems={"center"}>
            <View style={styles.loading}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text>Subiendo datos...</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
                  <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
              )}
            </View>
            
          </View>   
        </View>
      </VStack>
    </ScrollView>
</Box>
    

    
    );
 }
 
