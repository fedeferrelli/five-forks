import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { size } from "lodash";
import { reAuntheticate } from "../../utils/api";
import * as firebase from "firebase";



export default function ChangePasswordForm(props){
    const { setShowModal} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({password:"", newPassword:"", repeatNewPassword:""});
    const [error, setError] = useState({});

     const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})

    }

    const onSubmit = async () => {
        let errorTemp={};
        let actualizeErrors = true;
        setError({});

        if (!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorTemp={
                password: !formData.password ? "La contraseña no puede estar vacía" : "",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacía" : "",
                repeatNewpassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacía" : ""
            }
        } else if (formData.newPassword != formData.repeatNewPassword){
            errorTemp={
                newPassword: "Las contraseñas no son iguales",
                repeatNewpassword: "Las contraseñas no son iguales"
            }
        } else if (size(formData.newPassword) < 6){
            errorTemp={
                newPassword: "La contraseña debe tener al menos 6 caracteres",
                repeatNewpassword: "La contraseña debe tener al menos 6 caracteres"
            }
        } else {
            setIsLoading(true)
            await reAuntheticate(formData.password)
                .then(async() =>{
                await firebase.auth()
                .currentUser.updatePassword(formData.newPassword)
                .then(()=> {
                    actualizeErrors = false;
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
                }).catch(() => {
                    errorTemp = {
                        other: "Error al actualizar la contraseña"
                    }
                    setIsLoading(false)
                })
            }).catch(() => errorTemp={
                password: "La contraseña no no es correcta"
            })
        }

        actualizeErrors && setError(errorTemp);
        setIsLoading(false)
    };



    return(
        <View style={styles.view}>
        
            <Input
                placeholder="Contraseña actual"
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

            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={ true}
                secureTextEntry={ showNewPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= {showNewPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=>{setShowNewPassword(!showNewPassword)}}
                        color="#c1c1c1"
                    />
                }
                    onChange={(e)=>onChange(e, "newPassword")}
                    errorMessage = {error.newPassword}
            />

            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={ true}
                secureTextEntry={ showRepeatNewPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= {showRepeatNewPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=>{setShowRepeatNewPassword(!showRepeatNewPassword)}}
                        color="#c1c1c1"
                    />
                }
                    onChange={(e)=>onChange(e, "repeatNewPassword")}
                    errorMessage = {error.repeatNewpassword}
            />
        
            
        <Button
                title = "Cambiar contraseña"
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
        paddingTop: 10,
        paddingBottom: 10,
    },
    input:{
        marginBottom: 10,

    }, 
    btnContainer:{
        width: "95%",
        marginTop: 5,
       
    },
    btn:{
        backgroundColor: "#00a680",
    }

})