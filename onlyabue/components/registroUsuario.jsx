
import React from 'react';
import { View, Image, Dimensions, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'native-base';
import logo from '../assets/icons/logoPill.png';
import { Button } from "native-base";
import { Input, Icon } from 'native-base';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');

export function RegistroUsuario() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [nombre, setNombre] = React.useState("");
  const [edad, setEdad] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.registerContainer}>
          <Image source={logo} style={styles.logoRegister} />
          <Text style={styles.Titulo}>REGISTRO</Text>
          <View style={styles.formContainer}>
            <Text style={styles.textForm}>Nombre:</Text>
            <TextInput style={styles.inputsText} />
            <Text style={styles.textForm}>Edad:</Text>
            <TextInput style={styles.inputsText} />
            <Text style={styles.textForm}>Correo Electrónico:</Text>
            <TextInput style={styles.inputsText} keyboardType="email-address" />
           <Text style={styles.textForm}>Contraseña:</Text>
           <Input bg="white" borderWidth="0" w={{
      base: "100%",
      md: "100%"
    }} _focus={{
      bg: "white"  
    }} fontSize={14} borderRadius={7} marginY={1} type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}/>
            <Text style={styles.textForm}>Confirmar Contraseña:</Text>
            <Input bg="white" borderWidth="0" w={{
      base: "100%",
      md: "100%"
    }} _focus={{
      bg: "white"  
    }} fontSize={14} borderRadius={7} marginY={1} type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} />
          </View>
          <Button bg="#64B5F6" width="50%" borderRadius="md" m="3" >Registrate</Button>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    backgroundColor: '#BBDEFB',
    width: width * 0.8,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
  },
  logoRegister: {
    resizeMode: 'contain',
    height: 150,
    marginTop: 20,
  },
  Titulo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  inputsText: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 7,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textForm: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
