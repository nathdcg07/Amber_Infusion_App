import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import {StatusBar,Input,  Text,VStack,HStack,Button,Tag,Badge,Select} from 'native-base';
import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router';


const { width, height } = Dimensions.get('window');


export const RegisterUserExtra = ({User}) => {
  const [Datos, setDatos] = useState(User);
  const [enfermedades, setEnfermedades] = useState([]);
  const [instrumentacion, setInstrumentacion] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputValueIns, setInputValueIns] = useState('');
  const [Sangre,setSangre] = useState();

  const agregarEnfermedad = () => {
    if (inputValue !== '') {
      setEnfermedades([...enfermedades, inputValue]);
      setInputValue('');
    }
  };

  const eliminarEnfermedad = (enfermedad) => {
    setEnfermedades(enfermedades.filter((e) => e !== enfermedad));
  };

  const agregarInstrumentacion = () => {
    if (inputValueIns !== '') {
      setInstrumentacion([...instrumentacion, inputValueIns]);
      setInputValueIns('');
    }
  };

  const eliminarInstrumentacion = (instrumento) => {
    setInstrumentacion(instrumentacion.filter((e) => e !== instrumento));
  };

  const handleButtonRegister = () => {
    
    setDatos({
      ...Datos,
      enfermedades,
      instrumentacion,
      tipoSangre: Sangre
    });
    console.log(Datos);
    
  }
  
  


    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.registerContainer}>
            <Text style={styles.Titulo}>Registro Clinico</Text>
            <View style={styles.formContainer}>
              <VStack>
                <Text style={styles.textForm}>Enfermedades de base:</Text>
                <Input 
                  w="100%" 
                  backgroundColor={'white'} 
                  fontSize={14} 
                  borderRadius={7} 
                  marginTop={1} 
                  marginBottom={1}
                  placeholder='Diabetes,Asma,hipertensión,etc...'
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                  InputRightElement={<Button background={'#29B6F6'} onPress={agregarEnfermedad}size="s" rounded="none" w="1/6" h="full">+</Button>}
                /> 
                <HStack flexWrap={"wrap"}>
                  {enfermedades.map((enfermedad, index) => (
                    <Badge  backgroundColor={"#29B6F6"} alignSelf="center" variant={'solid'}  borderRadius={5} rightIcon={<Feather name="x" size={24} color="white" onPress={() => eliminarEnfermedad(enfermedad)} />}  key={index} style={{ margin: 5 }}>
                      <Text fontSize={15} color={'white'}>{enfermedad}</Text>              
                    </Badge >
                  ))}
                </HStack>
                <Text style={styles.textForm}>Instrumentacion medica</Text>
                <Input 
                  w="100%" 
                  backgroundColor={'white'} 
                  fontSize={14} 
                  borderRadius={7} 
                  marginTop={1} 
                  marginBottom={1}
                  placeholder='Marca pasos,Protesis,etc...'
                  value={inputValueIns}
                  onChangeText={(text) => setInputValueIns(text)}
                  InputRightElement={<Button background={'#29B6F6'} onPress={agregarInstrumentacion}size="s" rounded="none" w="1/6" h="full">+</Button>}
                /> 
                <HStack flexWrap={"wrap"}>
                  {instrumentacion.map((instrumentacion, index) => (
                    <Badge  backgroundColor={"#29B6F6"} alignSelf="center" variant={'solid'}  borderRadius={5} rightIcon={<Feather name="x" size={24} color="white" onPress={() => eliminarInstrumentacion(instrumentacion)} />}  key={index} style={{ margin: 5 }}>
                      <Text fontSize={15} color={'white'}>{instrumentacion}</Text>              
                    </Badge >
                  ))}
                </HStack>
                <Text style={styles.textForm}>Tipo de Sangre</Text>
                <Select backgroundColor={'white'}
                   fontSize={14}
                   borderRadius={7}
                   marginBottom={1}
                   selectedValue={Sangre}
                   minWidth="100"
                   accessibilityLabel="Elije tu tipo de sangre"
                   placeholder="Elije tu tipo de sangre" 
                   _selectedItem={{bg: "white",}}
                   mt={1} 
                   onValueChange={itemValue => setSangre(itemValue)}
                   >
                  
          <Select.Item label="A+" value="A+" />
          <Select.Item label="O+" value="O+" />
          <Select.Item label="B+" value="B+" />
          <Select.Item label="AB+" value="AB+" />
          <Select.Item label="A-" value="A-" />
          <Select.Item label="O-" value="O-" />
          <Select.Item label="B-" value="B-" />
          <Select.Item label="AB-" value="AB-" />
        </Select>
              </VStack>
            </View>
            <Button bg="#64B5F6" width="50%" borderRadius={8} m="3"  marginTop={8} onPress={handleButtonRegister} >Registrarse</Button>
          </View>
        </ScrollView>
      </View>
    );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90CAF9',
    alignItems: 'center',
  },
  scrollContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    marginTop:35,
    backgroundColor: '#BBDEFB',
    width: width * 0.9,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    shadowOpacity: 0.15,
    display: "flex",
  },
  Titulo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  formContainer: {
    width: '90%',

  },
  textForm: {
    paddingTop:10,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 15,
    borderRadius: 80,
    resizeMode:'cover',
    marginTop:20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
