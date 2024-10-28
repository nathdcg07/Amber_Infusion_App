
import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet,  TextInput, ScrollView,TouchableOpacity } from 'react-native';
import { StatusBar, Button, Input, Icon, FormControl,Text,VStack,Stack,Select,Box} from 'native-base';
import logo from '../assets/icons/logoPill.png';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import styles from '../Styles/GlobalStyles'




export function RegistroUsuario() {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [surNamePat, setsurNamePat] = useState("");
  const [isSurNameValidPat, setIsSurNamePatValid] = useState(false);
  const [surNameMat, setsurNameMat] = useState("");
  const [isSurNameValidMat, setIsSurNameMatValid] = useState(false);
  const [age, setAge] = useState();
  const [isAgeValid, setIsAgeValid] = useState(false);
  const [Sex, setSex] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorImage, setErrorImagen]=useState('');
  const [SelectedImagen,setSelectedImagen]=useState(null);
  const router = useRouter();  // Inicializa el router
  
  const [touched, setTouched] = useState({
    name: false,
    surNamePat: false,
    surNameMat: false,
    age: false,
    Sex: false,
  });
  useEffect(() => {
    const validateForm = () => {
      setIsFormValid(isNameValid && isSurNameValidPat && isSurNameValidMat && isAgeValid && Sex && SelectedImagen);
    };

    validateForm();
  }, [isNameValid,isSurNameValidPat,isSurNameValidMat, isAgeValid,Sex,SelectedImagen]);

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


  const handleBlurSex = () => {
    setTouched({ ...touched, Sex: true });
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

  const handleButtonNext = () => {
    const user = {
      name,
      surNamePat,
      surNameMat,
      age,
      Sex,
      SelectedImagen
    };
    router.push({
      
      pathname: '/RegisterUserExtra',  // Asegúrate de que la ruta exista
      params: { user: JSON.stringify(user) }  // Envía los datos como string JSON
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
    setErrorImage('Seleccione una imagen')
    return;
  }
  const uri = PickResult.assets?.[0]?.uri;
     setSelectedImagen(uri);
     setErrorImagen('');
  }

  

  return (
    <Box bg="#28B6F6" flex={1} p={4} position="relative">
        <View style={styles.topSemiCircle} />
        <View style={styles.middleRigthSemiCircle}/>
        <View style={styles.bottomSemiCircle}/>
        <View >
              <StatusBar />
              <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.registerContainer}>
                  <Text style={styles.Titulo}>Elija una foto suya</Text>
                <TouchableOpacity onPress={openImagePickerAsync}>
                  <Image    
                    source={{
                      uri : SelectedImagen !== null
                  ?  SelectedImagen  // URI dinámica
                  : 'https://via.placeholder.com/100'// Placeholder local
                  }}style={styles.iconRegistroUsuario} />
                </TouchableOpacity>
                {errorImage ? <Text style={styles.error}>{errorImage}</Text> : null}
                  <Text style={styles.Titulo}>Ingrese sus datos basicos</Text>
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
                    

                    <Stack flexDirection="row" display="flex" justifyContent="space-between">
                    <VStack w="30%" pb={8}>
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
                  </VStack>
                  <VStack w="60%">
                    <Text style={styles.textForm}>Sexo:</Text>
                    <Select backgroundColor={'white'}
                          fontSize={14}
                          borderRadius={7}
                          marginBottom={1}
                          selectedValue={Sex}
                          minWidth="100"
                          accessibilityLabel="Elije tu Sexo"
                          placeholder="Elije tu Sexo" 
                          _selectedItem={{bg: "white",}}
                          mt={1} 
                          onValueChange={itemValue => setSex(itemValue)}
                          onBlur={handleBlurSex}
                          >
                          
                  <Select.Item label="Masculino" value="Masculino" />
                  <Select.Item label="Femenino" value="Femenino" />
                </Select>
                  </VStack>
                  </Stack>
                  </VStack>
                  </View>
                  <Button bg="#81D5FA" width="50%" borderRadius="md" m="3"  isDisabled={!isFormValid} onPress={handleButtonNext} >Continuar</Button>
                </View>
              </ScrollView>
            </View>
    </Box>
    
  );
}



