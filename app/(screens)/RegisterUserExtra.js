import { RegisterUserExtra } from "../../components/RegisterUserExtra";
import { useLocalSearchParams } from "expo-router"; 

export default function (){
    const { user } = useLocalSearchParams();  // Recibe los parámetros
    const userData = JSON.parse(user);

    return( 
        <RegisterUserExtra User={userData}/>
    );
}
