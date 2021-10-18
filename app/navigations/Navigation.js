import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs" ;
import RestaurantsStacks from "./RestaurantsStack"; 
import FavouritesStack from "./FavouritesStack"
import SearchStack from "./SearchStack"
import TopRestaurantsStack from "./TopRestaurantsStack";
import AccountStack from "./AccountStack";

import { Icon } from "react-native-elements/dist/icons/Icon";



const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaunrants"
                tabBarOptions={{
                    inactiveTintColor:"#646464",
                    activeTintColor:"#00a680"
                }}

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                })}
            >

                <Tab.Screen name="restaurants" 
                component={RestaurantsStacks}
                options={{title: "Restaurantes"}}/>
                
                <Tab.Screen name="favourites" 
                component={FavouritesStack} 
                options={{title: "Favoritos"}}/>
                
                <Tab.Screen name="search" 
                component={SearchStack} 
                options={{title: "Buscar"}}/>
                
                <Tab.Screen name="top-restaurants" 
                component={TopRestaurantsStack} 
                options={{title: "Top5"}}/>
                
                <Tab.Screen name="account" 
                component={AccountStack} 
                options={{title: "Mi Cuenta"}}/>

            </Tab.Navigator>

        </NavigationContainer>
    );
}


function screenOptions(route, color){

    let iconName;

    switch(route.name){
        case "restaurants":
            iconName="compass-outline";
            break;
        case "favourites":
            iconName="heart-outline";
            break;
        case "top-restaurants":
            iconName="star-outline";
            break;
        case "search":
            iconName="magnify";
            break;
        case "account":
            iconName="home-outline";
            break;
        default:
            break
    }

    return(
        <Icon type="material-community" name={iconName} size={25} color={color}   />
    )
}