import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favourites from "../screens/Favourites";

const Stack = createStackNavigator();

export default function FavouritesStack(){
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
                name="favourites"
                component={Favourites}
                options={{title: "Favoritos"}}
            />
        </Stack.Navigator>
    );
} 