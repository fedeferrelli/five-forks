import React, {useState} from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Icon, Button} from "react-native-elements";

import {validateEmail} from "../../utils/validation";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import  Loading from "../Loading";

export default function RegisterForm(){
     

    const [showPassword, setShowPassword] = useState(false);  
    const [showRepeatPassword, setShowRepeatPassword] = useState(false); 
    const [formData, setFormData] = useState({email:"", password:"", repeatPassword:""});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    

  


    const onSubmit = () => {
        
        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)){
           Alert.alert("Oops..", "Debes rellenar todos los campos!", 
           [{text:"Ok"}],
           {cancelable: true})
            
        }
        else if (!validateEmail(formData.email)){
            Alert.alert("Oops..", "el email no es válido!", 
            [{text:"Ok"}],
            {cancelable: true})

        }
        else if (formData.password != formData.repeatPassword){
            Alert.alert("Oops..", "las contraseñas deben der iguales", 
            [{text:"Ok"}],
            {cancelable: true})

        }
        else if(size(formData.password)<6){
            Alert.alert("Oops..", "la contraseña debe tener al menos 6 caracteres", 
            [{text:"Ok"}],
            {cancelable: true})
        }
        else {
            setLoading(true)
            firebase.auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {setLoading(false); navigation.navigate("account")})
            .catch(() => {setLoading(false); Alert.alert("Algo salió mal", "Parece que el correo electrónico ya está siendo utilizado por otro usuario", 
            [{text:"Ok"}],
            {cancelable: true})})
        }
    };

    const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    };


    return(
        <View style={styles.formContainer}>  
            <Input 
                placeholder="correo electrónico"
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={(e)=> onChange(e, "email")}
            />

            <Input 
                placeholder="contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=>{setShowPassword(!showPassword)}}
                    />
                }
                onChange={(e)=> onChange(e, "password")}
            />

            <Input 
                placeholder="repetir contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showRepeatPassword ? false :  true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=>{setShowRepeatPassword(!showRepeatPassword)}}
                    />
                }
                onChange={(e)=> onChange(e, "repeatPassword")}
            />

            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress = {onSubmit}
            />

            <Loading isVisible={loading} text="Creando cuenta..."/>
        </View>

    );
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,

        backgroundColor: 'white',
        borderRadius: 10,
        padding: 4,
        marginBottom: 35,
        elevation: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        shadowColor: '#52006A',
    },

    
    inputForm:{
        width: "100%",
        marginTop: 15,
    },

    btnContainerRegister:{
        margin: 20,
        width: "95%",
        borderRadius: 10,
        
    },

    btnRegister:{
        backgroundColor: "#00a680",
    },

    iconRight:{
        color:"#c1c1c1",
    }
})
