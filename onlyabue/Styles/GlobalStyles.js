import { StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
// ====================== Contenedores =================
    container: {
      flex: 1,      
      alignItems: 'center',
    },
    scrollContainer: {
      flexGrow: 1, 
      justifyContent: 'center',
      alignItems: 'center',      
      paddingVertical: 20,
      paddingTop:10,
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
    formContainer: {
      paddingVertical: 20,
      textAlign:'left',
       padding: 20,
       borderRadius: 20,
       width: width * 0.9,
       marginBottom:20,
       marginTop:20,
     },
    logoRegister: {
      resizeMode: 'contain',
      height: 150,
      marginTop: 20,
    },
    CardsContainer:{
      backgroundColor:'white',
      marginTop:10,
      marginBottom:10,
      marginLeft:5,
      marginrigth:5,
      padding: 10,
      margin:8,
      backgroundColor:'white',
      borderRadius:15,
      borderWidth:1,
      borderColor:'#4FC3F7',
    },
    
    
    footbarContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    nextAlarmContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    footbar: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },

    ColorPickerBase:{
      flexDirection: 'row',  // Alinear contenido horizontalmente
      alignItems: 'center',  // Alinear verticalmente el contenido en el centro
      width: width * 0.60, 
      height: 35, 
      borderRadius: 10, 
      margin: 10, 
      borderWidth: 1, 
      borderColor: '#878787', 
      paddingHorizontal: 10,  // Añadimos padding para los elementos dentro
      justifyContent: 'space-between'
    },
//==========================   Textos  =========================
    Titulo: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 20,
    },
    textForm: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5,
      color:'white'
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    error: {
      color: 'red',
      marginBottom: 10,
      fontWeight:'bold',
    },
    DetallesCard:{
      flex:3,
      fontSize:20,
      fontWeight:'bold',
      alignItems:'flex-end',
      margin:8,
  },
    CitaText:{
      fontSize:24,
      fontWeight:'bold',
      margin:3,
      padding:5,
    },
    CitaDetalleText:{
      fontSize:18,
      
    },
//======================== Botones ===============================
    BackIconButton:{
      width: 50, 
      height: 50,
      alignItems: 'center', 
      justifyContent: 'center',
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
      
    button_Secundary: {
      backgroundColor: '#617371',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 15,
    },
    
//======================= Circulos de los fondos ==================
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