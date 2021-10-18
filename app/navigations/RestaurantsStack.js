import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Restaurants";


const Stack = createStackNavigator();

export default function RestaurantsStack(){
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
                name="restaurants"
                component={Restaurants}
                options={{title: "Restaurantes"}}
            />
        </Stack.Navigator>
    );
} 