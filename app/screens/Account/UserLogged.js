import React, { useState, useEffect } from "react";
import { Input, Icon, Button} from "react-native-elements";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as firebase from "firebase";
import Loading  from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [reloadUserInfo, setReloadUserInfo] = useState(false);

    useEffect(() => {
      // funcion autoejecutable. ()= creacion, () ejecución
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user)
            
        })();
        setReloadUserInfo(false)  
    }, [reloadUserInfo]);


    return(
        <View style={styles.view}>

            { userInfo && <InfoUser 
                                userInfo = {userInfo}
                                setLoading={setLoading}
                                setLoadingText = {setLoadingText}
                            />}
            
            <AccountOptions userInfo={userInfo} setReloadUserInfo={setReloadUserInfo}/>
            <Button
                onPress={()=> firebase.auth().signOut()}
                title="Cerrar Sesión"
                containerStyle={styles.btnContainerCloseSession}
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.titleCloseSession}
            />

            <Loading text={loadingText} isVisible={loading}/>
        </View>    
    );
}


const styles = StyleSheet.create({
    view:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },

    btnContainerCloseSession:{
        marginTop: 20,
        width: "100%",    
    },

    btnCloseSession:{
        backgroundColor: "white",
        borderRadius: 0,
        marginTop: 30,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor: "#e3e3e3",
        paddingBottom:10,
        paddingTop: 10,

    },
    titleCloseSession:{
        color: "#00a680"
    }




})