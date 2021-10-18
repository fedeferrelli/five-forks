import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurants from "../screens/TopRestaurants";

const Stack = createStackNavigator();

export default function TopRestaunrantsStack(){
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
                name="toprestaurants"
                component={TopRestaurants}
                options={{title: "Top5"}}
            />
        </Stack.Navigator>
    );
} 