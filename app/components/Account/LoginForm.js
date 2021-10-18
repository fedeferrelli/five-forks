import React, {useState} from "react";
import {View, StyleSheet, Alert} from "react-native";
import { Input, Icon, Button} from "react-native-elements";
import Loading from "../Loading";
import { isEmpty } from "lodash";
import {validateEmail} from "../../utils/validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";


export default function LoginForm(){

    const [showPassword, setShowPassword] = useState(false); 
    const [formData, setFormData] = useState({email:"", password:""});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text});
    };
   
    const onSubmit = ()=>{
        if (isEmpty(formData.email) || isEmpty(formData.password)){
            Alert.alert("Oops..", "Debes rellenar todos los campos!", 
            [{text:"Ok"}],
            {cancelable: true})             
         }

         else if (!validateEmail(formData.email)){
            Alert.alert("Oops..", "el email no es válido!", 
            [{text:"Ok"}],
            {cancelable: true})

        }
         else {
            setLoading(true)
            firebase.auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {setLoading(false); navigation.navigate("account")})
            .catch(() => {setLoading(false); Alert.alert("Algo salió mal", "El correo electrónico y la contraseña no coinciden", 
            [{text:"Ok"}],
            {cancelable: true})})
        }

    }




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

            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
               onPress = {onSubmit}
            />

            <Loading isVisible={loading} text="Iniciando Sesión..."/>
        </View>

    );
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        width:"100%",

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
        marginVertical: 20,
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
