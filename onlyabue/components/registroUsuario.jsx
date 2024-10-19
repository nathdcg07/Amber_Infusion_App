
import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet,  TextInput, ScrollView } from 'react-native';
import { StatusBar, Button, Input, Icon, FormControl,Text,VStack,Stack} from 'native-base';
import logo from '../assets/icons/logoPill.png';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';




const { width, height } = Dimensions.get('window');

export function RegistroUsuario() {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [surNamePat, setsurNamePat] = useState("");
  const [isSurNameValidPat, setIsSurNamePatValid] = useState(false);
  const [surNameMat, setsurNameMat] = useState("");
  const [isSurNameValidMat, setIsSurNameMatValid] = useState(false);
  const [age, setAge] = useState();
  const [isAgeValid, setIsAgeValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const [touched, setTouched] = useState({
    name: false,
    surNamePat: false,
    surNameMat: false,
    age: false,
    email: false,
  });
  useEffect(() => {
    const validateForm = () => {
      setIsFormValid(isNameValid && isSurNameValidPat && isSurNameValidMat && isAgeValid && isEmailValid);
    };

    validateForm();
  }, [isNameValid,isSurNameValidPat,isSurNameValidMat, isAgeValid, isEmailValid]);

  const validateAge = (age) => {
    return age >= 18;
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]{2,}$/;
    return nameRegex.test(name);
  };
  const validateSurNamePat = (surNamePat) => {
    const SurnameRegex = /^[a-zA-Z]{2,}$/;
    return SurnameRegex.test(surNamePat);
  };
  const validateSurNameMat = (surNameMat) => {
    const SurnameRegex = /^[a-zA-Z]{2,}$/;
    return SurnameRegex.test(surNameMat);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleBlurMail = () => {
    setIsEmailValid(validateEmail(email));
    setTouched({ ...touched, email: true });
  };

  const handleBlurName = () => {
    setIsNameValid(validateName(name));
    setTouched({ ...touched, name: true });
  };

  const handleBlurSurNamePat = () => {
    setIsSurNamePatValid(validateSurNamePat(surNamePat));
    setTouched({ ...touched, surNamePat: true });
  };

  const handleBlurSurNameMat = () => {
    setIsSurNameMatValid(validateSurNameMat(surNameMat));
    setTouched({ ...touched, surNameMat: true });
  };

  const handleBlurAge = () => {
    setIsAgeValid(validateAge(Number(age)));
    setTouched({ ...touched, age: true });
  };

  

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.registerContainer}>
          <Image source={logo} style={styles.logoRegister} />
          <Text style={styles.Titulo}>REGISTRO</Text>
          <View style={styles.formContainer}>
            <VStack>
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
          <Stack flexDirection="row" display="flex" justifyContent="space-between">
            <VStack w="48%"> 
              <Text style={styles.textForm}>Apellido Paterno</Text>
              <FormControl isInvalid={touched.surNamePat && !isSurNameValidPat}>
                <Input
                  backgroundColor={'white'}
                  fontSize={14}
                  borderRadius={7}
                  marginTop={1}
                  marginBottom={1}
                  value={surNamePat}
                  onChangeText={(text) => {
                    setsurNamePat(text);
                  }}
                  onBlur={handleBlurSurNamePat}
                />
                 {touched.surNamePat && !isSurNameValidPat && (
                <FormControl.ErrorMessage leftIcon={<AntDesign name="exclamationcircle" size={15} color="red" />}>
                  El Apellido Parterno debe contener mínimo 2 caracteres y/o no tener caracteres especiales.
                </FormControl.ErrorMessage>
              )}
              </FormControl>
            </VStack>
            <VStack w="48%"> 
            <Text style={styles.textForm}>Apellido Materno</Text>
              <FormControl>
                <Input
                  backgroundColor={'white'}
                  fontSize={14}
                  borderRadius={7}
                  marginTop={1}
                  marginBottom={1}
                  value={surNameMat}
                  onChangeText={(text) => {
                    setsurNameMat(text);
                  }}
                  onBlur={handleBlurSurNameMat}
                />
              </FormControl>
            </VStack>
          </Stack>

          
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
          </VStack>
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
    display: "flex",
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
