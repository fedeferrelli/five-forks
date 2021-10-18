import React from "react";
import {StyleSheet, Image} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Loging from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#00a680', 
            },

            headerTintColor: 'white',

            headerTitleAlign: "center",

            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold"
            },
          }}>

            <Stack.Screen
                name="account"
                component={Account}
                options={{title: "Cuenta"}}
            />

            <Stack.Screen
                name="login"
                component={Loging}
                options={{title: "Iniciar Sesión"}}
            />

            <Stack.Screen
                name="register"
                component={Register}
                options={{title: "Registro"}}
            />


        </Stack.Navigator>
    );
} 
