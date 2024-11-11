import { RegistroUsuario } from "../../components/registroUsuario"
import { useLocalSearchParams } from "expo-router"; 

export default function RegisterUser(){
    const { Token } = useLocalSearchParams(); // Recibe los parámetros
    
    return(
        <RegistroUsuario Token={Token}/>
    )

}