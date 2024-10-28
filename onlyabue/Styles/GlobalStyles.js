import { StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,      
      alignItems: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    registerContainer: {
      // backgroundColor: '#BBDEFB',
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
      fontSize: 24,
      marginBottom: 20,
    },
    formContainer: {
     paddingVertical: 20,
     textAlign:'left',
      padding: 20,
      borderRadius: 20,
      width: width * 0.9,
      marginBottom:20,
      marginTop:20,
    },
    textForm: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5,
      color:'white'
    },
    iconRegistroUsuario: {
      width: 150,
      height: 150,
      marginBottom: 15,
      borderRadius: 80,
      resizeMode:'cover',
  
    },
    iconRegistroMedicamento:{
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
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        
      },
      button_Secundary: {
        backgroundColor: '#617371',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 15,
      },
    error: {
      color: 'red',
      marginBottom: 10,
      fontWeight:'bold',
    },
    
    topSemiCircle: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: 10000,
      backgroundColor: 'white',  // Color del semicírculo superior
      top: -250,  // Posición ajustada hacia arriba
      left: -100,  // Ajuste para la posición izquierda
     
    },
    middleRigthSemiCircle:{
      position:'absolute',
      backgroundColor:'white',
      width: 400,
      height: 400,
      borderRadius:10000,
      right:-380,
      top:200,
    },
    middleLeftSemiCircle:{
        position:'absolute',
        backgroundColor:'white',
        width: 400,
        height: 400,
        borderRadius:10000,
        left:-380,
        top:200,
      },
    bottomSemiCircle: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: 150,
      backgroundColor: 'white',  // Color del semicírculo inferior
      bottom: -250,  // Posición ajustada hacia abajo
      right: 0,  // Ajuste para la posición derecha
    },
});
export default styles;