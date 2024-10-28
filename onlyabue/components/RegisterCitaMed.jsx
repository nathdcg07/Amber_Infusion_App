import {  Input, ScrollView, VStack, Modal, Pressable, View, Button, Select,Box } from "native-base";
import React, { useState } from "react";
import { Dimensions,StyleSheet, Text, Alert, TouchableOpacity} from "react-native";
import { Link,useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../Styles/GlobalStyles";

const { width, height } = Dimensions.get('window');
const router = useRouter();
export function RegistroCitaMedica(){

  
  const [NombreMedico,setNombreMedico] = useState('');
  const [ApellidoMedico, setApellidoMedico] = useState('')
  const [DescipcionCita, setDescripcionCita]= useState('')
  const [Detalle, setDetalle] = useState('')
  const [Lugar, setLugar] = useState('')
  const [Recordatorio,setRecordatorio] = useState('')
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate,SetselectedDate]= useState(null)
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] =useState(false)
  const handleSubmit = ()=>{
      if(!errorNombreMed &&
          !errorApellidoMed &&
          !errorLugar &&
          !errorHora &&
          !errorFecha &&
          !errorRecordatorio &&

          NombreMedico &&
          ApellidoMedico &&
          Lugar &&
          selectedDate &&
          selectedTime &&
          Recordatorio
      ){
        console.log( 'nombre:'+ NombreMedico +'apellido:'+ ApellidoMedico + 'lugar:'+Lugar+ 'descrip:'+DescipcionCita+'recordatorio:'+Recordatorio +'hora:'+selectedTime.toLocaleTimeString() +'fecha:'+selectedDate )
      }else{
        if(!NombreMedico)
          setErrorNombreMed('llene este espacio')
        if(!ApellidoMedico)
          setErrorApellidoMed('llene este espacio')
        if(!Lugar)
          setErrorLugar('llene este espacio')
        if(!selectedTime)
          setErrorHora('Seleccione Hora de Alarma')
        if(!selectedDate)
          setErrorFecha('Seleccione una Fecha')
        if(!Recordatorio)
          setErrorRecordatorio('Seleccione Recordatorio')
        if(!Detalle)
          setErrorDetalle('Ingrese detalles de la Cita Medica')

        Alert.alert('Error', 'Por favor llene los campos con * del formulario');
      }
  }
  
  const handleTimeChange = (event, time) => {
    if (time) {
      setSelectedTime(time); // Guardar la hora seleccionada
    }
    setShowTimePicker(false); // Cerrar el selector después de elegir la hora
    setErrorHora('');
  };
  const handeDateChange = (event, date)=>{
    if(date){
      SetselectedDate(date);
    }
    setShowDatePicker(false);
    setErrorFecha('');
  }
//Set de errores
const [errorNombreMed,setErrorNombreMed] = useState('')
const [errorApellidoMed,setErrorApellidoMed] = useState('')
const [errorRecordatorio,setErrorRecordatorio] = useState('')
const [errorLugar,setErrorLugar] = useState('')
const [errorHora,setErrorHora] = useState('')
const [errorFecha, setErrorFecha]=useState('')
const [errorDetalle, setErrorDetalle]=useState('')

  const ValidateNombreMed = (text)=>{
    const regix= /^[a-zA-Z]{3,}$/;
    if(!regix.test(text)){
      setErrorNombreMed('Ingrese un nombre Valido')
    }else{
      setErrorNombreMed('')
    }
    setNombreMedico(text);
  }
  const ValidateApellidoMed = (text)=>{
    const regix= /^[a-zA-Z]{3,}$/;
    if(!regix.test(text)){
      setErrorApellidoMed('Ingrese un apellido Valido')
    }else{
      setErrorApellidoMed('')
    }
    setApellidoMedico(text);
  }
  const ValidateLugar = (text)=>{
    const regix= /^[a-zA-Z\s]{5,}$/;
    if(!regix.test(text)){
      setErrorLugar('Ingrese un lugar Valido')
    }else{
      setErrorLugar('')
    }
    setLugar(text);
  }
  function htmlError(texto){
    return(
    <View flexDirection={"row"}>
        <MaterialIcons name="error-outline" size={24} color="red" marginRight={5} />
        <Text style={styles.error}>{texto}</Text>
    </View>
    )
  
  }



    return(
      <Box bg="#28B6F6" flex={1} p={4} position="relative" >
        <View style={styles.topSemiCircle} />
        <View style={styles.middleLeftSemiCircle}/>
        <View style={styles.bottomSemiCircle} />
        <View>
          <TouchableOpacity onPress={() => router.back()} style={styles.buttonBack}>
            <Ionicons name="arrow-back-circle" size={50} color="black" />
          </TouchableOpacity>
        
      </View>
        <ScrollView   contentContainerStyle={styles.scrollContainer}>
            <VStack space={3}>
                <View style={styles.form}>
                    <Text style={styles.Titulo}>Registro Cita Medica</Text>
                    <View>
                        <Text style={styles.textForm}>Ingrese Nombre del Medico: *</Text>
                        <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                            borderRadius={7}
                            marginTop={1}
                            value={NombreMedico}
                            onChangeText={ValidateNombreMed}
                        ></Input>
                        {errorNombreMed? htmlError(errorNombreMed) : null}

                        <Text style={styles.textForm}>Ingrese Apellido del Medico: *</Text>
                        <Input
                              size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                              borderRadius={7}
                              marginTop={1}
                              value={ApellidoMedico}
                              onChangeText={ValidateApellidoMed}
                        ></Input>
                        {errorApellidoMed? htmlError(errorApellidoMed) : null}

                        <Text style={styles.textForm}>Detalle:*</Text>
                         <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                            borderRadius={7}
                            marginTop={1}
                            value={Detalle}
                            onChangeText={(text)=>{setDetalle(text);
                              if(Detalle!=''){
                                setErrorDetalle('')
                              }
                            }}
                         ></Input>
                          {errorDetalle? htmlError(errorDetalle) : null}
                         <Text style={styles.textForm}>Descripcion:</Text>
                         <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                            borderRadius={7}
                            marginTop={1}
                            value={DescipcionCita}
                            onChangeText={(text)=>setDescripcionCita(text)}
                         ></Input>

                         <Text style={styles.textForm}>Lugar: *</Text>
                         <Input size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                            borderRadius={7}
                            marginTop={1}
                            value={Lugar}
                            onChangeText={ValidateLugar}
                         ></Input>
                         {errorLugar? htmlError(errorLugar) : null}
  {/* //Hora                      */}
                          <Text style={styles.textForm}>Hora de la Cita Medica: *</Text> 
                          <Button 
                           onPress={()=>setShowTimePicker(true)}
                           flexDirection= "row"  
                            marginBottom={3}
                            marginTop={3}                            
                            variant="outline" backgroundColor="white"
                            endIcon={<MaterialIcons marginTop={3} name="arrow-forward-ios" size={14} color='Black' />}
                            >
                              <Text>{selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionada'}</Text>
                              
                          </Button>
                        {errorHora? htmlError(errorHora):null}
                          <Modal isOpen={showTimePicker} onClose={()=>setShowTimePicker(false)}>
                            <DateTimePicker
                              value={selectedTime || new Date()}
                              mode="time"
                              display="spinner"
                              onChange={handleTimeChange}
                              is24Hour={true} 
                            />
                          </Modal>
{/* Antelacion Recordatorio  */}
                        <Text style={styles.textForm}>Recordatorio:*</Text>
                        <Select
                        size={"lg"} variant={"outline"} backgroundColor={'white'} fontSize={14}
                        borderRadius={7}
                        marginTop={1} selectedValue={Recordatorio} minWidth="200"  placeholder="Seleccione cantidad de Medicamento"
                        onValueChange={(itemValue) => {setRecordatorio(itemValue);
                          if(Recordatorio!=''){
                            setErrorRecordatorio('')
                          }
                        }}
                        >
{/* Falta asignacion de valores */}
                            <Select.Item label="Ninguno"/>
                            <Select.Item label="5 Min Antes"/>
                            <Select.Item label="10 Min Antes"/>
                            <Select.Item label="15 Min Antes"/>
                            <Select.Item label="30 Min Antes"/>
                            <Select.Item label="1 Hora Antes"/>
                            <Select.Item label="2 Horas Antes"/>
                            <Select.Item label="3 Horas Antes"/>
                            <Select.Item label="1 Dia Antes"/>
                            <Select.Item label="2 Dias Antes"/>
                        </Select>

                        {errorRecordatorio? htmlError(errorRecordatorio):null}
                        
{/* //Fecha                           */}
                        <Text style={styles.textForm}>Fecha: *</Text>
                        <Button
                          onPress={()=>setShowDatePicker(true)}
                            flexDirection="row"
                            marginBottom={3}
                            marginTop={3}                            
                            variant="outline" backgroundColor="white"
                            endIcon={<MaterialIcons marginTop={3} name="arrow-forward-ios" size={14} color='Black' />}
                            >
                            <Text>{selectedDate ? selectedDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'No seleccionada'}</Text>                            
                        </Button>
                        
                        <Modal isOpen={showDatePicker} onClose={()=>setShowDatePicker(false)}>
                            <DateTimePicker
                              value={selectedDate || new Date()}
                              mode="date"
                              display="default"
                              onChange={handeDateChange}
                              is24Hour={true} 
                            />
                          </Modal>
                        {errorFecha? htmlError(errorFecha):null}
                       
                        
                    </View >
                        <View  alignItems={"center"}>
                            <Pressable onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}> Agregar</Text>
                            </Pressable>
                            
                        </View>
                </View>
                
            </VStack>
            
        </ScrollView>
      </Box>
        
    );
}
