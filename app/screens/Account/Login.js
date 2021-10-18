import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/Account/LoginForm";




export default function Login(){

    const navigation = useNavigation();

    return (
        <ScrollView>
            <Image 
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />

            <View style={styles.viewContainer}>  
                <LoginForm />
                < CreateAccount/>
                <Text 
                    style={styles.btnRegister}
                    onPress={()=>navigation.navigate("register")}
                > Regístrate! </Text>
            </View>

            <Divider style={styles.divider}/>
            
            <Text> Social Login </Text>
            
            

        </ScrollView>
    );
}

function CreateAccount(){

    return(
        <Text 
        style={styles.textRegister}
        >
            ¿Aun no tienes una cuenta?
        </Text>
    );
}


const styles = StyleSheet.create({
    logo:{
        width: "100%",
        height: 130,
        marginTop: 30
    },

    viewContainer:{
        marginRight: 25,
        marginLeft: 25,
        marginTop: 30,
        textAlign:"center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",


    },
    textRegister:{
        marginRight:10,
        marginLeft:10,
        marginTop: 0,
    },

    btnRegister:{
        color: "#00a680",
        fontSize: 16,

    },

    divider:{
        margin:40,
        height:1,
        backgroundColor:"#00a680",
    }
});