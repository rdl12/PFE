import React from 'react'
import { View,Text,Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen,LoginScreen,MapScreen,AddDefibScreen} from '../Screens'

import { COLORS, Colors, icons,images} from '../Constantes'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
            name = "Home"
            component = {HomeScreen}
            options = {{
                tabBarIcon: ({focused}) => {
                  return(
                    <Image
                    source = {images.Home_image}
                    resizeMode  ="contain"
                    
                    style = {{
                      tintColor: focused ? COLORS.primary : COLORS.secondary,
                      height:35,
                      width:35
                    }}
                  />
                  )
                }
            }}
            />
            <Tab.Screen
            name = "Map"
            component = {MapScreen}
            options = {{
                tabBarIcon: ({focused}) => {
                  return(
                    <Image
                    source = {images.Home_image}
                    resizeMode  ="contain"
                    
                    style = {{
                      tintColor: focused ? COLORS.primary : COLORS.secondary,
                      height:35,
                      width:35
                    }}
                  />
                  )
                }
            }}
            />
            <Tab.Screen
            name = "Login"
            component = {LoginScreen}
            options = {{
                tabBarIcon: ({focused}) => {
                  return(
                    <Image
                    source = {images.Home_image}
                    resizeMode  ="contain"
                    
                    style = {{
                      tintColor: focused ? COLORS.primary : COLORS.secondary,
                      height:35,
                      width:35
                    }}
                  />
                  )
                }
            }}
            />
              <Tab.Screen
            name = "AddDefib"
            component = {AddDefibScreen}
            options = {{
                tabBarIcon: ({focused}) => {
                  return(
                    <Image
                    source = {images.Home_image}
                    resizeMode  ="contain"
                    
                    style = {{
                      tintColor: focused ? COLORS.primary : COLORS.secondary,
                      height:35,
                      width:35
                    }}
                  />
                  )
                }
            }}
            />
        </Tab.Navigator>
      
    )
}

export default Tabs
