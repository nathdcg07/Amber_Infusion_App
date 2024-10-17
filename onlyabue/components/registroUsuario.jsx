
import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet,  TextInput, ScrollView } from 'react-native';
import { StatusBar, Button, Input, Icon, FormControl,Text} from 'native-base';
import logo from '../assets/icons/logoPill.png';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';




const { width, height } = Dimensions.get('window');

export function RegistroUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [isNameValid, setisNameValid] = useState(false);
  const [age, setAge] = useState();
  const [isAgeValid, setisAgeValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setisPasswordValid] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const [touched, setTouched] = useState({
    name: false,
    age: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  useEffect(() => {
    const validateForm = () => {
      setIsFormValid(isNameValid && isAgeValid && isEmailValid && isPasswordValid && isPasswordMatch);
    };

    validateForm();
  }, [isNameValid, isAgeValid, isEmailValid, isPasswordValid, isPasswordMatch]);

  const validateAge = (age) => {
    return age >= 18;
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]{2,}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{7,}$/;
    return passwordRegex.test(password);
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleBlurMail = () => {
    setIsEmailValid(validateEmail(email));
    setTouched({ ...touched, email: true });
  };

  const handleBlurName = () => {
    setIsNameValid(validateName(name));
    setTouched({ ...touched, name: true });
  };

  const handleBlurAge = () => {
    setIsAgeValid(validateAge(Number(age)));
    setTouched({ ...touched, age: true });
  };

  const handleBlurPassword = () => {
    setIsPasswordValid(validatePassword(password));
    setTouched({ ...touched, password: true });
  };

  const handleBlurConfirmPassword = () => {
    setIsPasswordMatch(validatePasswordMatch(password, confirmPassword));
    setTouched({ ...touched, confirmPassword: true });
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
            <FormControl isInvalid={touched.name && !isNameValid}>
            <Input
              w="100%"
              backgroundColor={'white'}
              fontSize={14}
              borderRadius={7}
              marginTop={1}
              marginBottom={1}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              onBlur={handleBlurName}
            />
            {touched.name && !isNameValid && (
                <FormControl.ErrorMessage leftIcon={<AntDesign name="exclamationcircle" size={15} color="red" />}>
                  El Nombre debe contener mínimo 2 caracteres y/o no tener caracteres especiales.
                </FormControl.ErrorMessage>
              )}
          </FormControl>
            <Text style={styles.textForm} >Edad:</Text>
            <FormControl isInvalid={touched.age && !isAgeValid}>
            <Input
              w="100%"
              backgroundColor={'white'}
              fontSize={14}
              borderRadius={7}
              marginTop={1}
              marginBottom={1}
              keyboardType="numeric"
              value={age}
              onChangeText={(text) => {
                setAge(text);
              }}
              onBlur={handleBlurAge}
            />
            {touched.age && !isAgeValid && (
                <FormControl.ErrorMessage leftIcon={<AntDesign name="exclamationcircle" size={15} color="red" />}>
                  La edad mínima es 18 años
                </FormControl.ErrorMessage>
              )}
          </FormControl>
            <Text style={styles.textForm}>Correo Electrónico:</Text>
            <FormControl isInvalid={touched.email && !isEmailValid}>
            <Input
              w="100%"
              backgroundColor={'white'}
              fontSize={14}
              borderRadius={7}
              marginTop={1}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              onBlur={handleBlurMail}
            />
            {touched.email && !isEmailValid && (
                <FormControl.ErrorMessage leftIcon={<AntDesign name="exclamationcircle" size={15} color="red" />}>
                  El correo electrónico no es válido.
                </FormControl.ErrorMessage>
              )}
          </FormControl>
           <Text style={styles.textForm}>Contraseña:</Text>
           <FormControl isInvalid={touched.password && !isPasswordValid}>
           <Input bg="white" borderWidth="0" onChangeText={(text) => {
                setPassword(text);
              }}
              onBlur={handleBlurPassword} w={{
              base: "100%",
              md: "100%"
            }} _focus={{
              bg: "white"  
            }} fontSize={14} borderRadius={7} marginY={1} type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>}/>
                  {touched.password && !isPasswordValid && (
                <FormControl.ErrorMessage leftIcon={<AntDesign name="exclamationcircle" size={15} color="red" />}>
                  La contraseña debe tener mínimo 7 caracteres.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Text style={styles.textForm}>Confirmar Contraseña:</Text>
            <FormControl isInvalid={touched.confirmPassword && !isPasswordMatch}>
           <Input bg="white" borderWidth="0" onChangeText={(text) => {
                setconfirmPassword(text);
              }}
              onBlur={handleBlurConfirmPassword} w={{
              base: "100%",
              md: "100%"
            }} _focus={{
              bg: "white"  
            }} fontSize={14} borderRadius={7} marginY={1} type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>}/>
                  {touched.confirmPassword && !isPasswordMatch && (
                <FormControl.ErrorMessage leftIcon={<AntDesign name="exclamationcircle" size={15} color="red" />}>
                  La contraseña debe ser la misma.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </View>
          <Button bg="#64B5F6" width="50%" borderRadius="md" m="3"  isDisabled={!isFormValid} >Registrate</Button>
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
    width: width * 0.9,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    shadowOpacity: 0.15,
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
    width: '90%',

  },
  textForm: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
