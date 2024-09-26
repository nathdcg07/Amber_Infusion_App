import React, { useState } from 'react';

import { View, Text, Image, StyleSheet,StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import RecomendacionMedicamiento from './RecomendacionMedicamentos';
const ProductScreen = ({ navigation }) => {
  const [Titulo,setTitulo]=useState('Medicamentos');
  const [NombreCom,setNombreCom]=useState('Aspirina');
  const [NombreGen,setNombGen]=useState('Acido acetilsalicico');
  const[Cantidad,setCantidad]=useState('12')
  const [Descipcion,setDescripcion]=useState('Analgésico: Bloquea la formación del impulso del dolor a través de una acción central, posiblemente localizada en el hipotálamo. Ayuda a reducir o aliviar el dolor en general, se puede utilizar para dolores de cabeza, musculares, artríticos, entre muchos otros más');
  const[Gramaje,setGramaje]=useState('500 mg')
  return (

    <ScrollView style={styles.container}>
      <StatusBar style='default'></StatusBar>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title} >{Titulo}</Text>
      </View>

      
      <View style={styles.productCard}>
        <View style={styles.imagePlaceholder}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.productImage} />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{NombreCom}</Text>
          <Text style={styles.productIngredient}>{NombreGen}</Text>
          <Text style={styles.productQuantity}>Cantidad: {Cantidad}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.description}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.paragraph}>
          {Descipcion}
        </Text>
        
      </View>
      
        <RecomendacionMedicamiento/>
        <RecomendacionMedicamiento/>
        <RecomendacionMedicamiento/>
    
      {/* Similar Medications */}
      <View style={styles.similarProducts}>
        <Text style={styles.sectionTitle}>Medicamentos similares</Text>
        <View style={styles.similarItem}>
          <Text style={styles.similarProductName}>Aspirinetas 500mg</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#64B5f6',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productCard: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'#bbdefb',
    padding:10,
    borderRadius:15
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderRadius:60
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius:40
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productIngredient: {
    fontSize: 16,
    color: '#666',
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'#bbdefb',
    borderRadius: 15,
    borderBlockColor:'#000000',
    padding:10,
    marginTop:15,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  similarProducts: {
    paddingVertical: 20,
  },
  similarItem: {
    paddingVertical: 10,
  },
  similarProductName: {
    fontSize: 16,
    color: '#000',
  },
});

export default ProductScreen;
