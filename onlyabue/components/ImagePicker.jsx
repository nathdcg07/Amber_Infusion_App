import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, Image, Text } from 'react-native';
import styles from '../assets/stylesheets/RegistroMedicamento.styles';
import imgPlaceholder from '../assets/icons/Image-placeholder.png'

const CustomImagePicker = ({ selectedImage, setSelectedImage, errorImage, setErrorImage }) => {
  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Los permisos a galería de imágenes son requeridos para continuar.');
      return;
    }

    const pickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickResult.canceled && pickResult.assets && pickResult.assets.length > 0) {
      const uri = pickResult.assets[0].uri;
      setSelectedImage(uri);
      setErrorImage('');
    } else {
      setErrorImage('Seleccione una imagen');
    }
  };

  return (
    <TouchableOpacity onPress={openImagePickerAsync}>
      <Image
        source={selectedImage ? { uri: selectedImage } : imgPlaceholder}
        style={styles.icon}
      />
      {errorImage ? <Text style={styles.error}>{errorImage}</Text> : null}
    </TouchableOpacity>
  );
};

export default CustomImagePicker;
