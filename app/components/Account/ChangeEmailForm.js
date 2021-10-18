import React, {useState} from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
import { reAuntheticate } from "../../utils/api";
import * as firebase from "firebase";
 
export default function ChangeEmailForm(props){
    const { email, setShowModal, setReloadUserInfo} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({email:"", password:""});
    const [error, setError] = useState({});

    const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})

    }

    const ChangeShowPassword = () =>{
        setShowPassword(!showPassword)
    }


    const onSubmit = () => {
        setError({});
       

        if(!formData.email || email === formData.email){
            setError({email: "El email no ha cambiado"})
        } else if (!validateEmail(formData.email)){
            setError({email: "El email ingresado es incorrecto"})
        } else if (!formData.password){
            setError({password: "La contraseña no ha sido ingresada"})   
        } else (
            setIsLoading(true),
            reAuntheticate(formData.password)
            .then(response =>{
                firebase.auth().currentUser.updateEmail(formData.email)
                .then(() => {
                    setIsLoading(false),
                    setReloadUserInfo(true),
                    setShowModal(false),
                    Alert.alert("Genial", "la dirección de email se modificó exitosamente. Te mandaremos un email para notificarte", 
                        [{text:"Ok"}],
                        {cancelable: true}) 
                }).catch(()=>{
                    setError({email: "Error al actualizar la dirección de email"}),
                    setIsLoading(false)
                })
            }).catch(() => {
                setIsLoading(false),
                setError({password: "La contraseña no es correcta"})
            })
        )}
               
    

    return(
        <View style={styles.view}>

            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2",
                }}
                defaultValue={email}
                onChange={(e)=>onChange(e, "email")}
               errorMessage = {error.email}
            />

            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={ true}
                secureTextEntry={ showPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=>{setShowPassword(!showPassword)}}
                        color="#c1c1c1"
                        />
                }
                    onChange={(e)=>onChange(e, "password")}
                    errorMessage = {error.password}
                />
                
               
            

            <Button
                title = "Cambiar email"
                containerStyle = {styles.btnContainer}
                
                buttonStyle = {styles.btn}
                onPress = {onSubmit}
                loading = {isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
    },
    input:{
        marginBottom:10,

    },
    btnContainer:{
        width: "95%",
        marginTop: 5,
       
    },
    btn:{
        backgroundColor: "#00a680",
    }
})