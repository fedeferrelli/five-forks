import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from "../../components/Account/RegisterForm";



export default function Register(){

    
    
    return (
        <KeyboardAwareScrollView>  
            <Image 
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />

            <View style={styles.viewForm}>
                <RegisterForm />
            </View>

             
        </KeyboardAwareScrollView>
    );
}


const styles = StyleSheet.create({
    logo:{
        width:"100%",
        height: 130,
        marginTop: 30,
    },

    viewForm:{
        marginRight: 25,
        marginLeft: 25,
        marginTop: 20,
    }

});
