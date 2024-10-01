import React, { useState } from 'react';
import { Text } from 'native-base';
import { View,  Image, StyleSheet,StatusBar, TouchableOpacity, ScrollView } from 'react-native';
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
          <Text  fontSize='3xl' >{NombreCom}</Text>
          <Text fontSize='2xs' style={styles.productIngredient}>{NombreGen}</Text>
          <Text style={styles.productQuantity}>Cantidad: {Cantidad}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.description}>
        <Text fontSize='2xl' style={styles.sectionTitle}>Descripción</Text>
        <Text fontSize='2xl' style={styles.paragraph}>
          {Descipcion}
        </Text>
        
      </View>
      <ScrollView>
        <Text style={styles.titleSimilares}>Medicamentos Similares:</Text>
        <RecomendacionMedicamiento/>
        <RecomendacionMedicamiento/>
        <RecomendacionMedicamiento/>
        <TouchableOpacity style={styles.VerMas}>
          <Text fontSize='lg' fontWeight='bold'>Ver Mas ---&gt; </Text>
        </TouchableOpacity>
      </ScrollView>
      
        
    
      
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
  title:{
 marginTop:5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleSimilares: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:5,
    marginBottom:5,
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
  
  productIngredient: {
    margin:5,
    fontSize: 16,
    color: '#666',
  },
  productQuantity: {
    fontSize: 18,
    color: '#666',
    fontWeight:'bold',
  },
  description: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'#bbdefb',
    borderRadius: 15,
    borderBlockColor:'#000000',
    padding:10,
    paddingLeft:15,
    paddingRight:15,
    marginTop:15,

  },
  sectionTitle: {
    
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    
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
  VerMas:{
    flex:3,    
    fontWeight:'bold',
    alignItems:'flex-end',
    margin:8,
    marginBottom:10,

  }
});

export default ProductScreen;
