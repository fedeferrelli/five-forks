import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from "react-native";
import { Input, Button } from 'react-native-elements';
import * as firebase from "firebase";


export default function ChangeDisplayNameForm(props){
    const {displayName, setShowModal, setReloadUserInfo} = props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    
    const onSubmit = () =>{
        setIsLoading(true)
        setError(null);
        if(!newDisplayName){
            setError("El nombre de usuario no puede estar vacío")
            setIsLoading(false)
        } else {
            firebase.auth()
            .currentUser.updateProfile({displayName: newDisplayName})
            .then(()=>{
                console.log("ok")
                setIsLoading(false)
                setReloadUserInfo(true)
                setShowModal(false)
            }).catch(()=>{
                setError("El nombre de usuario no puedo modificaerse")
                setIsLoading(false)
            })    
        }
       
        console.log(newDisplayName)
    };

    return(
        <View style={styles.view}>
            <Input
                placeholder="Nombre de usuario"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2",
                }}
                defaultValue={displayName && displayName}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage = {error}
            />

            <Button
            title = "Cambiar nombre de usuario"
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