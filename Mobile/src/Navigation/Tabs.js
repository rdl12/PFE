import React from 'react'
import { View,Text } from 'react-native'
import {createBottomTabNavigator , BottomTabBar} from '@react-navigation/bottom-tabs'
import {HomeScreen} from '../Screens/HomeScreen'

import { COLORS, Colors, icons,images} from '../Constantes'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
      <View>
        <Tab.Navigator>
            <Tab.Screen
            name = "HomeScreen"
            component = {HomeScreen}
            options = {{
                tabBarIcon: ({focused}) => {
                    <Image
                      source = {images.Home_image}
                      resizeMode  ="contain"
                      style = {{
                        width: 25,
                        height:25,
                        tintColor: focused ? COLORS.primary : COLORS.secondary
                      }}
                    />
                }
            }}
            />

           
        </Tab.Navigator>
      </View>
    )
}

export default Tabs
