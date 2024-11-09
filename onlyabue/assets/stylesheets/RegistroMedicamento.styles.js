import { StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#90CAF9',          
    },
    page:{
      flex:1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 20,
      textAlign: 'center',
    },
    form:{
      backgroundColor: '#BBDEFB',
      padding: 20,
      borderRadius: 20,
      width: width * 0.9,
      marginBottom:20,
      marginTop:20,
      
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
      paddingVertical: 20,
      textAlign:'left',  
    },
    input: {
      width: '100%',
      padding: 10,
      borderRadius: 10,                  
      marginBottom: 10,
      fontSize: 16,
      backgroundColor:'#fff',
    },
    icon: {
      width: 100,
      height: 100,
      marginBottom: 15,
      borderRadius: 15,
      resizeMode:'cover',
      marginTop:20,
    },
    button: {
      backgroundColor: '#64B5F6',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 15,
    },
    backButton: {
      fontSize: 24,
      marginRight: 16,
      flexDirection:'row',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    button_Secundary: {
      backgroundColor: '#617371',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',  
    },
    textForm: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 2,
      paddingTop: 10,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default styles;