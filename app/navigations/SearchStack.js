import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";

const Stack = createStackNavigator();

export default function SearchStack(){
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
                name="search"
                component={Search}
                options={{title: "Buscar"}}
            />
        </Stack.Navigator>
    );
} 