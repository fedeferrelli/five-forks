import React from 'react';
import { Text, View, StyleSheet, Alert } from "react-native";

import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function InfoUser(props){
    const { userInfo:{photoURL, displayName, email, uid}, 
            setLoading,
            setLoadingText 
        } = props;

    const changeAvatar = async ()=>{
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
        const resultPermissionCamera = resultPermission.permissions.status;
        
        if (resultPermissionCamera === "denied"){
            Alert.alert("Oops..", "Es necesario aceptar los permiosos de la galeria", 
            [{text:"Ok"}],
            {cancelable: true})
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if(result.cancelled){
                Alert.alert("Oops..", "Has cancelado la selección de imagenes", 
            [{text:"Ok"}],
            {cancelable: true})
            }
            else{
                uploadImage(result.uri).then(() => {
                    updatePhotoUrl();
                }).catch(()=>
                    Alert.alert("Oops..", "Error al actualizar la imagen", 
                        [{text:"Ok"}],
                        {cancelable: true})
                )
            }
        }
    };

    const uploadImage = async (uri) =>{
        setLoadingText("Actualizando Avatar");
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob)
    }

    const updatePhotoUrl = () =>{
        firebase
        .storage()
        .ref(`avatar/${uid}`).getDownloadURL()
        .then(async(response) => {
            const update = {
                photoURL: response
            };
            await firebase.auth().currentUser.updateProfile(update)
            setLoading(false)
        }).catch(()=>
        Alert.alert("Oops..", "Error al actualizar la imagen", 
            [{text:"Ok"}],
            {cancelable: true})
    )

    }
    

    return(
        <View style={styles.viewUserInfo}>
            <Avatar
            rounded
            size="large"
            
            onPress={changeAvatar}
                
            containerStyle={styles.userInfoAvatar}
            source={
                    photoURL ? {uri:photoURL} : require("../../../assets/img/avatar-default.jpg")}
            
            />



            <View>
                <Text style={styles.displayName}> { displayName ? displayName : "Anónimo" } </Text>
            
                <Text style={styles.displayEmail}> { email ? email : "Social Login" }  </Text>
            </View>
        </View>


    );
}


const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingBottom: 30,
        paddingTop: 30,
    }, 

    userInfoAvatar:{
        marginRight: 20,
        
    },

    displayName:{
        fontWeight:"bold",
        marginBottom: 2,
    }
})