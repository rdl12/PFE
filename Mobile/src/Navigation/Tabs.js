import React from 'react'
import { View,Text } from 'react-native'
import {createBottomTabNavigator , BottomTabBar} from '@react-navigation/bottom-tabs'
import {HomeScreen} from '../Screens/HomeScreen'

import { Colors, icons} from '../Constantes'

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
                    <Image/>
                }
            }}
            />

           
        </Tab.Navigator>
      </View>
    )
}

export default Tabs
