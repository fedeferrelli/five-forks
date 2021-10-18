import React from "react";
import { StyleSheet, ScrollView, Text, Image, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


export default function UserGuest(){

    const navigation = useNavigation();
    
    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image style={styles.image}
            source={require("../../../assets/img/user-guest.jpg")}
            resizeMode="contain" 
            />

            <Text style={styles.text}>
                Consulta tu perfil de 5 tenedores
            </Text>

            <Text style={styles.description}>
                Busca, visualiza, comenta tu experiencia y vota los restaurantes de forma sencilla y divertida!
            
            </Text>

            <View style={styles.viewbtn}>
                <Button
                    title="Ver tu perfil" 
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    
                    onPress={()=>navigation.navigate("login")}
                />
            </View>

        </ScrollView>    
    );
}


const styles = StyleSheet.create({
    viewBody:{
        marginLeft: 15,
        marginRight: 15,
    },

    image:{
        height: 300,
        width: "100%",
        marginBottom: 40,
        marginTop: 10,
    },

    text:{
        fontSize: 19,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },

    description:{
        textAlign: "center",
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },

    btnStyle:{
        backgroundColor:"#00a680"

    },

    btnContainer:{
        width:"70%",
        borderRadius: 7,
    },

    viewbtn:{
        flex: 1,
        alignItems: "center",
        marginBottom: 20,
    }
})